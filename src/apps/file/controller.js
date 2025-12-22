const path = require('path');
const { ArticleService } = require('../article/service');
const { BookService } = require('../book/service');
const mime = require('mime-types');
const fs = require('fs/promises');
const { MethodicalService } = require('../methodical/service');


exports.Controller = class {
    static async uploadFile(req, res) {
        try {
            const file = req.file;
            if (!file) {
                return res.error(req.i18n.t("file.not_found"), 400);
            }
            res.success({ filename: file.filename });
        } catch (error) {
            console.error("Error uploading file:", error);
            res.error(req.i18n.t("file.upload_error"), 500);
        }
    }

    static async getFile(req, res) {
        const file = req.query.filename;
        const file_path = path.join(__dirname, '../../../public/uploads', file);

        try {
            await fs.access(file_path);
        } catch (error) {
            console.error("File not found:", file_path);
            return res.error(req.i18n.t("file.not_found"), 404);
        }

        await ArticleService.updateDownloadCount({ filename: file });
        await BookService.updateDownloadCount({ filename: file });
        await MethodicalService.updateDownloadCount({ filename: file });

        const content_type = mime.lookup(file);

        const fileRes = await fs.readFile(file_path);

        res.set('Content-Type', content_type);

        return res.send(fileRes)
    }
};