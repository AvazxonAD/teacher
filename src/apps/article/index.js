const express = require("express");
const { ArticleController } = require("./controller");
const { ArticleSchema } = require("./schema");
const { validator } = require("../../middleware/validator");
const { multiUpload } = require('../../middleware/upload')
const router = express.Router();

router.post("/", multiUpload.single('file'), validator(ArticleController.create, ArticleSchema.createSchema()));
router.get("/", validator(ArticleController.findAll, ArticleSchema.findAllSchema()));
router.get("/:id", validator(ArticleController.findById, ArticleSchema.findByIdSchema()));
router.put("/:id", multiUpload.single('file'), validator(ArticleController.update, ArticleSchema.updateSchema()));
router.delete("/:id", validator(ArticleController.delete, ArticleSchema.deleteSchema()));

module.exports = router;
