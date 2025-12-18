const express = require("express");
const { MethodicalController } = require("./controller");
const { MethodicalSchema } = require("./schema");
const { validator } = require("../../middleware/validator");
const { multiUpload } = require('../../middleware/upload')
const router = express.Router();

router.post("/", multiUpload.single('file'), validator(MethodicalController.create, MethodicalSchema.createSchema()));
router.get("/", validator(MethodicalController.findAll, MethodicalSchema.findAllSchema()));
router.get("/:id", validator(MethodicalController.findById, MethodicalSchema.findByIdSchema()));
router.put("/:id", multiUpload.single('file'), validator(MethodicalController.update, MethodicalSchema.updateSchema()));
router.delete("/:id", validator(MethodicalController.delete, MethodicalSchema.deleteSchema()));

module.exports = router;
