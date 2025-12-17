exports.FileController = class {
    static async uploadFile(req, res) {
        try {
            const file = req.file;
            if (!file) {
                return res.status(400).json({ message: "File not found" });
            }
            res.json({ filename: file.filename });
        } catch (error) {
            console.error("Error uploading file:", error);
            res.status(500).json({ message: "Failed to upload file" });
        }
    }

    static async getFile(req, res) {
    }
};