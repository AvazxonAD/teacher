const { BookDB } = require("./db");
const ErrorResponse = require("../../helper/errorResponse");
const { PDFDocument } = require('pdf-lib');
const fs = require('fs').promises;
const path = require('path');
const { HelperFunctions } = require('../../helper/functions')

class BookService {
    static async returnPageCount(file) {
        const pdfBytes = await fs.readFile(path.join(__dirname, '../../../public/uploads', file));
        const pdfDoc = await PDFDocument.load(pdfBytes);
        return pdfDoc.getPageCount();
    }

    static async updateDownloadCount(data) {
        await BookDB.updateDownloadCount([data.filename]);
    }

    static async create(data) {
        if (!data.file) {
            throw new ErrorResponse('book.file_not_found', 400);
        }

        const file = data.file.filename;
        let pages;

        if (file) {
            pages = await this.returnPageCount(file);
        }


        const result = await BookDB.create([
            data.title,
            data.author,
            data.category,
            pages || 0,
            data.rating || 0,
            data.description,
            data.is_bookmarked || false,
            file,
        ]);
        return result;
    }

    static async findAll(data) {
        const offset = (data.page - 1) * data.limit

        const result = await BookDB.findAll([offset, data.limit]);

        const meta = HelperFunctions.pagination({ ...data, count: result.count })

        return { data: result.data, meta };
    }

    static async findById(data) {
        const result = await BookDB.findById([data.id]);
        if (!result) {
            throw new ErrorResponse("book.not_found", 404);
        }
        return result;
    }

    static async update(data) {
        const book = await this.findById(data);
        const file = data.file ? data.file.filename : book.filename;

        let pages = data.pages || book.pages;

        if (data.file) {
            pages = await this.returnPageCount(file);
        }

        const result = await BookDB.update([
            data.id,
            data.title,
            data.author,
            data.category,
            pages,
            data.rating,
            data.description,
            data.is_bookmarked,
            file
        ]);
        return result;
    }

    static async delete(data) {
        await this.findById(data);
        await BookDB.delete([data.id]);
    }
}

module.exports = { BookService };
