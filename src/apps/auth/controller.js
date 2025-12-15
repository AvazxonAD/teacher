const { AuthService } = require("./service");

class AuthController {
  static async register(req, res) {
    const result = await AuthService.register({ ...req.params, ...req.body, file: req.file });
    return res.success(result, req.t("auth.register_success"));
  }

  static async login(req, res) {
    const { username, password } = req.body;
    const result = await AuthService.login({ username, password });
    return res.success(result, req.t("auth.login_success"));
  }

  static async updateProfile(req, res) {
    const result = await AuthService.updateProfile({ ...req.body, ...req.params, file: req.file });
    return res.success(result, req.t("auth.login_success"));
  }

  static async updatePassword(req, res) {
    await AuthService.updatePassword({ ...req.params, ...req.body });
    return res.success({}, req.t("auth.update_password"));
  }
}

module.exports = { AuthController };
