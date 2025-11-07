const express = require("express");
const router = express.Router();
const CategoriaController = require("../controllers/CategoriaController");
const asyncHandler = require("../middleware/asyncHandler");

router.get("/", asyncHandler(CategoriaController.lista));
router.get("/nova", asyncHandler(CategoriaController.novoForm));
router.post("/nova", asyncHandler(CategoriaController.criar));
router.post("/deletar/:id", asyncHandler(CategoriaController.deletar));

module.exports = router;
