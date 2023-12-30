# Use uma imagem de node.js como base
FROM node:14

# Crie e defina o diretório de trabalho no contêiner
WORKDIR /usr/src/app

# Copie os arquivos de package.json e package-lock.json para o diretório de trabalho
COPY package*.json ./

# Instale as dependências
RUN npm install

# Copie os arquivos do código-fonte para o diretório de trabalho
COPY . .

# Compile o código TypeScript (se aplicável)
RUN npm run build

# Exponha a porta em que a aplicação estará em execução
EXPOSE 5000

# Comando para iniciar a aplicação
CMD ["npm", "start"]
