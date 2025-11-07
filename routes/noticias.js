const express = require("express");
const routerPublic = express.Router();
const routerAdmin = express.Router();
const NoticiaController = require("../controllers/NoticiaController");
const asyncHandler = require("../middleware/asyncHandler");

// Public routes
routerPublic.get("/", asyncHandler(NoticiaController.indexPublic));
routerPublic.get("/noticia/:id", asyncHandler(NoticiaController.viewNoticia));
routerPublic.get(
  "/categoria/:id",
  asyncHandler(NoticiaController.listarPorCategoria)
);

// Admin routes (these will be mounted under /admin/noticias)
routerAdmin.get("/", asyncHandler(NoticiaController.listarAdmin));
routerAdmin.get("/nova", asyncHandler(NoticiaController.novaForm));
routerAdmin.post("/nova", asyncHandler(NoticiaController.criar));
routerAdmin.get("/editar/:id", asyncHandler(NoticiaController.editarForm));
routerAdmin.post("/editar/:id", asyncHandler(NoticiaController.atualizar));
routerAdmin.post("/deletar/:id", asyncHandler(NoticiaController.deletar));

module.exports = { public: routerPublic, admin: routerAdmin };
