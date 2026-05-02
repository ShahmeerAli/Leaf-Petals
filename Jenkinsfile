pipeline {
    agent any

    environment {
        // Dynamically get the email
        RAW_EMAIL = sh(script: "git log -1 --pretty=format:'%ae'", returnStdout: true).trim()
    }

    stages {
        stage('Checkout Code') {
            steps { checkout scm }
        }

        stage('Deploy & Wait') {
            steps {
                echo 'Starting Leaf & Petals environment...'
                sh 'docker-compose down && docker-compose up -d'
                echo 'Waiting 90 seconds for Next.js and MongoDB to sync...'
                sleep time: 90, unit: 'SECONDS'
            }
        }

        stage('Sanity Check') {
            steps {
                echo 'Checking if the website is actually responding...'
                // This will fail the build immediately if the site returns a connection error
                sh 'curl -f http://localhost:8081 || (echo "APP IS DOWN" && exit 1)'
            }
        }

        stage('Execute Containerized Tests') {
            agent {
                docker {
                    image 'markhobson/maven-chrome'
                    args '--entrypoint="" --network host --shm-size=2g -e HOME=/tmp'
                }
            }
            steps {
                dir('LeafPetalsTestCases') {
                    git branch: 'main', url: 'https://github.com/ShahmeerAli/LeafPetalsTestCases.git'
                    echo "Running 15 tests for: ${env.RAW_EMAIL}"
                    sh 'mvn clean test -Dmaven.repo.local=.m2/repository -Duser.home=/tmp'
                }
            }
        }
    }

    post {
        always {
            echo 'Shutting down environment...'
            sh 'docker-compose down'

            script {
                // LOGIC: If the email is the fake GitHub one, use your real one so you get the report
                def recipient = env.RAW_EMAIL.contains("noreply") ? "alishahmeer998@gmail.com" : env.RAW_EMAIL
                
                emailext (
                    subject: "Assignment 3 Result: ${currentBuild.currentResult}",
                    body: "Build ${env.BUILD_NUMBER} finished. Logs: ${env.BUILD_URL}",
                    to: "${recipient}",
                    mimeType: 'text/html'
                )
            }
        }
    }
}