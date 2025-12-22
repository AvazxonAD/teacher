const { VideoService } = require("./service");

class VideoController {
    static async create(req, res) {
        const result = await VideoService.create({ ...req.body, file: req.file });
        return res.success(result, req.t("video.create_success"));
    }

    static async findAll(req, res) {
        const result = await VideoService.findAll(req.query);
        return res.success(result, req.t("video.list_success"));
    }

    static async findById(req, res) {
        const result = await VideoService.findById(req.params);
        return res.success(result, req.t("video.get_success"));
    }

    static async update(req, res) {
        const result = await VideoService.update({ ...req.params, ...req.body, file: req.file });
        return res.success(result, req.t("video.update_success"));
    }

    static async delete(req, res) {
        await VideoService.delete(req.params);
        return res.success({}, req.t("video.delete_success"));
    }

    static async stream(req, res) {
        await VideoService.stream(req, res);
    }
}

module.exports = { VideoController };
