pipeline {
    agent {
        docker {
            // Using the pre-built image required by the assignment
            image 'markhobson/maven-chrome'
            // Use host network so localhost:8081 inside the container maps to the EC2 host's port 8081
            args '--network host -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }

    stages {
        stage('Checkout Code') {
            steps {
                // Fetches the test code from your GitHub repository
                checkout scm
            }
        }

        stage('Execute Tests') {
            steps {
                // Runs the JUnit Selenium tests using Maven
                echo 'Running Selenium automated test cases...'
                sh 'mvn clean test -Dmaven.repo.local=.m2/repository -Duser.home=/tmp'
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
            // Emails the test results back dynamically based on the Git commit/push
            emailext(
                subject: "${currentBuild.currentResult}: Job '${env.JOB_NAME}' [${env.BUILD_NUMBER}]",
                body: """<p>The automated test pipeline completed with status: <b>${currentBuild.currentResult}</b></p>
                         <p>Triggered by GitHub Push.</p>
                         <p>Check the console output and test results here: <a href='${env.BUILD_URL}'>${env.JOB_NAME} [${env.BUILD_NUMBER}]</a></p>""",
                recipientProviders: [
                    // 1. Sends to the user who triggered the build via the webhook
                    [$class: 'RequesterRecipientProvider'],
                    // 2. Sends to anyone whose commits are part of this specific build
                    [$class: 'CulpritsRecipientProvider'],
                    // 3. Sends to all developers who authored the SCM changes
                    [$class: 'DevelopersRecipientProvider']
                ]
            )
        }
    }
}