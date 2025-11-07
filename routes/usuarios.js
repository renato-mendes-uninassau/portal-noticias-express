const express = require("express");
const router = express.Router();
const UsuarioController = require("../controllers/UsuarioController");
const asyncHandler = require("../middleware/asyncHandler");

router.get("/", asyncHandler(UsuarioController.lista));
router.get("/nova", asyncHandler(UsuarioController.novoForm));
router.post("/nova", asyncHandler(UsuarioController.criar));
router.post("/deletar/:id", asyncHandler(UsuarioController.deletar));

module.exports = router;
