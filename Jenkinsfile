pipeline {
    agent any

    stages {
        stage('Checkout') {
            steps {
                git url: 'https://github.com/Shivansh-soni/budget-ease.git', branch: 'main' 
            }
        }

        stage('Install Dependencies') {
            steps {
                sh 'npm install'
            }
        }

        stage('Build') {
            steps {
                sh 'npm run build'
            }
        }

        stage('Deploy') {
            steps {
                sh "cp .next/  /var/www/node/budget-ease -r"
                // sh "npm run start"
                sh "pm2 reload 0"
                // sh 'sudo systemctl restart nginx'   
            }
        }
    }

    triggers {
        githubPush()
    }
}