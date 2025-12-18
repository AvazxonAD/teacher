const express = require("express");
const { CompetitionController } = require("./controller");
const { CompetitionSchema } = require("./schema");
const { validator } = require("../../middleware/validator");
const router = express.Router();

router.post("/", validator(CompetitionController.create, CompetitionSchema.createSchema()));
router.get("/", validator(CompetitionController.findAll, CompetitionSchema.findAllSchema()));
router.get("/:id", validator(CompetitionController.findById, CompetitionSchema.findByIdSchema()));
router.put("/:id", validator(CompetitionController.update, CompetitionSchema.updateSchema()));
router.delete("/:id", validator(CompetitionController.delete, CompetitionSchema.deleteSchema()));

module.exports = router;
