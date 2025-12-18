const { MethodicalDB } = require("./db");
const ErrorResponse = require("../../helper/errorResponse");
const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const { HelperFunctions } = require('../../helper/functions')

class MethodicalService {
    static async updateDownloadCount(data) {
        await MethodicalDB.updateDownloadCount([data.filename]);
    }

    static async updateViewsCount(data) {
        await MethodicalDB.updateViewsCount([data.id]);
    }

    static async returnPageCount(file) {
        try {
            const pdfBytes = await fs.readFile(path.join(__dirname, '../../../public/uploads', file));
            const pdfDoc = await PDFDocument.load(pdfBytes);
            return pdfDoc.getPageCount();
        } catch (error) {
            return 0;
        }
    }

    static async create(data) {
        const file = data.file ? data.file.filename : null;
        let page_count = 0;

        if (file) {
            page_count = await this.returnPageCount(file);
        }

        const result = await MethodicalDB.create([
            data.title,
            data.author,
            data.description,
            file,
            data.date,
            data.category,
            page_count
        ]);
        return result;
    }

    static async findAll(data) {
        const offset = (data.page - 1) * data.limit
        const result = await MethodicalDB.findAll([offset, data.limit]);
        const meta = HelperFunctions.pagination({ ...data, count: result.count })
        return { data: result.data, meta };
    }

    static async findById(data) {
        const result = await MethodicalDB.findById([data.id]);
        if (!result) {
            throw new ErrorResponse("methodical.not_found", 404);
        }
        await this.updateViewsCount(data);
        return result;
    }

    static async update(data) {
        const methodical = await this.findById(data);
        const file = data.file ? data.file.filename : methodical.filename;
        let page_count = methodical.pages;

        if (data.file) {
            page_count = await this.returnPageCount(file);
        }

        const result = await MethodicalDB.update([
            data.id,
            data.title || methodical.title,
            data.author || methodical.author,
            data.description || methodical.description,
            file,
            data.date || methodical.date,
            data.category || methodical.category,
            page_count
        ]);
        return result;
    }

    static async delete(data) {
        await this.findById(data);
        await MethodicalDB.delete([data.id]);
    }
}

module.exports = { MethodicalService };
