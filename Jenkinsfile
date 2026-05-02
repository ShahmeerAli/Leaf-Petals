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
                    // FIX 1: Added --entrypoint="" to prevent the container from crashing on startup
                    // --network host allows the container to reach the app on port 8081[cite: 1]
                    args '--entrypoint="" --network host' 
                }
            }
            steps {
                dir('LeafPetalsTestCases') {
                    // Re-checkout inside this agent because Docker uses a separate workspace[cite: 1]
                    git branch: 'main', url: 'https://github.com/ShahmeerAli/LeafPetalsTestCases.git'
                    
                    echo 'Compiling and running 15 Selenium test cases...'
                    // FIX 2: Added -Dmaven.repo.local to force Maven to use a writable folder in the workspace[cite: 1]
                    sh 'mvn clean test -Dmaven.repo.local=.m2/repository' 
                }
            }
        }
    }
    
    post {
        always {
            // TEAR DOWN: Shuts down deployment so it is "down initially" for the next run[cite: 1]
            echo 'Shutting down the application environment...'
            sh 'docker-compose down'

            // EMAIL: Sends results to the committer captured in the environment block[cite: 1]
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