-- Script de inicialização do banco de dados
CREATE DATABASE IF NOT EXISTS express_noticias CHARACTER SET utf8mb4 COLLATE utf8mb4_unicode_ci;

-- Conceder privilégios ao usuário da aplicação
GRANT ALL PRIVILEGES ON express_noticias.* TO 'app_user'@'%';
FLUSH PRIVILEGES;
