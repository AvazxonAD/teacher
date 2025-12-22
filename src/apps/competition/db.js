const { db } = require("../../config/db/index");

class CompetitionDB {
    static async create(params) {
        const result = await db.query(
            `--sql
      INSERT INTO competitions(title, description, type, topics, prize, deadline, participants, difficulty, created_at, updated_at) 
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
          * 
        FROM competitions 
        WHERE deleted_at IS NULL 
        ORDER BY created_at DESC
        OFFSET $1 LIMIT $2
      ),
      total AS (
        SELECT COUNT(id)::INTEGER as count FROM competitions WHERE deleted_at IS NULL
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
        const result = await db.query("SELECT * FROM competitions WHERE id = $1 AND deleted_at IS NULL", params);
        return result[0];
    }

    static async update(params) {
        const result = await db.query(
            `--sql
      UPDATE competitions 
      SET 
        title = $2,
        description = $3,
        type = $4,
        topics = $5,
        prize = $6,
        deadline = $7,
        participants = $8,
        difficulty = $9,
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
      UPDATE competitions 
      SET 
        deleted_at = now()
      WHERE id = $1
    `,
            params
        );
    }
}

module.exports = { CompetitionDB };
