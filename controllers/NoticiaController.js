const Noticia = require("../models/Noticia");
const Categoria = require("../models/Categoria");
const Usuario = require("../models/Usuario");

exports.indexPublic = async (req, res) => {
  const noticias = await Noticia.listar(50);
  res.render("index", { titulo: "Últimas notícias", noticias });
};

exports.viewNoticia = async (req, res) => {
  const id = req.params.id;
  const noticia = await Noticia.buscarPorId(id);
  if (!noticia) {
    req.session.mensagem = { tipo: "erro", texto: "Notícia não encontrada." };
    return res.redirect("/");
  }
  res.render("noticias/view", { titulo: noticia.titulo, noticia });
};

exports.listarAdmin = async (req, res) => {
  const noticias = await Noticia.listar(100);
  res.render("noticias/lista", {
    titulo: "Gerenciar Notícias",
    noticias,
    layout: "admin",
  });
};

exports.novaForm = async (req, res) => {
  const categorias = await Categoria.listar();
  res.render("noticias/nova", {
    titulo: "Nova Notícia",
    categorias,
    layout: "admin",
  });
};

exports.criar = async (req, res) => {
  const { titulo, conteudo, id_categoria } = req.body;
  const noticia = new Noticia({
    titulo,
    conteudo,
    id_categoria,
    id_autor: req.session.usuario.id,
  });
  await noticia.salvar();
  req.session.mensagem = { tipo: "sucesso", texto: "Notícia criada." };
  res.redirect("/admin/noticias");
};

exports.editarForm = async (req, res) => {
  const id = req.params.id;
  const noticia = await Noticia.buscarPorId(id);
  const categorias = await Categoria.listar();
  if (!noticia) {
    req.session.mensagem = { tipo: "erro", texto: "Notícia não encontrada." };
    return res.redirect("/admin/noticias");
  }
  res.render("noticias/editar", {
    titulo: "Editar Notícia",
    noticia,
    categorias,
    layout: "admin",
  });
};

exports.atualizar = async (req, res) => {
  const id = req.params.id;
  const { titulo, conteudo, id_categoria } = req.body;
  const noticia = new Noticia({ id, titulo, conteudo, id_categoria });
  await noticia.atualizar();
  req.session.mensagem = { tipo: "sucesso", texto: "Notícia atualizada." };
  res.redirect("/admin/noticias");
};

exports.deletar = async (req, res) => {
  const id = req.params.id;
  await Noticia.deletar(id);
  req.session.mensagem = { tipo: "sucesso", texto: "Notícia removida." };
  res.redirect("/admin/noticias");
};

exports.listarPorCategoria = async (req, res) => {
  const id = req.params.id;
  const noticias = await Noticia.listarPorCategoria(id);
  res.render("index", { titulo: "Notícias por categoria", noticias });
};
