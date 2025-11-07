FROM node:24-bullseye

# Instalar dependências do sistema
RUN apt-get update && export DEBIAN_FRONTEND=noninteractive \
    && apt-get -y install --no-install-recommends \
    git \
    curl \
    wget \
    vim \
    default-mysql-client \
    && apt-get clean \
    && rm -rf /var/lib/apt/lists/*

# Instalar ferramentas globais do Node.js
RUN npm install -g \
    nodemon \
    eslint \
    prettier

# Configurar usuário node
USER node

# Definir o diretório de trabalho
WORKDIR /workspace
