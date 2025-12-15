const { ArticleService } = require("./service");

class ArticleController {
    static async create(req, res) {
        const result = await ArticleService.create(req.body);
        return res.success(result, req.t("article.create_success")); // Assuming translation key exists or will be generic
    }

    static async findAll(req, res) {
        const result = await ArticleService.findAll();
        return res.success(result, req.t("article.list_success"));
    }

    static async findById(req, res) {
        const result = await ArticleService.findById(req.params.id);
        return res.success(result, req.t("article.get_success"));
    }

    static async update(req, res) {
        const result = await ArticleService.update(req.params.id, req.body);
        return res.success(result, req.t("article.update_success"));
    }

    static async delete(req, res) {
        await ArticleService.delete(req.params.id);
        return res.success({}, req.t("article.delete_success"));
    }
}

module.exports = { ArticleController };
