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
        echo 'Waiting for application to become ready...'
        
        sh '''
        # Retry until app is ready (max 10 attempts)
        for i in {1..10}
        do
            echo "Attempt $i: Checking app..."
            if curl -f http://127.0.0.1:8081 > /dev/null 2>&1; then
                echo "App is up!"
                break
            fi
            sleep 10
        done

        echo "Seeding database..."
        curl -f http://127.0.0.1:8081/api/seed

        echo "Clearing Next.js cache..."
        docker exec leaf_petals_app rm -rf /app/.next/cache

        echo "Restarting container..."
        docker restart leaf_petals_app
        sleep 15

        echo "Final health check..."
        curl -f http://127.0.0.1:8081
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
                    // Captures the test results for Jenkins reporting
                    junit 'target/surefire-reports/*.xml'
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
                subject: "${currentBuild.currentResult}: Job '${env.JOB_NAME}' [${env.BUILD_NUMBER}]",
                body: """<p>The automated test pipeline completed with status: <b>${currentBuild.currentResult}</b></p>
                         <p>Triggered by GitHub Push.</p>
                         <p>Check the console output and test results here: <a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a></p>""",
                recipientProviders: [
                    [$class: 'RequesterRecipientProvider'],
                    [$class: 'CulpritsRecipientProvider'],
                    [$class: 'DevelopersRecipientProvider']
                ]
            )
        }
    }
}