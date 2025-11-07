const express = require("express");
const session = require("express-session");
const path = require("path");
require("dotenv").config();

const app = express();
const PORT = process.env.PORT || 3000;

// Routes
const authRoutes = require("./routes/auth");
const noticiasRoutes = require("./routes/noticias");
const usuariosRoutes = require("./routes/usuarios");
const categoriasRoutes = require("./routes/categorias");

// Middleware
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.set("views", path.join(__dirname, "views"));
app.set("view engine", "ejs");

app.use(
  session({
    secret: process.env.SESSION_SECRET || "segredo",
    resave: false,
    saveUninitialized: false,
  })
);

// set common locals and flash-like messages
app.use((req, res, next) => {
  res.locals.usuario = req.session.usuario || null;
  res.locals.mensagem = req.session.mensagem || null;
  delete req.session.mensagem;
  next();
});

// auth routes
app.use("/", authRoutes);

// public news routes
app.use("/", noticiasRoutes.public);

// middleware to protect admin routes
function verificaLogin(req, res, next) {
  if (!req.session.usuario) return res.redirect("/login");
  next();
}

function verificaAdmin(req, res, next) {
  if (!req.session.usuario || req.session.usuario.perfil !== "admin") {
    req.session.mensagem = {
      tipo: "erro",
      texto: "Acesso negado: admin apenas.",
    };
    return res.redirect("/");
  }
  next();
}

// admin news routes (protected)
app.use("/admin/noticias", verificaLogin, noticiasRoutes.admin);
app.use("/admin/usuarios", verificaLogin, verificaAdmin, usuariosRoutes);
app.use("/admin/categorias", verificaLogin, verificaAdmin, categoriasRoutes);

// Admin dashboard
app.get("/admin", verificaLogin, (req, res) => {
  res.render("admin/dashboard", { titulo: "Dashboard", layout: "admin" });
});

app.get("/", (req, res) => {
  res.redirect("/"); // the noticias public router handles '/'
});

// Error handler (must be after routes)
app.use((err, req, res, next) => {
  console.error(err);
  res.status(err.status || 500);
  // render an error page if possible
  if (req.accepts("html")) {
    return res.render("error", { titulo: "Erro", error: err });
  }
  res.json({ error: "Internal Server Error" });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
});

module.exports = app;
