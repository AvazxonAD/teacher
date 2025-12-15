const Joi = require("joi");

class AuthSchema {
  static loginSchema() {
    return Joi.object({
      body: Joi.object({
        username: Joi.string().min(3).max(50).required(),
        password: Joi.string().min(1).max(255).required(),
      }),
    }).options({ stripUnknown: true });
  }

  static updatePassword() {
    return Joi.object({
      body: Joi.object({
        old_password: Joi.string().min(1).max(255).required(),
        new_password: Joi.string().min(1).max(255).required(),
      }),
      params: Joi.object({
        id: Joi.number().integer().positive().required(),
      }),
    }).options({ stripUnknown: true });
  }

  static updateProfile() {
    return Joi.object({
      body: Joi.object({
        username: Joi.string().min(1).max(255).required(),
        fio: Joi.string().min(1).max(255).required(),
        bio: Joi.string().min(1).max(255).required(),
      }),
      params: Joi.object({
        id: Joi.number().integer().positive().required(),
      }),
    }).options({ stripUnknown: true });
  }

  static register() {
    return Joi.object({
      body: Joi.object({
        username: Joi.string().min(1).max(255).required(),
        password: Joi.string().min(3).max(255).required(),
        fio: Joi.string().min(1).max(255).required(),
        bio: Joi.string().min(1).max(255).required(),
      }),
    }).options({ stripUnknown: true });
  }
}

module.exports = { AuthSchema };
