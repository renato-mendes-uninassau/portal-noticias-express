const Usuario = require("../models/Usuario");

exports.lista = async (req, res) => {
  const usuarios = await Usuario.listar();
  res.render("usuarios/lista", {
    titulo: "Usuários",
    usuarios,
    layout: "admin",
  });
};

exports.novoForm = (req, res) => {
  res.render("usuarios/nova", { titulo: "Novo Usuário", layout: "admin" });
};

exports.criar = async (req, res) => {
  const { nome, email, senha, perfil } = req.body;
  const u = new Usuario({ nome, email, senha, perfil });
  await u.salvar();
  req.session.mensagem = { tipo: "sucesso", texto: "Usuário criado." };
  res.redirect("/admin/usuarios");
};

exports.deletar = async (req, res) => {
  const id = req.params.id;
  await Usuario.deletar(id);
  req.session.mensagem = { tipo: "sucesso", texto: "Usuário removido." };
  res.redirect("/admin/usuarios");
};
