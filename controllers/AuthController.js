const Usuario = require("../models/Usuario");
const bcrypt = require("bcrypt");

exports.showLogin = (req, res) => {
  res.render("login", { titulo: "Login" });
};

exports.login = async (req, res) => {
  const { email, senha } = req.body;
  const usuario = await Usuario.buscarPorEmail(email);
  if (!usuario) {
    req.session.mensagem = { tipo: "erro", texto: "Usuário não encontrado." };
    return res.redirect("/login");
  }

  const ok = await bcrypt.compare(senha, usuario.senha);
  if (!ok) {
    req.session.mensagem = { tipo: "erro", texto: "Senha incorreta." };
    return res.redirect("/login");
  }

  // set session without senha
  req.session.usuario = {
    id: usuario.id,
    nome: usuario.nome,
    email: usuario.email,
    perfil: usuario.perfil,
  };
  res.redirect("/admin/noticias");
};

exports.logout = (req, res) => {
  req.session.destroy(() => {
    res.redirect("/");
  });
};
