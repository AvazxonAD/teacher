const { db } = require("../../config/db/index");

class UserDB {
  static async getByUsername(params) {
    const result = await db.query("SELECT * FROM users WHERE username = $1 AND deleted_at IS NULL", params);
    return result[0];
  }

  static async getById(params) {
    const result = await db.query("SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL", params);
    return result[0];
  }

  static async register(params) {
    const result = await db.query(
      `--sql
      INSERT INTO users(username, fio, image, password, bio, created_at, updated_at) VALUES($1, $2, $3, $4, $5, NOW(), NOW()) RETURNING *
    `,
      params
    );

    return result[0];
  }

  static async updateProfile(params) {
    const result = await db.query(
      `--sql
      UPDATE users 
      SET 
        username = $2, 
        fio = $3,
        image = $4, 
        bio = $5,
        updated_at = now()
      WHERE id = $1
      RETURNING *  
    `,
      params
    );

    return result[0];
  }

  static async updatePassword(params) {
    await db.query(
      `--sql
      UPDATE users 
      SET 
        password = $2,
        updated_at = now()
      WHERE id = $1
    `,
      params
    );
  }
}

module.exports = { UserDB };
