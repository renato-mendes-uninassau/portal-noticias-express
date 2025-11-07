const db = require("../config/db");
const bcrypt = require("bcrypt");

class Usuario {
  constructor({ id, nome, email, senha, perfil }) {
    this.id = id;
    this.nome = nome;
    this.email = email;
    this.senha = senha;
    this.perfil = perfil || "editor";
  }

  static async listar() {
    const [rows] = await db.query(
      "SELECT id, nome, email, perfil FROM usuarios ORDER BY id DESC"
    );
    return rows;
  }

  static async buscarPorId(id) {
    const [rows] = await db.query(
      "SELECT id, nome, email, perfil FROM usuarios WHERE id = ?",
      [id]
    );
    return rows[0];
  }

  static async buscarPorEmail(email) {
    const [rows] = await db.query("SELECT * FROM usuarios WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }

  async salvar() {
    const hash = await bcrypt.hash(this.senha, 10);
    const [result] = await db.execute(
      "INSERT INTO usuarios (nome, email, senha, perfil) VALUES (?, ?, ?, ?)",
      [this.nome, this.email, hash, this.perfil]
    );
    this.id = result.insertId;
    delete this.senha;
    return this;
  }

  async atualizar() {
    if (this.senha) {
      const hash = await bcrypt.hash(this.senha, 10);
      await db.execute(
        "UPDATE usuarios SET nome = ?, email = ?, senha = ?, perfil = ? WHERE id = ?",
        [this.nome, this.email, hash, this.perfil, this.id]
      );
    } else {
      await db.execute(
        "UPDATE usuarios SET nome = ?, email = ?, perfil = ? WHERE id = ?",
        [this.nome, this.email, this.perfil, this.id]
      );
    }
    return this;
  }

  static async deletar(id) {
    await db.execute("DELETE FROM usuarios WHERE id = ?", [id]);
  }
}

module.exports = Usuario;
