const { ArticleDB } = require("./db");
const ErrorResponse = require("../../helper/errorResponse");
const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const { HelperFunctions } = require('../../helper/functions')

class ArticleService {
    static async returnPageCount(file) {
        const pdfBytes = await fs.readFile(path.join(__dirname, '../../../public/uploads', file));
        const pdfDoc = await PDFDocument.load(pdfBytes);
        return pdfDoc.getPageCount();
    }

    static async create(data) {
        const file = data.file ? data.file.filename : null;
        let page_count;

        if (file) {
            page_count = await this.returnPageCount(file);
        }

        const result = await ArticleDB.create([
            data.title,
            data.description,
            data.author,
            data.read_time,
            data.category,
            file,
            page_count
        ]);
        return result;
    }

    static async findAll(data) {
        const offset = (data.page - 1) * data.limit

        const result = await ArticleDB.findAll([offset, data.limit]);

        const meta = HelperFunctions.pagination({ ...data, count: result.count })

        return { data: result.data, meta };
    }

    static async findById(data) {
        const result = await ArticleDB.findById([data.id]);
        if (!result) {
            throw new ErrorResponse("article.not_found", 404);
        }
        return result;
    }

    static async update(data) {
        const article = await this.findById(data);
        const file = data.file ? data.file.filename : article.pdf_url;

        let page_count;

        if (file) {
            page_count = await this.returnPageCount(file);
        }

        const result = await ArticleDB.update([
            id,
            data.title,
            data.description,
            data.author,
            data.read_time,
            data.category,
            file,
            page_count
        ]);
        return result;
    }

    static async delete(data) {
        await this.findById(data);
        await ArticleDB.delete([data.id]);
    }
}

module.exports = { ArticleService };
