FROM node:20

WORKDIR /app

# Copia solo los archivos de dependencias primero
COPY package*.json ./

# Instala Vite globalmente
RUN npm install -g vite

# Instala las dependencias del proyecto (dev + prod)
RUN npm install

# Copia el resto del código
COPY . .

# Expone el puerto predeterminado de Vite
EXPOSE 5173

# Usa Vite global
CMD ["vite"]
