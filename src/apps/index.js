const express = require("express");

const router = express.Router();

const AuthRoutes = require("./auth/index");
const ArticleRoutes = require("./article/index");
const FileRoutes = require("./file/index");
const BookRoutes = require("./book/index");
const CompetitionRoutes = require("./competition/index");

router.use("/auth", AuthRoutes);
router.use("/article", ArticleRoutes);
router.use("/competition", CompetitionRoutes);
router.use("/methodical", require("./methodical/index"));
router.use("/video", require("./video/index"));
router.use("/file", FileRoutes);
router.use("/book", BookRoutes);

module.exports = router;
