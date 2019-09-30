pipeline {
    agent {
        docker { 
            image 'docker:18.05-dind' 
            args '-u root:root -p 3000:3000 --privileged -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    environment {
        GCP_ACCESS_KEY = credentials('PULLPTONG_SERVICE_ACCOUNT')
        DOCKER_REPOSITORY = "asia.gcr.io/pullptong/pullptong"
    }
    stages {
        stage('Build'){
            when {
                branch 'master'
            }
            steps {
                sh '''
                docker info
                docker login -u _json_key -p "$(cat $GCP_ACCESS_KEY)" https://asia.gcr.io
                docker build --tag $DOCKER_REPOSITORY:$GIT_COMMIT --tag $DOCKER_REPOSITORY:latest .
                docker push $DOCKER_REPOSITORY:$GIT_COMMIT
                docker push $DOCKER_REPOSITORY:latest
                echo 'Success register app image'
                '''
            }
        }
        stage('Deployment'){
            environment {
                PROJECT_NAME = "pullptong"
                GOOGLE_PROJECT_ID = "pullptong"
                HEALTHCHECK_PATH = "/healthz"
                K8S_SERVER_PASS = "qazwsx123@@"
                K8S_SERVER_URL = "119.59.113.182"
            }
            when {
                branch 'master'
            }
            agent {
                docker {
                    image 'lachlanevenson/k8s-kubectl:v1.16.0'
                }
            }
            steps {
                sh '''
                apk add gettext sshpass
                '''
                sh '''
                sshpass -p "${K8S_SERVER_PASS}" scp -r root@${K8S_SERVER_URL}:/root/.kube /root/.kube
                envsubst < ci-cd/deployment.yaml > ci-cd/patch-deployment.yaml
                kubectl apply -f ci-cd/patch-deployment.yaml
                kubectl rollout status deployment/${PROJECT_NAME} --timeout=3m
                if [ $? -ne 0 ]; then
                    kubectl rollout undo deployment/${PROJECT_NAME}
                else
                    echo 0
                fi
                '''
            }
        }
    }
}