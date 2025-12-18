const { CompetitionService } = require("./service");

class CompetitionController {
    static async create(req, res) {
        const result = await CompetitionService.create(req.body);
        return res.success(result, req.t("competition.create_success"));
    }

    static async findAll(req, res) {
        const result = await CompetitionService.findAll(req.query);
        return res.success(result, req.t("competition.list_success"));
    }

    static async findById(req, res) {
        const result = await CompetitionService.findById(req.params);
        return res.success(result, req.t("competition.get_success"));
    }

    static async update(req, res) {
        const result = await CompetitionService.update({ ...req.params, ...req.body });
        return res.success(result, req.t("competition.update_success"));
    }

    static async delete(req, res) {
        await CompetitionService.delete(req.params);
        return res.success({}, req.t("competition.delete_success"));
    }
}

module.exports = { CompetitionController };
