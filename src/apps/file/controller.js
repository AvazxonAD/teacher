const path = require('path');
const { ArticleService } = require('../article/service');
const { BookService } = require('../book/service');

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

        await ArticleService.updateDownloadCount({ filename: file });
        await BookService.updateDownloadCount({ filename: file });

        res.download(path.join(__dirname, '../../../public/uploads', file), (err) => {
            if (err) {
                console.error("Error downloading file:", err);
                res.error(req.i18n.t("file.download_error"), 500);
            }
        });
    }
};