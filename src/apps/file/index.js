const express = require("express");
const { Controller } = require("./controller");
const { Schema } = require("./schema");
const { validator } = require("../../middleware/validator");
const router = express.Router();

router.get("/download", validator(Controller.getFile, Schema.downloadSchema()));

module.exports = router;
