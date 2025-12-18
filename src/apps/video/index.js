const express = require("express");
const { VideoController } = require("./controller");
const { VideoSchema } = require("./schema");
const { validator } = require("../../middleware/validator");
const { multiUpload } = require('../../middleware/upload')
const router = express.Router();

router.post("/", multiUpload.single('file'), validator(VideoController.create, VideoSchema.createSchema()));
router.get("/", validator(VideoController.findAll, VideoSchema.findAllSchema()));
router.get("/:id", validator(VideoController.findById, VideoSchema.findByIdSchema()));
router.put("/:id", multiUpload.single('file'), validator(VideoController.update, VideoSchema.updateSchema()));
router.delete("/:id", validator(VideoController.delete, VideoSchema.deleteSchema()));
router.get("/stream/:filename", validator(VideoController.stream, VideoSchema.streamSchema()));

module.exports = router;
