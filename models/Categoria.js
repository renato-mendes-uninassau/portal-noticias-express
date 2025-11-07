const db = require("../config/db");

class Categoria {
  constructor({ id, nome }) {
    this.id = id;
    this.nome = nome;
  }

  static async listar() {
    const [rows] = await db.query(
      "SELECT id, nome FROM categorias ORDER BY nome"
    );
    return rows;
  }

  static async buscarPorId(id) {
    const [rows] = await db.query(
      "SELECT id, nome FROM categorias WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  async salvar() {
    const [result] = await db.execute(
      "INSERT INTO categorias (nome) VALUES (?)",
      [this.nome]
    );
    this.id = result.insertId;
    return this;
  }

  async atualizar() {
    await db.execute("UPDATE categorias SET nome = ? WHERE id = ?", [
      this.nome,
      this.id,
    ]);
    return this;
  }

  static async deletar(id) {
    await db.execute("DELETE FROM categorias WHERE id = ?", [id]);
  }
}

module.exports = Categoria;
