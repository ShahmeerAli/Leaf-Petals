pipeline {
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
                # 1. Seed the plant database
                curl -s http://127.0.0.1:8081/api/seed

                echo "Wiping Next.js cache and restarting container..."
                docker exec leaf_petals_app rm -rf /app/.next/cache
                docker restart leaf_petals_app

                # 2. Wait for app to be ready after restart (retry loop)
                echo "Waiting for app to come back up..."
                for i in $(seq 1 15); do
                    curl -sf http://127.0.0.1:8081 && echo "App is up!" && break
                    echo "Not ready yet... retry $i/15"
                    sleep 5
                done

                # 3. Seed the test user using heredoc to avoid quoting issues
                cat > /tmp/seed_user.json << 'ENDJSON'
{"name":"Test User","email":"test@leafpetals.com","password":"Test@1234"}
ENDJSON

                echo "Seeding test user..."
                curl -s -X POST http://127.0.0.1:8081/api/auth/register \
                    -H "Content-Type: application/json" \
                    -d @/tmp/seed_user.json
                echo ""
                echo "Test user seed done!"
                '''
            }
        }

        stage('Execute Containerized Tests') {
            agent {
                docker {
                    image 'markhobson/maven-chrome:latest'
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
            post {
                always {
                    junit 'LeafPetalsTestCases/target/surefire-reports/*.xml'
                }
            }
        }
    }

    post {
        always {
            echo 'Shutting down the application environment...'
            sh 'docker-compose down'

            emailext(
                subject: "[${currentBuild.currentResult}] ${env.JOB_NAME}",
                mimeType: 'text/html',
                to: "${env.GIT_COMMITTER_EMAIL ?: sh(script: 'git log -1 --pretty=format:%ae', returnStdout: true).trim()}",
                body: """
                <div style="font-family: Arial, sans-serif; max-width: 650px; margin: auto; border: 1px solid #e0e0e0; border-radius: 10px; overflow: hidden; box-shadow: 0 6px 10px rgba(0,0,0,0.08);">
                    <div style="background-color: #1f2937; padding: 20px; text-align: center;">
                        <h2 style="margin: 0; color: #ffffff;">Jenkins CI/CD Pipeline</h2>
                        <p style="margin: 5px 0 0; color: #d1d5db; font-size: 14px;">Automated Build Notification</p>
                    </div>
                    <div style="padding: 25px; background-color: #ffffff;">
                        <p style="font-size: 16px; color: #444;">
                            The pipeline for <strong>${env.JOB_NAME}</strong> has completed execution.
                        </p>
                        <div style="margin: 20px 0; text-align: center;">
                            <span style="padding: 10px 20px; border-radius: 20px; font-weight: bold; color: white; background-color: ${currentBuild.currentResult == 'SUCCESS' ? '#2ea44f' : '#d73a49'};">
                                ${currentBuild.currentResult}
                            </span>
                        </div>
                        <table style="width: 100%; border-collapse: collapse; margin-top: 20px;">
                            <tr>
                                <td style="padding: 10px; border: 1px solid #eee; background: #f9fafb;"><b>Job Name</b></td>
                                <td style="padding: 10px; border: 1px solid #eee;">${env.JOB_NAME}</td>
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
                        <div style="text-align: center; margin-top: 30px;">
                            <a href="${env.BUILD_URL}" style="background-color: #2563eb; color: white; padding: 12px 25px; text-decoration: none; border-radius: 6px; font-weight: bold;">
                                View Build Details
                            </a>
                        </div>
                    </div>
                    <div style="background-color: #f3f4f6; padding: 15px; text-align: center; font-size: 12px; color: #777;">
                        This is an automated message from Jenkins CI/CD Pipeline.<br/>
                        Please do not reply to this email.
                    </div>
                </div>
                """,
                recipientProviders: [
                    [$class: 'DevelopersRecipientProvider']
                ]
            )
        }
    }
}