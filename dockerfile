# Imagem base
FROM node:24

# Pasta dentro do container
WORKDIR /app

# Copia package.json
COPY package*.json ./

# Instala dependências
RUN npm install

# Copia o restante do projeto
COPY . .

# Compila TypeScript
RUN npm run build

# Expõe a porta
EXPOSE 3000

# Inicia a aplicação
CMD ["npm", "run", "start"]