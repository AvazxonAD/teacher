const express = require("express");
const { BookController } = require("./controller");
const { BookSchema } = require("./schema");
const { validator } = require("../../middleware/validator");
const { multiUpload } = require('../../middleware/upload')
const router = express.Router();

router.post("/", multiUpload.fields([
    { name: 'pdf', maxCount: 1 },
    { name: 'image', maxCount: 1 }
]), validator(BookController.create, BookSchema.createSchema()));
router.get("/", validator(BookController.findAll, BookSchema.findAllSchema()));
router.get("/:id", validator(BookController.findById, BookSchema.findByIdSchema()));
router.put("/:id", multiUpload.fields([
    { name: 'pdf', maxCount: 1 },
    { name: 'image', maxCount: 1 }
]), validator(BookController.update, BookSchema.updateSchema()));
router.delete("/:id", validator(BookController.delete, BookSchema.deleteSchema()));

module.exports = router;
