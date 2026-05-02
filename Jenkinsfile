// pipeline {
//     agent any

//     environment {
//         PUSHER_EMAIL = sh(script: "git log -1 --pretty=format:'%ae'", returnStdout: true).trim()
//     }

//     stages {
//         stage('Checkout Application Code') {
//             steps { checkout scm }
//         }

//         stage('Deploy Leaf & Petals App') {
//             steps {
//                 echo 'Starting the application environment...'
//                 sh 'docker-compose up -d --build'
                
//                 echo 'Waiting 90 seconds for Next.js to compile and start...'
//                 sleep time: 90, unit: 'SECONDS'
//             }
//         }

//      stage('Health Check & Seed Data') {
//             steps {
//                 echo 'Verifying app and injecting data...'
//                 sh '''
//                 # 1. Seed the database 
//                 curl -s http://localhost:8081/api/seed
                
//                 echo "Data seeded! Wiping Next.js aggressive disk cache..."
//                 # 2. THE FIX: Physically delete the cache folder inside the container
//                 docker exec leaf_petals_app rm -rf /app/.next/cache
                
//                 echo "Restarting container..."
//                 # 3. Restart the app. It will be forced to fetch fresh data from MongoDB!
//                 docker restart leaf_petals_app
//                 sleep 15
                
//                 # 4. Final safety check
//                 curl -f http://localhost:8081 || exit 1
//                 '''
//             }
//         }

//         stage('Execute Containerized Tests') {
//             agent {
//                 docker {
//                     image 'markhobson/maven-chrome'
//                     args '--entrypoint="" --network host --shm-size="2g" -e HOME=/tmp' 
//                 }
//             }
//             steps {
//                 dir('LeafPetalsTestCases') {
//                     git branch: 'main', url: 'https://github.com/ShahmeerAli/LeafPetalsTestCases.git'
                    
//                     echo "Compiling and running tests for committer: ${PUSHER_EMAIL}"
//                     sh 'mvn clean test -Dmaven.repo.local=.m2/repository -Duser.home=/tmp' 
//                 }
//             }
//         }
//     }

//     post {
//         always {
//             echo 'Shutting down the application environment...'
//             sh 'docker-compose down'

//             emailext (
//                 subject: "Assignment 3: ${currentBuild.currentResult} - ${env.JOB_NAME}",
//                 body: "View the test results here: ${env.BUILD_URL}",
//                 to: "${PUSHER_EMAIL}",
//                 mimeType: 'text/html'
//             )
//         }
//     }
// }

// ─────────────────────────────────────────────────────────────────────────────
// Jenkinsfile — LeafPetals  |  Fixed version
//
// ROOT CAUSE OF PREVIOUS ERROR:
//   "session not created from chrome not reachable"
//   ↳ markhobson/maven-chrome has Java 11 but tests compiled to Java 17/25
//   ↳ withDockerContainer + git step causes Maven to run on the HOST, not
//     inside the container where Chrome lives ("special launcher ignored")
//
// THE FIX:
//   1. Use a custom Dockerfile.test (ubuntu:22.04 + Java 17 + Chrome stable)
//      stored in the LeafPetalsTestCases repo
//   2. Use `docker run` (not withDockerContainer) so Maven truly runs inside
//      the container alongside Chrome
//   3. --network host so the container reaches localhost:8081 directly
// ─────────────────────────────────────────────────────────────────────────────



// ─────────────────────────────────────────────────────────────────────────────
// Jenkinsfile — LeafPetals  |  Fixed version
//
// ROOT CAUSE OF PREVIOUS ERROR:
//   "session not created from chrome not reachable"
//   ↳ markhobson/maven-chrome has Java 11 but tests compiled to Java 17/25
//   ↳ withDockerContainer + git step causes Maven to run on the HOST, not
//     inside the container where Chrome lives ("special launcher ignored")
//
// THE FIX:
//   1. Use a custom Dockerfile.test (ubuntu:22.04 + Java 17 + Chrome stable)
//      stored in the LeafPetalsTestCases repo
//   2. Use `docker run` (not withDockerContainer) so Maven truly runs inside
//      the container alongside Chrome
//   3. --network host so the container reaches localhost:8081 directly
// ─────────────────────────────────────────────────────────────────────────────

pipeline {
    agent any

    environment {
        SENDER_EMAIL  = "alishahmeer998@gmail.com"
        APP_URL       = "http://localhost:8081"
        TEST_IMAGE    = "leafpetals-tests:${env.BUILD_NUMBER}"
    }

    triggers {
        githubPush()
    }

    stages {

        stage('Checkout Application Code') {
            steps {
                checkout scm
                script {
                    env.PUSHER_EMAIL = sh(
                        script: "git log -1 --pretty=format:'%ae'",
                        returnStdout: true
                    ).trim()
                    echo "Build triggered by: ${env.PUSHER_EMAIL}"
                }
            }
        }

        stage('Deploy LeafPetals App') {
            steps {
                echo 'Starting the LeafPetals application...'
                sh 'docker-compose up -d --build'
                echo 'Waiting 90 seconds for Next.js to compile and start...'
                sleep time: 90, unit: 'SECONDS'
            }
        }

        stage('Health Check & Seed Data') {
            steps {
                sh '''
                    curl -s http://localhost:8081/api/seed
                    echo ""
                    docker exec leaf_petals_app rm -rf /app/.next/cache
                    docker restart leaf_petals_app
                    sleep 15
                    curl -f http://localhost:8081 > /dev/null || exit 1
                    echo "App is healthy!"
                '''
            }
        }

        stage('Execute Containerized Tests') {
            steps {
                dir('LeafPetalsTestCases') {
                    git branch: 'main',
                        url: 'https://github.com/ShahmeerAli/LeafPetalsTestCases.git'
                }

                echo "Building test Docker image with Java 17 + Chrome stable..."
                sh "docker build -f LeafPetalsTestCases/Dockerfile.test -t ${TEST_IMAGE} LeafPetalsTestCases/"

                echo "Running Selenium tests against ${APP_URL}..."
                sh """
                    mkdir -p test-results
                    chmod 777 test-results
                    docker run --rm \
                        --network host \
                        --shm-size=2g \
                        -e APP_URL=${APP_URL} \
                        -v \${WORKSPACE}/test-results:/tests/target/surefire-reports \
                        ${TEST_IMAGE}
                """
            }
            post {
                always {
                    junit allowEmptyResults: true,
                          testResults: 'test-results/**/*.xml'
                }
            }
        }

        stage('Archive Results') {
            steps {
                archiveArtifacts artifacts: 'test-results/**/*',
                                 allowEmptyArchive: true
            }
        }
    }

    post {
        always {
            echo 'Shutting down the application environment...'
            sh 'docker-compose down'
            sh "docker rmi ${TEST_IMAGE} || true"

            emailext(
                subject: "LeafPetals CI - Build #${env.BUILD_NUMBER}: ${currentBuild.currentResult}",
                mimeType: 'text/html',
                to: "${env.PUSHER_EMAIL}",
                from: "${env.SENDER_EMAIL}",
                body: """
                    <html><body style="font-family:Arial,sans-serif;">
                    <div style="background:#1a5276;padding:20px;border-radius:8px 8px 0 0;">
                        <h2 style="color:white;margin:0;">LeafPetals Jenkins CI Report</h2>
                    </div>
                    <div style="border:1px solid #ddd;border-top:none;padding:20px;border-radius:0 0 8px 8px;">
                        <table style="width:100%;border-collapse:collapse;">
                            <tr><td style="padding:8px;font-weight:bold;">Status</td>
                                <td style="padding:8px;color:${currentBuild.currentResult == 'SUCCESS' ? 'green' : 'red'};font-weight:bold;">
                                    ${currentBuild.currentResult == 'SUCCESS' ? 'PASSED' : 'FAILED'}
                                </td></tr>
                            <tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Job</td>
                                <td style="padding:8px;">${env.JOB_NAME}</td></tr>
                            <tr><td style="padding:8px;font-weight:bold;">Build</td>
                                <td style="padding:8px;">#${env.BUILD_NUMBER}</td></tr>
                            <tr style="background:#f5f5f5;"><td style="padding:8px;font-weight:bold;">Triggered by</td>
                                <td style="padding:8px;">${env.PUSHER_EMAIL}</td></tr>
                            <tr><td style="padding:8px;font-weight:bold;">Duration</td>
                                <td style="padding:8px;">${currentBuild.durationString}</td></tr>
                        </table>
                        <br/>
                        <a href="${env.BUILD_URL}testReport/" style="background:#27ae60;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;margin-right:10px;">View Test Report</a>
                        <a href="${env.BUILD_URL}console" style="background:#2e75b6;color:white;padding:10px 20px;text-decoration:none;border-radius:5px;">View Console Log</a>
                    </div>
                    </body></html>
                """,
                attachLog: "${currentBuild.currentResult}" != "SUCCESS"
            )
        }
    }
}