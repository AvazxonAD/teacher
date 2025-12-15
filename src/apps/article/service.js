const { ArticleDB } = require("./db");
const ErrorResponse = require("../../helper/errorResponse");

class ArticleService {
    static async create(data) {
        // Add any specific business logic validation here if needed
        const result = await ArticleDB.create([
            data.title,
            data.description,
            data.author,
            data.read_time,
            data.category,
            data.pdf_url,
            data.page_count
        ]);
        return result;
    }

    static async findAll() {
        return await ArticleDB.findAll();
    }

    static async findById(id) {
        const result = await ArticleDB.findById([id]);
        if (!result) {
            throw new ErrorResponse("article.not_found", 404);
        }
        return result;
    }

    static async update(id, data) {
        const article = await this.findById(id);

        const result = await ArticleDB.update([
            id,
            data.title || article.title,
            data.description || article.description,
            data.author || article.author,
            data.read_time || article.read_time,
            data.category || article.category,
            data.pdf_url || article.pdf_url,
            data.page_count || article.page_count
        ]);
        return result;
    }

    static async delete(id) {
        await this.findById(id); // Ensure exists
        await ArticleDB.delete([id]);
    }
}

module.exports = { ArticleService };
