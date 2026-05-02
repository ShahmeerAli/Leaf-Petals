pipeline {
    agent any

    environment {
        // Dynamically extracts the email from the actual commit metadata
        PUSHER_EMAIL = sh(script: "git log -1 --pretty=format:'%ae'", returnStdout: true).trim()
    }

    stages {
        stage('Checkout Application Code') {
            steps {
                checkout scm
            }
        }

        stage('Deploy Leaf & Petals App') {
            steps {
                echo 'Starting the application environment...'
                sh 'docker-compose up -d'
                
                // Increased to 90s because Build #10 showed connection resets
                sleep time: 90, unit: 'SECONDS'
            }
        }

        stage('Execute Containerized Tests') {
            agent {
                docker {
                    image 'markhobson/maven-chrome'
                    // --shm-size="2g" prevents the Chrome browser from freezing/hanging
                    args '--entrypoint="" --network host --shm-size="2g" -e HOME=/tmp' 
                }
            }
            steps {
                dir('LeafPetalsTestCases') {
                    git branch: 'main', url: 'https://github.com/ShahmeerAli/LeafPetalsTestCases.git'
                    
                    echo "Compiling and running tests for: ${PUSHER_EMAIL}"
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
                body: "View the results for commit by ${PUSHER_EMAIL} here: ${env.BUILD_URL}",
                to: "${PUSHER_EMAIL}",
                mimeType: 'text/html'
            )
        }
    }
}