pipeline {
    // The main pipeline runs on the EC2 server directly so it can use docker-compose
    agent any

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
                # 1. Seed the database using explicit IPv4
                curl -s http://127.0.0.1:8081/api/seed
                
                echo "Data seeded! Wiping Next.js aggressive disk cache..."
                # 2. Physically delete the cache folder inside the container
                docker exec leaf_petals_app rm -rf /app/.next/cache
                
                echo "Restarting container..."
                # 3. Restart the app. It will fetch fresh data from MongoDB!
                docker restart leaf_petals_app
                sleep 15
                
                # 4. Final safety check
                curl -f http://127.0.0.1:8081 || exit 1
                '''
            }
        }

        stage('Execute Containerized Tests') {
            // ONLY the testing stage runs inside the Maven/Chrome container
            agent {
                docker {
                    image 'markhobson/maven-chrome:latest'
                    args '--entrypoint="" --network host --shm-size="2g" -e HOME=/tmp' 
                }
            }
            steps {
                dir('LeafPetalsTestCases') {
                    // Pulls your test cases from your separate repository
                    git branch: 'main', url: 'https://github.com/ShahmeerAli/LeafPetalsTestCases.git'
                    
                    echo "Compiling and running tests..."
                    // Your exact fix for the Maven permissions!
                    sh 'mvn clean test -Dmaven.repo.local=.m2/repository -Duser.home=/tmp' 
                }
            }
            post {
                always {
                    // Captures the test results from the correct directory
                    junit 'LeafPetalsTestCases/target/surefire-reports/*.xml'
                }
            }
        }
    }

    post {
        always {
            echo 'Shutting down the application environment...'
            sh 'docker-compose down'

            // Your exact dynamic email block!
            // ... inside your post { always { ... } } block
            emailext(
                subject: "${currentBuild.currentResult}: Job '${env.JOB_NAME}'",
                body: 
                <div style="font-family: Arial, sans-serif; max-width: 600px; margin: 0 auto; border: 1px solid #e0e0e0; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 6px rgba(0,0,0,0.05);">
                    <div style="background-color: #2c3e50; padding: 20px; text-align: center;">
                        <h2 style="margin: 0; color: #ffffff; font-weight: normal;">Pipeline Notification</h2>
                    </div>
                    
                    <div style="padding: 30px 20px; background-color: #ffffff;">
                        <p style="font-size: 16px; color: #555555; margin-top: 0;">
                            The automated deployment and testing pipeline for <strong>${env.JOB_NAME}</strong> has finished executing.
                        </p>
                        
                        <table style="width: 100%; border-collapse: collapse; margin-top: 25px; margin-bottom: 25px;">
                            <tr>
                                <td style="padding: 12px; border: 1px solid #eeeeee; background-color: #f8f9fa; font-weight: bold; width: 35%; color: #333333;">Final Status</td>
                                <td style="padding: 12px; border: 1px solid #eeeeee; color: #333333; font-weight: bold;">${currentBuild.currentResult}</td>
                            </tr>
                            <tr>
                                <td style="padding: 12px; border: 1px solid #eeeeee; background-color: #f8f9fa; font-weight: bold; color: #333333;">Triggered By</td>
                                <td style="padding: 12px; border: 1px solid #eeeeee; color: #555555;">GitHub Push / Webhook</td>
                            </tr>
                        </table>
                        
                        <div style="text-align: center; margin-top: 35px; margin-bottom: 10px;">
                            <a href="${env.BUILD_URL}" style="background-color: #2ea44f; color: #ffffff; padding: 12px 28px; text-decoration: none; border-radius: 6px; font-weight: bold; font-size: 15px; display: inline-block;">View Build Logs</a>
                        </div>
                    </div>
                    
                    <div style="background-color: #f8f9fa; padding: 15px; text-align: center; font-size: 12px; color: #888888; border-top: 1px solid #e0e0e0;">
                        This is an automated message generated by Jenkins CI/CD.
                    </div>
                </div>,
                recipientProviders: [
                    [$class: 'RequesterRecipientProvider'],
                    [$class: 'CulpritsRecipientProvider'],
                    [$class: 'DevelopersRecipientProvider']
                ]
            )
        }
    }
}