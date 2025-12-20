const { BookService } = require("./service");

class BookController {
    static async create(req, res) {
        const result = await BookService.create({ ...req.body, files: req.files });
        return res.success(result, req.t("book.create_success"));
    }

    static async findAll(req, res) {
        const result = await BookService.findAll(req.query);
        return res.success(result, req.t("book.list_success"));
    }

    static async findById(req, res) {
        const result = await BookService.findById(req.params);
        return res.success(result, req.t("book.get_success"));
    }

    static async update(req, res) {
        const result = await BookService.update({ ...req.params, ...req.body, files: req.files });
        return res.success(result, req.t("book.update_success"));
    }

    static async delete(req, res) {
        await BookService.delete(req.params);
        return res.success({}, req.t("book.delete_success"));
    }
}

module.exports = { BookController };
