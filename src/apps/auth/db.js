const { db } = require("../../config/db/index");

class UserDB {
  static async getByUsername(params) {
    const result = await db.query("SELECT * FROM users WHERE username = $1 AND deleted_at IS NULL", params);
    return result[0] || null;
  }

  static async getById(params) {
    const result = await db.query("SELECT * FROM users WHERE id = $1 AND deleted_at IS NULL", params);
    return result[0] || null;
  }
}

module.exports = { UserDB };
