pipeline {
    agent {
        docker { 
            image 'docker:18.05-dind' 
            args '-u root:root -p 3000:3000 --privileged -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    stages {
        stage('Build'){
            environment {
                GCP_ACCESS_KEY = credentials('PULLPTONG_SERVICE_ACCOUNT')
                DOCKER_REPOSITORY = "asia.gcr.io/pullptong/pullptong"
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
                K8S_CONFIG_FILE = credentials('K8S_CONFIG')
                PROJECT_NAME = "pullptong-client"
                GOOGLE_PROJECT_ID = "pullptong"
            }
            steps {
                sh '''
                apk add gettext sshpass curl git
                curl -LO https://storage.googleapis.com/kubernetes-release/release/v1.15.1/bin/linux/amd64/kubectl
                chmod u+x kubectl && mv kubectl /bin/kubectl
                '''
                sh '''
                mkdir ${HOME}/.kube
                cp ${K8S_CONFIG_FILE} ${HOME}/.kube
                envsubst < deployment.yaml > patch-deployment.yaml
                kubectl apply -f patch-deployment.yaml
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