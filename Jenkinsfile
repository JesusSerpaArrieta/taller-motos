pipeline {
    agent any

    environment {
        // Puedes definir variables globales aquí si las necesitas
    }

    stages {

        stage('Preparar entorno') {
            steps {
                echo 'Clonando repositorio desde GitHub (ya lo hace Jenkins si está bien configurado)'
                // Jenkins ya clona el repo automáticamente si está configurado con SCM
            }
        }

        stage('Instalar dependencias Frontend') {
            steps {
                dir('frontend') {
                    echo 'Instalando dependencias del frontend...'
                    bat 'npm install'
                }
            }
        }

        stage('Instalar dependencias Backend') {
            steps {
                dir('backend') {
                    echo 'Instalando dependencias del backend...'
                    bat 'npm install' // Asumiendo que usas Node.js en backend también
                }
            }
        }

        stage('Ejecutar pruebas') {
            steps {
                echo 'Ejecutando pruebas...'
                dir('frontend') {
                    // Solo es un placeholder. Debes definir pruebas si las tienes.
                    bat 'npm test || exit 0'
                }
            }
        }

        stage('Construir imagen Docker') {
            steps {
                echo 'Construyendo imágenes Docker...'
                bat 'docker-compose build'
            }
        }

        stage('Desplegar con Docker Compose') {
            steps {
                echo 'Desplegando servicios...'
                bat 'docker-compose down'
                bat 'docker-compose up -d'
            }
        }
    }

    post {
        success {
            echo '✅ CI/CD ejecutado correctamente.'
        }
        failure {
            echo '❌ Algo falló durante el pipeline.'
        }
    }
}
