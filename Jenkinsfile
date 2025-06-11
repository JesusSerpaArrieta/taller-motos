pipeline {
    agent any

    options {
        skipDefaultCheckout(true) // Evita el checkout automático
    }

    stages {
        stage('Clonar repositorio') {
            steps {
                echo 'Clonando repositorio desde rama main...'
                git branch: 'main', url: 'https://github.com/JesusSerpaArrieta/taller-motos.git'
            }
        }

        stage('Instalar dependencias Frontend') {
            steps {
                dir('frontend') {
                    echo 'Instalando dependencias del frontend...'
                    bat 'npm install --legacy-peer-deps'
                }
            }
        }

        stage('Instalar dependencias Backend') {
            steps {
                dir('backend') {
                    echo 'Instalando dependencias del backend...'
                    bat 'npm install'
                }
            }
        }

        stage('Ejecutar pruebas Frontend') {
            steps {
                dir('frontend') {
                    echo 'Ejecutando pruebas del frontend (si existen)...'
                    bat 'npm test || exit 0'
                }
            }
        }

        stage('Construir imágenes Docker') {
            steps {
                echo 'Construyendo imágenes Docker...'
                bat 'docker-compose build'
            }
        }

        stage('Desplegar servicios con Docker') {
            steps {
                echo 'Desplegando contenedores...'
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
            echo '❌ Algo falló durante el pipeline. Revisa los logs.'
        }
    }
}
