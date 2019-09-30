pipeline {
    agent {
        docker { 
            image 'docker:18.05-dind' 
            args '-u root:root -p 3000:3000 --privileged -v /var/run/docker.sock:/var/run/docker.sock'
        }
    }
    environment {
        GCP_ACCESS_KEY = credentials('SPIN_GCP_DEV_SERVICE_ACC')
        DOCKER_REPOSITORY = "asia.gcr.io/pullptong/pullptong"
    }
}