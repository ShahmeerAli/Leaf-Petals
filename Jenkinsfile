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
            emailext(
                 subject: "[${currentBuild.currentResult}] ${env.JOB_NAME} #${env.BUILD_NUMBER}",
                 mimeType: 'text/html',
                 body: """
                <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; box-shadow: 0 6px 10px rgba(0,0,0,0.08);">

                <!-- Header -->
                <div style="background-color: #1f2937; padding: 20px; text-align: center;">
                 <h2 style="margin: 0; color: #ffffff;">Jenkins CI/CD Pipeline</h2>
                <p style="margin: 5px 0 0; color: #d1d5db; font-size: 14px;">Automated Build Notification</p>
                </div>

            <!-- Body -->
            <div style="padding: 25px; background-color: #ffffff;">
            
                <p style="font-size: 16px; color: #444;">
                    The pipeline for <strong>${env.JOB_NAME}</strong> has completed execution.
                 </p>

                <!-- Status Badge -->
                 <div style="margin: 20px 0; text-align: center;">
                 <span style="
                      padding: 10px 20px;
                      border-radius: 20px;
                      font-weight: bold;
                     color: white;
                     background-color: ${currentBuild.currentResult == 'SUCCESS' ? '#2ea44f' : '#d73a49'};
                     ">
                        ${currentBuild.currentResult}
                    </span>
                </div>

                 <!-- Info Table -->
                <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                    <tr>
                    <td style="padding: 10px; border: 1px solid #eee; background: #f9fafb;"><b>Job Name</b></td>
                    <td style="padding: 10px; border: 1px solid #eee;">${env.JOB_NAME}</td>
                 </tr>
                    <tr>
                    <td style="padding: 10px; border: 1px solid #eee; background: #f9fafb;"><b>Build Number</b></td>
                    <td style="padding: 10px; border: 1px solid #eee;">#${env.BUILD_NUMBER}</td>
                 </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #eee; background: #f9fafb;"><b>Branch</b></td>
                    <td style="padding: 10px; border: 1px solid #eee;">${env.GIT_BRANCH}</td>
                </tr>
                <tr>
                    <td style="padding: 10px; border: 1px solid #eee; background: #f9fafb;"><b>Triggered By</b></td>
                    <td style="padding: 10px; border: 1px solid #eee;">GitHub Push</td>
                </tr>
            </table>

            <!-- Button -->
            <div style="text-align: center; margin-top: 30px;">
                <a href="${env.BUILD_URL}" 
                   style="background-color: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                   View Build Details
                </a>
            </div>

        </div>

        <!-- Footer -->
        <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #777;">
            This is an automated message from Jenkins CI/CD Pipeline.<br/>
            Please do not reply to this email.
        </div>

    </div>
    """,

       recipientProviders: [
         [$class: 'RequesterRecipientProvider'],
         [$class: 'DevelopersRecipientProvider'],
         [$class: 'CulpritsRecipientProvider']
      ]
   )
        }
    }
}