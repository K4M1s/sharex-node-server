pipeline {
    agent {
        docker { image 'node:16' }
    }
    environment {
        HOME = '.'
    }
    stages {
        stage('Install packages') {
            steps {
                sh 'npm install'
            }
        }
        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }
    }
}