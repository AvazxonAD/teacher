const { VideoDB } = require("./db");
const ErrorResponse = require("../../helper/errorResponse");
const { HelperFunctions } = require('../../helper/functions');
const fs = require('fs');
const path = require('path');

const { getVideoDurationInSeconds } = require('get-video-duration');

class VideoService {
    static async updateViewsCount(data) {
        await VideoDB.updateViewsCount([data.id]);
    }
    static formatDuration(seconds) {
        const minutes = Math.floor(seconds / 60);
        const remainingSeconds = Math.floor(seconds % 60);
        return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }

    static async returnDuration(file) {
        try {
            const filePath = path.join(__dirname, '../../../public/uploads', file);
            const duration = await getVideoDurationInSeconds(filePath);
            return this.formatDuration(Math.round(duration));
        } catch (error) {
            console.error("Error calculating duration:", error);
            return "0";
        }
    }

    static async create(data) {
        const file = data.file ? data.file.filename : null;
        let duration = data.duration;

        if (file) {
            duration = await this.returnDuration(file);
        }

        const result = await VideoDB.create([
            data.title,
            data.description,
            file,
            duration,
            data.category,
            data.publish_date,
            data.author
        ]);
        return result;
    }

    static async findAll(data) {
        const offset = (data.page - 1) * data.limit
        const result = await VideoDB.findAll([offset, data.limit]);
        const meta = HelperFunctions.pagination({ ...data, count: result.count })
        return { data: result.data, meta };
    }

    static async findById(data) {
        const result = await VideoDB.findById([data.id]);
        if (!result) {
            throw new ErrorResponse("video.not_found", 404);
        }
        await this.updateViewsCount(data);
        return result;
    }

    static async update(data) {
        const video = await this.findById(data);
        const file = data.file ? data.file.filename : video.video_url;
        let duration = video.duration;

        if (data.file) {
            duration = await this.returnDuration(file);
        }

        const result = await VideoDB.update([
            data.id,
            data.title || video.title,
            data.description || video.description,
            file,
            duration,
            data.category || video.category,
            data.publish_date || video.publish_date,
            data.author || video.author
        ]);
        return result;
    }

    static async delete(data) {
        await this.findById(data);
        await VideoDB.delete([data.id]);
    }

    static async stream(req, res) {
        const filename = req.params.filename;
        const filePath = path.join(__dirname, '../../../public/uploads', filename);

        if (!fs.existsSync(filePath)) {
            throw new ErrorResponse("file.not_found", 404);
        }

        const stat = fs.statSync(filePath);
        const fileSize = stat.size;
        const range = req.headers.range;

        if (range) {
            const parts = range.replace(/bytes=/, "").split("-");
            const start = parseInt(parts[0], 10);
            const end = parts[1] ? parseInt(parts[1], 10) : fileSize - 1;
            const chunksize = (end - start) + 1;
            const file = fs.createReadStream(filePath, { start, end });
            const head = {
                'Content-Range': `bytes ${start}-${end}/${fileSize}`,
                'Accept-Ranges': 'bytes',
                'Content-Length': chunksize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(206, head);
            file.pipe(res);
        } else {
            const head = {
                'Content-Length': fileSize,
                'Content-Type': 'video/mp4',
            };
            res.writeHead(200, head);
            fs.createReadStream(filePath).pipe(res);
        }
    }
}

module.exports = { VideoService };
