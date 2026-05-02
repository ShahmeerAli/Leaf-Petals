pipeline {
    agent any
    
    environment {
        // Dynamically extracts the email of the author from the latest git commit
        PUSHER_EMAIL = sh(script: "git --no-pager show -s --format='%ae'", returnStdout: true).trim()
    }
    
    stages {
        stage('Checkout Application Code') {
            steps {
                // Automatically pulls the LeafPetals web app code
                checkout scm
            }
        }
        
        stage('Deploy Leaf & Petals App') {
            steps {
                echo 'Starting the application environment...'
                sh 'docker-compose up -d'
                
                // Allow 15 seconds for MongoDB to initialize and Next.js to start
                sleep time: 15, unit: 'SECONDS'
            }
        }
        
        stage('Checkout Test Code') {
            steps {
                dir('LeafPetalsTestCases') {
                    // Pulls your Java Selenium tests from your second repository
                    git branch: 'main', url: 'https://github.com/ShahmeerAli/LeafPetalsTestCases.git'
                }
            }
        }
        
      stage('Execute Containerized Tests') {
            agent {
                docker {
                    image 'markhobson/maven-chrome'
                    // REMOVED the -v $HOME/.m2 volume mapping to fix the permission error
                    args '--network host' 
                }
            }
            steps {
                // IMPORTANT: We need to pull the test code AGAIN inside this specific agent 
                // because Jenkins uses a fresh workspace (@2) for the Docker agent.
                dir('LeafPetalsTestCases') {
                    git branch: 'main', url: 'https://github.com/ShahmeerAli/LeafPetalsTestCases.git'
                    echo 'Compiling and running Selenium test cases...'
                    sh 'mvn clean test' 
                }
            }
        }
    }
    
    post {
        always {
            // 1. TEAR DOWN: Shuts down the deployment to ensure it is "down initially" for the next run
            echo 'Shutting down the application environment...'
            sh 'docker-compose down'

            // 2. EMAIL: Sends the email strictly to the person who pushed the code
            emailext (
                subject: "Test Results & Build Status: Job ${env.JOB_NAME}",
                body: """
                    <p>Pipeline Execution Complete.</p>
                    <p>Build Result: <strong>${currentBuild.currentResult}</strong></p>
                    <p>You can view the full test execution logs here: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
                """,
                to: "${PUSHER_EMAIL}",
                mimeType: 'text/html'
            )
        }
    }
}