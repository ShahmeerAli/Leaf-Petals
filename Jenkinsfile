pipeline {
    agent any

    environment {
        PUSHER_EMAIL = sh(script: "git log -1 --pretty=format:'%ae'", returnStdout: true).trim()
    }

    stages {
        stage('Checkout Application Code') {
            steps { checkout scm }
        }

        stage('Deploy Leaf & Petals App') {
            steps {
                echo 'Starting the application environment...'
                sh 'docker-compose up -d --build'
                
                echo 'Waiting 90 seconds for Next.js to compile and start...'
                sleep time: 90, unit: 'SECONDS'
            }
        }

     stage('Health Check & Seed Data') {
            steps {
                echo 'Verifying app and injecting data...'
                sh '''
                # 1. Seed the database 
                curl -s http://localhost:8081/api/seed
                
                echo "Data seeded! Wiping Next.js aggressive disk cache..."
                # 2. THE FIX: Physically delete the cache folder inside the container
                docker exec leaf_petals_app rm -rf /app/.next/cache
                
                echo "Restarting container..."
                # 3. Restart the app. It will be forced to fetch fresh data from MongoDB!
                docker restart leaf_petals_app
                sleep 15
                
                # 4. Final safety check
                curl -f http://localhost:8081 || exit 1
                '''
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
                    
                    echo "Compiling and running tests for committer: ${PUSHER_EMAIL}"
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
                body: "View the test results here: ${env.BUILD_URL}",
                to: "${PUSHER_EMAIL}",
                mimeType: 'text/html'
            )
        }
    }
}