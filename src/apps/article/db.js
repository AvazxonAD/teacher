const { db } = require("../../config/db/index");

class ArticleDB {
  static async create(params) {
    const result = await db.query(
      `--sql
      INSERT INTO articles(title, description, author, read_time, category, pdf_url, page_count, created_at, updated_at) 
      VALUES($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) 
      RETURNING *
    `,
      params
    );
    return result[0];
  }

  static async findAll(params) {
    // Basic implementation, can be expanded for pagination/filtering
    const result = await db.query("SELECT * FROM articles WHERE deleted_at IS NULL ORDER BY created_at DESC");
    return result;
  }

  static async findById(params) {
    const result = await db.query("SELECT * FROM articles WHERE id = $1 AND deleted_at IS NULL", params);
    return result[0];
  }

  static async update(params) {
    const result = await db.query(
      `--sql
      UPDATE articles 
      SET 
        title = $2,
        description = $3,
        author = $4,
        read_time = $5,
        category = $6,
        pdf_url = $7,
        page_count = $8,
        updated_at = now()
      WHERE id = $1
      RETURNING *
    `,
      params
    );
    return result[0];
  }

  static async delete(params) {
    await db.query(
      `--sql
      UPDATE articles 
      SET 
        deleted_at = now()
      WHERE id = $1
    `,
      params
    );
  }
}

module.exports = { ArticleDB };
