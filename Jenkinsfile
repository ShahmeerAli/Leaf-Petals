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
                # 1. Seed the database (We know this works!)
                curl -s http://localhost:8081/api/seed
                
                echo "Data seeded! Restarting container to wipe Next.js cache..."
                # 2. Restart the app so it wakes up and sees the new plants
                docker restart leaf_petals_app
                
                # 3. Give it 15 seconds to boot back up
                sleep 15
                
                # 4. Final safety check before tests run
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