const { db } = require("../../config/db/index");

class BookDB {

  static async updateDownloadCount(params) {
    await db.query(
      `--sql
      UPDATE books 
      SET 
        downloads = downloads + 1
      WHERE pdf_url = $1
    `,
      params
    );
  }

  static async create(params) {
    const result = await db.query(
      `--sql
      INSERT INTO books(title, author, category, pages, rating, description, is_bookmarked, pdf_url, created_at, updated_at) 
      VALUES($1, $2, $3, $4, $5, $6, $7, $8, NOW(), NOW())  
      RETURNING *
    `,
      params
    );
    return result[0];
  }

  static async findAll(params) {
    const result = await db.query(`
      WITH data AS (
        SELECT 
          *,
          '${process.env.BASE_URL}/file/download?filename=' || pdf_url as pdf_url 
        FROM books 
        WHERE deleted_at IS NULL 
        ORDER BY created_at DESC
        OFFSET $1 LIMIT $2
      ),
      total AS (
        SELECT COUNT(id)::INTEGER as count FROM books WHERE deleted_at IS NULL
      )
      SELECT 
        (SELECT COALESCE(JSON_AGG(ROW_TO_JSON(data)), '[]') FROM data) AS data,
        (SELECT count FROM total) AS count
    `,
      params
    );

    return result[0];
  }

  static async findById(params) {
    const result = await db.query(`SELECT *, pdf_url AS filename, '${process.env.BASE_URL}/file/download?filename=' || pdf_url as pdf_url FROM books WHERE id = $1 AND deleted_at IS NULL`, params);
    return result[0];
  }

  static async update(params) {
    const result = await db.query(
      `--sql
      UPDATE books 
      SET 
        title = $2,
        author = $3,
        category = $4,
        pages = $5,
        rating = $6,
        description = $7,
        is_bookmarked = $8,
        pdf_url = $9,
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
      UPDATE books 
      SET 
        deleted_at = now()
      WHERE id = $1
    `,
      params
    );
  }
}

module.exports = { BookDB };
