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
                sh "rsync -av --exclude=node_modules ./ /var/www/node/budget-ease/"
                sh "export PM2_HOME=/home/kalakaars/.pm2"
                sh "npm install"
                sh "pm2 reload 0"
                // sh "npm run start"
                // sh 'sudo systemctl restart nginx'   
            }
        }
    }

    triggers {
        githubPush()
    }
}