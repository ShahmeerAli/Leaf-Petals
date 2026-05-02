pipeline {
    agent any

    environment {
        // Dynamically extracts the email of the person who made the latest commit
        COMMIT_EMAIL = sh(script: "git log -1 --pretty=format:'%ae'", returnStdout: true).trim()
    }

    stages {
        stage('Checkout Application Code') {
            steps {
                checkout scm
            }
        }

        stage('Deploy Leaf & Petals App') {
            steps {
                echo 'Starting application environment...'
                sh 'docker-compose up -d'
                // Essential for Next.js/MongoDB handshake on EC2
                sleep time: 120, unit: 'SECONDS'
            }
        }

        stage('Execute Containerized Tests') {
            agent {
                docker {
                    image 'markhobson/maven-chrome'
                    // --shm-size="2g" prevents the Chrome browser from freezing
                    args '--entrypoint="" --network host --shm-size="2g" -e HOME=/tmp'
                }
            }
            steps {
                dir('LeafPetalsTestCases') {
                    git branch: 'main', url: 'https://github.com/ShahmeerAli/LeafPetalsTestCases.git'
                    echo "Running tests against http://localhost:8081 for ${COMMIT_EMAIL}"
                    sh 'mvn clean test -Dmaven.repo.local=.m2/repository -Duser.home=/tmp'
                }
            }
        }
    }

    post {
        always {
            echo 'Shutting down the application environment...'
            sh 'docker-compose down'

            emailext (
                subject: "Assignment 3: ${currentBuild.currentResult} - ${env.JOB_NAME}",
                body: """
                    <p>Pipeline Execution Complete.</p>
                    <p>Build Result: <strong>${currentBuild.currentResult}</strong></p>
                    <p>Full Logs: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                """,
                // Uses the dynamic variable extracted at the start of the pipeline
                to: "${COMMIT_EMAIL}",
                mimeType: 'text/html'
            )
        }
    }
}