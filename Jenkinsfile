pipeline {
    agent any
    
    stages {
        stage('Checkout Application Code') {
            steps {
                // Automatically pulls the LeafPetals web app code
                checkout scm
            }
        }
        
        stage('Deploy Leaf & Petals App') {
            steps {
                // Brings up your Next.js app and MongoDB on the EC2 host
                echo 'Starting the application environment...'
                sh 'docker-compose up -d'
                
                // Allow 15 seconds for MongoDB to initialize and Next.js to start
                sleep time: 15, unit: 'SECONDS'
            }
        }
        
        stage('Checkout Test Code') {
            steps {
                // Creates an isolated folder in the Jenkins workspace
                dir('LeafPetalsTestCases') {
                    // Pulls your Java Selenium tests from your second repository
                    // REPLACE [YourGitHubUsername] WITH YOUR ACTUAL USERNAME
                    git branch: 'main', url: 'https://github.com/ShahmeerAli/LeafPetalsTestCases.git'
                }
            }
        }
        
        stage('Execute Containerized Tests') {
            agent {
                docker {
                    // Uses the exact image required by the assignment
                    image 'markhobson/maven-chrome'
                    // --network host allows the test container to reach your app at localhost:3000
                    args '--network host -v $HOME/.m2:/root/.m2'
                }
            }
            steps {
                // Step into the folder where we just downloaded the test code
                dir('LeafPetalsTestCases') {
                    echo 'Compiling and running Selenium test cases...'
                    sh 'mvn clean test' 
                }
            }
        }
    }
    
    post {
        always {
            // Emails the test results back to whoever pushed the commit
            emailext (
                subject: "Test Results & Build Status: Job ${env.JOB_NAME}",
                body: """
                    Pipeline Execution Complete.
                    Build Result: ${currentBuild.currentResult}
                    
                    You can view the full test execution logs here:
                    ${env.BUILD_URL}
                """,
                recipientProviders: [
                    developers(),
                    requestor()
                ]
            )
        }
    }
}