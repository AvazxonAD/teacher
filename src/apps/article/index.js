const express = require("express");
const { ArticleController } = require("./controller");
const { ArticleSchema } = require("./schema");
const { validator } = require("../../middleware/validator");

const router = express.Router();

router.post("/", validator(ArticleController.create, ArticleSchema.createSchema()));
router.get("/", ArticleController.findAll);
router.get("/:id", ArticleController.findById);
router.put("/:id", validator(ArticleController.update, ArticleSchema.updateSchema()));
router.delete("/:id", ArticleController.delete);

module.exports = router;
