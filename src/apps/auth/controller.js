const { AuthService } = require("./service");

class AuthController {
  static async login(req, res) {
    const { username, password } = req.body;
    const result = await AuthService.login({ username, password });

    return res.success(result, req.t("auth.login_success"));
  }

  static async updateProfile(req, res) {
    const { username, password } = req.body;
    const result = await AuthService.login({ username, password });

    return res.success(result, req.t("auth.login_success"));
  }
}

module.exports = { AuthController };
