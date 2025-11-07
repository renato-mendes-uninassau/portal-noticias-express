# Portal de Notícias - Node.js + Express

Um portal de notícias completo desenvolvido com **Node.js**, **Express.js**, **EJS** e **MySQL**. Este projeto serve como material didático para aprender desenvolvimento web full-stack com JavaScript.

## 📋 Índice

- [Sobre o Projeto](#sobre-o-projeto)
- [Tecnologias Utilizadas](#tecnologias-utilizadas)
- [Funcionalidades](#funcionalidades)
- [Pré-requisitos](#pré-requisitos)
- [Instalação](#instalação)
- [Estrutura do Projeto](#estrutura-do-projeto)
- [Conceitos Abordados](#conceitos-abordados)
- [Rotas da Aplicação](#rotas-da-aplicação)
- [Banco de Dados](#banco-de-dados)
- [Segurança](#segurança)

## 🎯 Sobre o Projeto

Este é um portal de notícias completo com área administrativa, desenvolvido para fins didáticos. O projeto demonstra boas práticas de desenvolvimento web, incluindo arquitetura MVC, autenticação de usuários, validação de dados e operações CRUD completas.

### Características principais:
- 📰 Portal público de notícias com listagem e visualização individual
- 🔐 Sistema de autenticação com sessões
- 👥 Área administrativa protegida
- 📝 CRUD completo de notícias, categorias e usuários
- 🎨 Interface responsiva e moderna
- 🔒 Senhas criptografadas com bcrypt
- ⚡ Tratamento de erros assíncrono

## 🚀 Tecnologias Utilizadas

### Backend
- **Node.js** (v24.11.0) - Runtime JavaScript
- **Express.js** (4.18.2) - Framework web minimalista
- **MySQL2** (3.2.0) - Cliente MySQL com suporte a Promises
- **EJS** (3.1.9) - Template engine para renderização de views
- **bcrypt** (5.1.0) - Criptografia de senhas
- **express-session** (1.17.3) - Gerenciamento de sessões
- **dotenv** (16.0.3) - Gerenciamento de variáveis de ambiente

### Frontend
- HTML5, CSS3, JavaScript
- Design responsivo com Flexbox e Grid
- Interface moderna e intuitiva

### Desenvolvimento
- **nodemon** (3.1.10) - Reinicialização automática do servidor
- ESLint ready - Configuração para boas práticas de código

## ✨ Funcionalidades

### Área Pública
- ✅ Listagem de notícias na página inicial
- ✅ Visualização individual de notícias
- ✅ Filtro de notícias por categoria
- ✅ Layout responsivo para dispositivos móveis

### Área Administrativa
- ✅ Sistema de login com autenticação
- ✅ Dashboard com estatísticas
- ✅ Gerenciamento de notícias (criar, editar, deletar)
- ✅ Gerenciamento de categorias
- ✅ Gerenciamento de usuários (apenas para admins)
- ✅ Controle de acesso por perfil (admin/editor)

## 📦 Pré-requisitos

Antes de começar, certifique-se de ter instalado:

- **Node.js** (versão 18 ou superior)
- **MySQL** (versão 8.0 ou superior)
- **npm** (geralmente vem com o Node.js)
- Um editor de código (recomendado: VS Code)

## 🔧 Instalação

### 1. Clone o repositório
```bash
git clone <url-do-repositorio>
cd express-noticias
```

### 2. Instale as dependências
```bash
npm install
```

### 3. Configure as variáveis de ambiente
Copie o arquivo de exemplo e configure suas credenciais:
```bash
cp .env.example .env
```

Edite o arquivo `.env` com suas configurações:
```env
# Configurações do banco de dados
DB_HOST=localhost
DB_USER=root
DB_PASS=sua_senha
DB_NAME=express_noticias

# Configurações da aplicação
PORT=3000
SESSION_SECRET=sua_chave_secreta_aqui
```

### 4. Crie o banco de dados
Execute o script de seed para criar as tabelas e dados iniciais:
```bash
npm run seed
```

Isso irá criar:
- Tabelas: `usuarios`, `categorias`, `noticias`
- Usuário administrador: `admin@example.com` / `admin123`
- Categoria padrão: "Geral"
- Notícias de exemplo

### 5. Inicie a aplicação

**Modo desenvolvimento (com auto-reload):**
```bash
npm run dev
```

**Modo produção:**
```bash
npm start
```

### 6. Acesse a aplicação
Abra seu navegador em: [http://localhost:3000](http://localhost:3000)

**Login admin:** 
- Email: `admin@example.com`
- Senha: `admin123`

## 📁 Estrutura do Projeto

```
express-noticias/
├── app.js                      # Arquivo principal da aplicação
├── package.json                # Dependências e scripts
├── .env                        # Variáveis de ambiente (não versionado)
├── .env.example               # Exemplo de configuração
│
├── config/
│   └── db.js                  # Configuração da conexão com MySQL
│
├── middleware/
│   └── asyncHandler.js        # Wrapper para tratamento de erros async
│
├── models/                    # Camada de dados (Model)
│   ├── Usuario.js            # Model de usuários
│   ├── Noticia.js            # Model de notícias
│   └── Categoria.js          # Model de categorias
│
├── controllers/               # Lógica de negócio (Controller)
│   ├── AuthController.js     # Autenticação (login/logout)
│   ├── NoticiaController.js  # CRUD de notícias
│   ├── UsuarioController.js  # CRUD de usuários
│   └── CategoriaController.js # CRUD de categorias
│
├── routes/                    # Definição de rotas
│   ├── auth.js               # Rotas de autenticação
│   ├── noticias.js           # Rotas de notícias (public + admin)
│   ├── usuarios.js           # Rotas de usuários
│   └── categorias.js         # Rotas de categorias
│
├── views/                     # Templates EJS (View)
│   ├── partials/             # Componentes reutilizáveis
│   │   ├── header.ejs        # Header público
│   │   ├── footer.ejs        # Footer público
│   │   ├── admin_header.ejs  # Header admin
│   │   └── admin_footer.ejs  # Footer admin
│   │
│   ├── admin/
│   │   └── dashboard.ejs     # Dashboard administrativo
│   │
│   ├── noticias/
│   │   ├── lista.ejs         # Listagem admin
│   │   ├── nova.ejs          # Formulário criar
│   │   ├── editar.ejs        # Formulário editar
│   │   └── view.ejs          # Visualização pública
│   │
│   ├── usuarios/
│   │   ├── lista.ejs         # Listagem de usuários
│   │   └── nova.ejs          # Formulário criar usuário
│   │
│   ├── categorias/
│   │   ├── lista.ejs         # Listagem de categorias
│   │   └── nova.ejs          # Formulário criar categoria
│   │
│   ├── index.ejs             # Página inicial (grid de notícias)
│   ├── login.ejs             # Página de login
│   └── error.ejs             # Página de erro
│
├── public/                    # Arquivos estáticos
│   ├── css/
│   │   └── style.css         # Estilos da aplicação
│   └── js/
│       └── script.js         # JavaScript do frontend
│
└── scripts/
    └── seed.js               # Script de inicialização do banco
```

## 💡 Conceitos Abordados

### 1. Arquitetura MVC (Model-View-Controller)
- **Model**: Camada de acesso aos dados (models/)
- **View**: Templates EJS para apresentação (views/)
- **Controller**: Lógica de negócio (controllers/)

### 2. Express.js Fundamentals
```javascript
// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static('public'));

// Roteamento
app.use('/', noticiaRoutes.public);
app.use('/admin', verificaLogin, noticiaRoutes.admin);

// Tratamento de erros
app.use((err, req, res, next) => {
  res.status(500).render('error', { erro: err.message });
});
```

### 3. Async/Await com MySQL
```javascript
// Exemplo de model usando Promises
async listar() {
  const [rows] = await pool.query('SELECT * FROM noticias');
  return rows;
}

// Wrapper para tratamento de erros
const asyncHandler = (fn) => (req, res, next) => {
  Promise.resolve(fn(req, res, next)).catch(next);
};
```

### 4. Autenticação e Sessões
```javascript
// Middleware de verificação
function verificaLogin(req, res, next) {
  if (!req.session.usuario) {
    return res.redirect('/login');
  }
  next();
}

// Login com bcrypt
const senhaValida = await bcrypt.compare(senha, usuario.senha);
```

### 5. Template Engine EJS
```ejs
<!-- Renderização dinâmica -->
<% noticias.forEach(noticia => { %>
  <div class="news-card">
    <h3><%= noticia.titulo %></h3>
    <p><%= noticia.resumo %></p>
  </div>
<% }) %>

<!-- Includes/Partials -->
<%- include('partials/header') %>
```

## 🛣️ Rotas da Aplicação

### Rotas Públicas
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/` | Página inicial com listagem de notícias |
| GET | `/noticia/:id` | Visualizar notícia individual |
| GET | `/categoria/:id` | Notícias por categoria |
| GET | `/login` | Página de login |
| POST | `/login` | Processar login |
| GET | `/logout` | Fazer logout |

### Rotas Administrativas (Requer Login)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/admin` | Dashboard |
| GET | `/admin/noticias` | Listar notícias |
| GET | `/admin/noticias/nova` | Formulário nova notícia |
| POST | `/admin/noticias/nova` | Criar notícia |
| GET | `/admin/noticias/editar/:id` | Formulário editar |
| POST | `/admin/noticias/editar/:id` | Atualizar notícia |
| POST | `/admin/noticias/deletar/:id` | Deletar notícia |

### Rotas de Usuários (Requer Admin)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/admin/usuarios` | Listar usuários |
| GET | `/admin/usuarios/nova` | Formulário novo usuário |
| POST | `/admin/usuarios/nova` | Criar usuário |
| POST | `/admin/usuarios/deletar/:id` | Deletar usuário |

### Rotas de Categorias (Requer Login)
| Método | Rota | Descrição |
|--------|------|-----------|
| GET | `/admin/categorias` | Listar categorias |
| GET | `/admin/categorias/nova` | Formulário nova categoria |
| POST | `/admin/categorias/nova` | Criar categoria |
| POST | `/admin/categorias/deletar/:id` | Deletar categoria |

## 💾 Banco de Dados

### Estrutura das Tabelas

**usuarios**
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- nome (VARCHAR 100)
- email (VARCHAR 100, UNIQUE)
- senha (VARCHAR 255) -- Hash bcrypt
- perfil (ENUM: 'admin', 'editor')
- criado_em (TIMESTAMP)
```

**categorias**
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- nome (VARCHAR 100)
```

**noticias**
```sql
- id (INT, PRIMARY KEY, AUTO_INCREMENT)
- titulo (VARCHAR 200)
- resumo (TEXT)
- conteudo (TEXT)
- usuario_id (INT, FOREIGN KEY)
- categoria_id (INT, FOREIGN KEY)
- data_publicacao (TIMESTAMP)
```

## 🔒 Segurança

Este projeto implementa diversas práticas de segurança:

✅ **Senhas Criptografadas**: Uso de bcrypt com salt rounds
✅ **Variáveis de Ambiente**: Credenciais sensíveis em .env
✅ **Sessões Seguras**: express-session com secret
✅ **SQL Injection Protection**: Uso de prepared statements
✅ **Controle de Acesso**: Middleware de autenticação e autorização
✅ **Validação de Entrada**: Sanitização de dados do usuário

## 📚 Próximos Passos

Para expandir este projeto, você pode:

- [ ] Adicionar upload de imagens para notícias
- [ ] Implementar paginação nas listagens
- [ ] Adicionar sistema de comentários
- [ ] Criar API REST JSON
- [ ] Implementar busca de notícias
- [ ] Adicionar editor de texto rico (WYSIWYG)
- [ ] Implementar testes automatizados
- [ ] Deploy em produção (Heroku, Railway, etc)

## 📖 Recursos de Aprendizado

- [Documentação Express.js](https://expressjs.com/)
- [Documentação EJS](https://ejs.co/)
- [Node.js Best Practices](https://github.com/goldbergyoni/nodebestpractices)
- [MySQL2 Documentation](https://www.npmjs.com/package/mysql2)

## 🤝 Contribuindo

Contribuições são bem-vindas! Sinta-se à vontade para abrir issues ou pull requests.

## 📄 Licença

Este projeto é de código aberto e está disponível para fins educacionais.

---

Desenvolvido com 💙 para aprendizado de Node.js e Express.js
