pipeline {
  agent any

  environment {
    COMPOSE_PROJECT_NAME = "taller_motos"
  }

  stages {
    stage('Clonar repositorio') {
      steps {
        git 'https://turepo.git' // Cambia por tu repo
      }
    }

    stage('Levantar servicios') {
      steps {
        sh 'docker-compose down'      // Baja si ya estaba corriendo
        sh 'docker-compose up --build -d'
      }
    }

    stage('Verificar servicios') {
      steps {
        sh 'docker ps'
      }
    }
  }

  post {
    always {
      echo 'Pipeline finalizado.'
    }
  }
}
