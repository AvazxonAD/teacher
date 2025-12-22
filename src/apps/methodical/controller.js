const { MethodicalService } = require("./service");

class MethodicalController {
    static async create(req, res) {
        const result = await MethodicalService.create({ ...req.body, file: req.file });
        return res.success(result, req.t("methodical.create_success"));
    }

    static async findAll(req, res) {
        const result = await MethodicalService.findAll(req.query);
        return res.success(result, req.t("methodical.list_success"));
    }

    static async findById(req, res) {
        const result = await MethodicalService.findById(req.params);
        return res.success(result, req.t("methodical.get_success"));
    }

    static async update(req, res) {
        const result = await MethodicalService.update({ ...req.params, ...req.body, file: req.file });
        return res.success(result, req.t("methodical.update_success"));
    }

    static async delete(req, res) {
        await MethodicalService.delete(req.params);
        return res.success({}, req.t("methodical.delete_success"));
    }
}

module.exports = { MethodicalController };
