# Usar a imagem node:16.14-alpine como base
FROM node:16.14-alpine


# Mudar para o diretório de trabalho /app-backend	# Mudar para o diretório de trabalho /app/backend
WORKDIR /app-backend


# Copiar os package.json e package-lock.json para o container	# Copiar os package.json e package-lock.json para o container
COPY package*.json ./


# Instalar as dependências Node	# Instalar as dependências Node
RUN npm install


# Copiar o restante dos arquivos da aplicação para o container	# Copiar arquivos e diretórios específicos necessários para a compilação

COPY . .


# Sinalize que aplicação expõe a porta 3001	# Compilar os arquivos TypeScript
EXPOSE 3001


# Configurar os comandos para iniciar a aplicação de acordo com as boas práticas	# Sinalizar que a aplicação expõe a porta 3001
# Dica: Leia a seção Docker e Docker-compose no README para mais informações	EXPOSE 3001

ENTRYPOINT [ "npm", "run" ]
CMD [ "start" ]
