pipeline {
  agent any

  environment {
    COMPOSE_PROJECT_NAME = "taller_motos"
  }

  stages {
    stage('Clonar repositorio') {
      steps {
        git 'https://github.com/JesusSerpaArrieta/taller-motos.git' 
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
