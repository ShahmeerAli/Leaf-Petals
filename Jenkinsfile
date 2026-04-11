pipeline {
    agent any

    stages {

        stage('Checkout') {
            steps {
                echo 'Getting code from GitHub...'
                git branch: 'main',
                    url: 'https://github.com/ShahmeerAli/Leaf-Petals.git'
            }
        }

        stage('Build') {
            steps {
                echo 'Starting build containers...'
                sh 'docker compose -f docker-compose.jenkins.yml down --remove-orphans || true'
                sh 'docker-compose -f docker-compose.jenkins.yml up -d'
                echo 'Build complete. App running on port 9090.'
            }
        }

        stage('Cleanup') {
            steps {
                echo 'Stopping build containers...'
                sh 'docker compose -f docker-compose.jenkins.yml down || true'
            }
        }
    }

    post {
        failure {
            sh 'docker compose -f docker-compose.jenkins.yml down || true'
        }
    }
}
