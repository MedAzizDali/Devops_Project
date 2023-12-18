pipeline {
    agent any
    
    environment {
        // Global variables initialization
        DOCKER_IMAGE_NAME = "azizdali/devops_project:index" // Change this to your DockerHub repository/tag
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials' // Replace with your Jenkins credentials ID
    }

    triggers {
        pollSCM('*/5 * * * *') // Vérifier toutes les 5 minutes
    }

    
    
    stages {

        stage('Checkout'){
            agent any
            steps{
                checkout scm
            }   
        }

        stage('Initialize') {
            steps {
                echo 'Initializing...'
                
            }
        }
        
        stage('Build') {
            steps {
                // Build Docker image
                script {
                    docker.build(DOCKER_IMAGE_NAME, '-f Dockerfile .')
                }
            }
        }
        
        stage('Test') {
            steps {
                // Placeholder for testing steps (unit or integration)
                echo 'Running tests...'
                
            }
        }
        
        stage('Push to DockerHub') {
            steps {
                // Push image to DockerHub
                script {
                    docker.withRegistry('https://registry.hub.docker.com', DOCKER_HUB_CREDENTIALS) {
                        docker.image(DOCKER_IMAGE_NAME).push()
                    }
                }
            }
        }
        
        stage('Cleanup') {
            steps {
                // Clean up - remove local Docker image
                script {
                    docker.image(DOCKER_IMAGE_NAME).remove()
                }
            }
        }
    }
    
    post {
        success {
            echo 'Pipeline succeeded! Image pushed to DockerHub.'
        }
        failure {
            echo 'Pipeline failed! Check the logs for errors.'
        }
    }
}
