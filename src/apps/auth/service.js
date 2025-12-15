const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");
const { UserDB } = require("./db");
const ErrorResponse = require("../../helper/errorResponse");

class AuthService {
  static async register(data) {
    const check = await UserDB.getByUsername([data.username]);
    if (check) {
      throw new ErrorResponse("auth.username_exists");
    }

    const password = await this.hashPassword(data);
    const image = data.file ? data.file.filename : null;
    const result = await UserDB.register([data.username, data.fio, image, password, data.bio]);
    return result;
  }

  static async getById(data) {
    const result = await UserDB.getById([data.id]);
    if (!result) {
      throw new ErrorResponse("user.not_found", 404);
    }
    return result;
  }

  static async verifyPassword(plainPassword, hashedPassword) {
    return await bcrypt.compare(plainPassword, hashedPassword);
  }

  static async login(data) {
    const { username, password } = data;

    const user = await UserDB.getByUsername([username]);
    if (!user) {
      throw new ErrorResponse("auth.user_not_found", 404);
    }

    const isPasswordValid = await this.verifyPassword(password, user.password);
    if (!isPasswordValid) {
      throw new ErrorResponse("auth.wrong_password", 403);
    }

    const token = this.generateToken(user);

    delete user.password;

    return {
      token,
      user,
    };
  }

  static generateToken(payload) {
    const secret = process.env.JWT_SECRET;
    const expiresIn = process.env.JWT_EXPIRES_IN;

    return jwt.sign(payload, secret, { expiresIn });
  }

  static async updateProfile(data) {
    const user = await this.getById(data);
    if (data.username !== user.username) {
      const check = await UserDB.getByUsername([data.username]);
      if (check) {
        throw new ErrorResponse("auth.username_exists");
      }
    }
    const image = data.file ? data.file.filename : user.image;
    const result = await UserDB.updateProfile([data.id, data.username, data.fio, image, data.bio]);
    delete result.password;
    return result;
  }

  static async updatePassword(data) {
    const user = await this.getById(data);
    const isPasswordValid = await this.verifyPassword(data.old_password, user.password);
    if (!isPasswordValid) {
      throw new ErrorResponse("auth.wrong_password", 403);
    }
    const password = await this.hashPassword({ ...data, password: data.new_password });

    await UserDB.updatePassword([data.id, password]);
  }

  static async hashPassword(data) {
    return await bcrypt.hash(data.password, 10);
  }
}

module.exports = { AuthService };
