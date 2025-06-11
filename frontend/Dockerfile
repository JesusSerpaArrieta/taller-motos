FROM node:18

WORKDIR /app

# Variables de entorno necesarias
ENV HOST=0.0.0.0
ENV VITE_API_URL=http://backend:3000

# Copia archivos para instalar dependencias primero
COPY package.json ./

# Instala dependencias
RUN npm install --legacy-peer-deps

# Copia el resto de los archivos
COPY . .

EXPOSE 5173

CMD ["npm", "run", "dev"]
