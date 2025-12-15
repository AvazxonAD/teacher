const express = require("express");
const { AuthController } = require("./controller");
const { AuthSchema } = require("./schema");
const { validator } = require("../../middleware/validator");
const { multiUpload } = require("../../middleware/upload");

const router = express.Router();

router.post("/login", validator(AuthController.login, AuthSchema.loginSchema()));
router.put("/profile/:id", multiUpload.single("file"), validator(AuthController.updateProfile, AuthSchema.updateProfile()));
router.post("/register", multiUpload.single("file"), validator(AuthController.register, AuthSchema.register()));
router.put("/password/:id", validator(AuthController.updatePassword, AuthSchema.updatePassword()));

module.exports = router;
