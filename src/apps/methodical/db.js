const { db } = require("../../config/db/index");

class MethodicalDB {
  static async create(params) {
    const result = await db.query(
      `--sql
      INSERT INTO methodologies(title, author, description, file_url, date, category, pages, created_at, updated_at) 
      VALUES($1, $2, $3, $4, $5, $6, $7, NOW(), NOW()) 
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
          * ,
          '${process.env.BASE_URL}/file/download?filename=' || file_url as file_url 
        FROM methodologies 
        WHERE isdeleted = FALSE 
        ORDER BY created_at DESC
        OFFSET $1 LIMIT $2
      ),
      total AS (
        SELECT COUNT(id)::INTEGER as count FROM methodologies WHERE isdeleted = FALSE
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
    const result = await db.query(`SELECT *, '${process.env.BASE_URL}/file/download?filename=' || file_url as file_url, file_url AS filename FROM methodologies WHERE id = $1 AND isdeleted = FALSE`, params);
    return result[0];
  }

  static async update(params) {
    const result = await db.query(
      `--sql
      UPDATE methodologies 
      SET 
        title = $2,
        author = $3,
        description = $4,
        file_url = $5,
        date = $6,
        category = $7,
        pages = $8,
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
      UPDATE methodologies 
      SET 
        isdeleted = TRUE
      WHERE id = $1
    `,
      params
    );
  }

  static async updateDownloadCount(params) {
    await db.query(`UPDATE methodologies SET downloads = downloads + 1 WHERE file_url = $1`, params);
  }

  static async updateViewsCount(params) {
    await db.query(`UPDATE methodologies SET views = views + 1 WHERE id = $1`, params);
  }
}

module.exports = { MethodicalDB };
