pipeline {
    agent any
    
    environment {
        // Global variables initialization
        DOCKER_HUB_CREDENTIALS = 'docker-hub-credentials' 
    }

    triggers {
        pollSCM('*/5 * * * *') // Check every 5 minutes
    }

    stages {

        stage('Checkout') {
            agent any
            steps {
                checkout scm
            }
        }

        stage('Build and Test Microservice 1') {
            steps {
                dir('.') {
                    script {
                        // Build Docker image for index.js
                        def DOCKER_IMAGE_NAME_1 = "azizdali/devops_project:index" // Modify image name
                        docker.build(DOCKER_IMAGE_NAME_1, '-f Dockerfile .')
                        // Run tests for microservice 1
                        sh 'npm install' // Modify for microservice 1
                         // Modify for microservice 1
                        // Push image to DockerHub for microservice 1
                        docker.withRegistry('https://registry.hub.docker.com', DOCKER_HUB_CREDENTIALS) {
                            docker.image(DOCKER_IMAGE_NAME_1).push()
                        }
                        // Clean up for microservice 1
                        sh "docker rmi ${DOCKER_IMAGE_NAME_1}"

                    }
                }
            }
        }

        stage('Build and Test Microservice 2') {
            steps {
                dir('auth') {
                    script {
                        // Build Docker image for auth.js
                        def DOCKER_IMAGE_NAME_2 = "azizdali/devops_project:auth" // Modify image name
                        docker.build(DOCKER_IMAGE_NAME_2, '-f Dockerfile .')
                        // Run tests for microservice 2
                        sh 'npm install' // Modify for microservice 2
                        sh 'npm test' // Modify for microservice 2
                        // Push image to DockerHub for microservice 2
                        docker.withRegistry('https://registry.hub.docker.com', DOCKER_HUB_CREDENTIALS) {
                            docker.image(DOCKER_IMAGE_NAME_2).push()
                        }
                        // Clean up for microservice 2
                        sh "docker rmi ${DOCKER_IMAGE_NAME_2}"
                    }
                }
            }
        }
    }

    post {
        success {
            echo 'Pipeline succeeded! Images pushed to DockerHub.'
        }
        failure {
            echo 'Pipeline failed! Check the logs for errors.'
        }
    }
}
