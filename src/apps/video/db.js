const { db } = require("../../config/db/index");

class VideoDB {
    static async create(params) {
        const result = await db.query(
            `--sql
      INSERT INTO videos(title, description, video_url, duration, category, publish_date, author, created_at, updated_at) 
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
          *,
          '${process.env.BASE_URL}/video/stream/' || video_url as stream_url
        FROM videos 
        WHERE deleted_at IS NULL 
        ORDER BY created_at DESC
        OFFSET $1 LIMIT $2
      ),
      total AS (
        SELECT COUNT(id)::INTEGER as count FROM videos WHERE deleted_at IS NULL
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
        const result = await db.query(`
        SELECT 
            *,
            '${process.env.BASE_URL}/video/stream/' || video_url as stream_url 
        FROM videos 
        WHERE id = $1 AND deleted_at IS NULL
    `, params);
        return result[0];
    }

    static async update(params) {
        const result = await db.query(
            `--sql
      UPDATE videos 
      SET 
        title = $2,
        description = $3,
        video_url = $4,
        duration = $5,
        category = $6,
        publish_date = $7,
        author = $8,
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
      UPDATE videos 
      SET 
        deleted_at = now()
      WHERE id = $1
    `,
            params
        );
    }

    static async updateViewsCount(params) {
        await db.query(`UPDATE videos SET views = views + 1 WHERE id = $1`, params);
    }
}

module.exports = { VideoDB };
