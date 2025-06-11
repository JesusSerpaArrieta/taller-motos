FROM node:18

WORKDIR /app

# Copia primero solo los archivos esenciales para dependencias
COPY package.json ./

# Instala dependencias (generará package-lock.json automáticamente)
RUN npm install --legacy-peer-deps

# Ahora copia el resto incluyendo el package-lock.json generado
COPY . .

ENV VITE_HOST=0.0.0.0
EXPOSE 5173

CMD ["npm", "run", "dev"]