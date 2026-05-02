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
                    // Added -e HOME=. to give Selenium a writable place for drivers
                    args '--entrypoint="" --network host -e HOME=.' 
                }
            }
            steps {
                dir('LeafPetalsTestCases') {
                    git branch: 'main', url: 'https://github.com/ShahmeerAli/LeafPetalsTestCases.git'
                    
                    echo 'Compiling and running 15 Selenium test cases...'
                    // Added -Duser.home=. to double-ensure Java can write to the workspace
                    sh 'mvn clean test -Dmaven.repo.local=.m2/repository -Duser.home=.' 
                }
            }
        }
    }
    
    // post {
    //     always {
    //         // TEAR DOWN: Shuts down deployment so it is "down initially" for the next run[cite: 1]
    //         echo 'Shutting down the application environment...'
    //         sh 'docker-compose down'

    //         // EMAIL: Sends results to the committer captured in the environment block[cite: 1]
    //         emailext (
    //             subject: "Test Results & Build Status: Job ${env.JOB_NAME}",
    //             body: """
    //                 <p>Pipeline Execution Complete.</p>
    //                 <p>Build Result: <strong>${currentBuild.currentResult}</strong></p>
    //                 <p>You can view the full test execution logs here: <a href="${env.BUILD_URL}">${env.BUILD_URL}</a></p>
    //             """,
    //             to: "${PUSHER_EMAIL}",
    //             mimeType: 'text/html'
    //         )
    //     }
    // }
     post {
        always {
            echo 'Shutting down the application environment...'
            sh 'docker-compose down'

            emailext (
                subject: "Assignment 3: ${currentBuild.currentResult} - ${env.JOB_NAME}",
                body: "Check the 15 test results here: ${env.BUILD_URL}",
                // Use these providers to find the actual pusher behind the mask
                recipientProviders: [[$class: 'CulpritsRecipientProvider'], [$class: 'DevelopersRecipientProvider']],
                mimeType: 'text/html'
            )
        }
    }
}