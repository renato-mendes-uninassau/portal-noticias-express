const Categoria = require("../models/Categoria");

exports.lista = async (req, res) => {
  const categorias = await Categoria.listar();
  res.render("categorias/lista", {
    titulo: "Categorias",
    categorias,
    layout: "admin",
  });
};

exports.novoForm = (req, res) => {
  res.render("categorias/nova", { titulo: "Nova Categoria", layout: "admin" });
};

exports.criar = async (req, res) => {
  const { nome } = req.body;
  const c = new Categoria({ nome });
  await c.salvar();
  req.session.mensagem = { tipo: "sucesso", texto: "Categoria criada." };
  res.redirect("/admin/categorias");
};

exports.deletar = async (req, res) => {
  const id = req.params.id;
  await Categoria.deletar(id);
  req.session.mensagem = { tipo: "sucesso", texto: "Categoria removida." };
  res.redirect("/admin/categorias");
};
