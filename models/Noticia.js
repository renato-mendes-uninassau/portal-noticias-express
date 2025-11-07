const db = require("../config/db");

class Noticia {
  constructor({
    id,
    titulo,
    conteudo,
    id_categoria,
    id_autor,
    data_publicacao,
  }) {
    this.id = id;
    this.titulo = titulo;
    this.conteudo = conteudo;
    this.id_categoria = id_categoria;
    this.id_autor = id_autor;
    this.data_publicacao = data_publicacao;
  }

  static async listar(limit = 20) {
    const [rows] = await db.query(
      `SELECT n.id, n.titulo, LEFT(n.conteudo, 300) AS resumo, n.data_publicacao, c.nome AS categoria, u.nome AS autor
       FROM noticias n
       LEFT JOIN categorias c ON n.id_categoria = c.id
       LEFT JOIN usuarios u ON n.id_autor = u.id
       ORDER BY n.data_publicacao DESC
       LIMIT ?`,
      [limit]
    );
    return rows;
  }

  static async buscarPorId(id) {
    const [rows] = await db.query(
      `SELECT n.*, c.nome AS categoria, u.nome AS autor, u.id AS autor_id
       FROM noticias n
       LEFT JOIN categorias c ON n.id_categoria = c.id
       LEFT JOIN usuarios u ON n.id_autor = u.id
       WHERE n.id = ?`,
      [id]
    );
    return rows[0];
  }

  static async listarPorCategoria(id_categoria) {
    const [rows] = await db.query(
      `SELECT n.id, n.titulo, LEFT(n.conteudo, 300) AS resumo, n.data_publicacao, c.nome AS categoria, u.nome AS autor
       FROM noticias n
       LEFT JOIN categorias c ON n.id_categoria = c.id
       LEFT JOIN usuarios u ON n.id_autor = u.id
       WHERE n.id_categoria = ?
       ORDER BY n.data_publicacao DESC`,
      [id_categoria]
    );
    return rows;
  }

  async salvar() {
    const [result] = await db.execute(
      "INSERT INTO noticias (titulo, conteudo, id_categoria, id_autor) VALUES (?, ?, ?, ?)",
      [this.titulo, this.conteudo, this.id_categoria, this.id_autor]
    );
    this.id = result.insertId;
    return this;
  }

  async atualizar() {
    await db.execute(
      "UPDATE noticias SET titulo = ?, conteudo = ?, id_categoria = ? WHERE id = ?",
      [this.titulo, this.conteudo, this.id_categoria, this.id]
    );
    return this;
  }

  static async deletar(id) {
    await db.execute("DELETE FROM noticias WHERE id = ?", [id]);
  }
}

module.exports = Noticia;
