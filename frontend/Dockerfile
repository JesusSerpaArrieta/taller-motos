FROM node:20

WORKDIR /app

# Copia el package.json y package-lock.json
COPY package*.json ./

# Instala TODAS las dependencias (incluyendo devDependencies)
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto de Vite
EXPOSE 5173

# Comando para correr Vite en modo dev
CMD ["npm", "run", "dev"]
