pipeline {
    agent any

    environment {
        // Dynamically extracts the email from the actual commit metadata
        RAW_EMAIL = sh(script: "git log -1 --pretty=format:'%ae'", returnStdout: true).trim()
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
                // ADDED --build: Forces Docker to rebuild the container with your new NEXTAUTH_URL
                sh 'docker-compose up -d --build'
                
                echo 'Waiting 90 seconds for Next.js to compile and start...'
                sleep time: 90, unit: 'SECONDS'
            }
        }

        stage('Execute Containerized Tests') {
            agent {
                docker {
                    image 'markhobson/maven-chrome'
                    args '--entrypoint="" --network host --shm-size="2g" -e HOME=/tmp' 
                }
            }
            steps {
                dir('LeafPetalsTestCases') {
                    git branch: 'main', url: 'https://github.com/ShahmeerAli/LeafPetalsTestCases.git'
                    
                    echo "Compiling and running tests..."
                    sh 'mvn clean test -Dmaven.repo.local=.m2/repository -Duser.home=/tmp' 
                }
            }
        }
    }

    post {
        always {
            echo 'Shutting down the application environment...'
            sh 'docker-compose down'

            script {
                // THE FIX: If Git hands Jenkins the fake GitHub email, force it to use your Gmail. 
                // Otherwise, use the pusher's email dynamically.
                def targetEmail = env.RAW_EMAIL.contains("noreply") ? "alishahmeer998@gmail.com" : env.RAW_EMAIL
                
                emailext (
                    subject: "Assignment 3: ${currentBuild.currentResult} - ${env.JOB_NAME}",
                    body: "View the results here: ${env.BUILD_URL}",
                    to: targetEmail,
                    mimeType: 'text/html'
                )
            }
        }
    }
}