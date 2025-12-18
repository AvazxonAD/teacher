const { CompetitionDB } = require("./db");
const ErrorResponse = require("../../helper/errorResponse");
const { HelperFunctions } = require('../../helper/functions')

class CompetitionService {
    static async create(data) {
        const result = await CompetitionDB.create([
            data.title,
            data.description,
            data.type,
            data.topics,
            data.prize,
            data.deadline,
            data.participants,
            data.difficulty
        ]);
        return result;
    }

    static async findAll(data) {
        const offset = (data.page - 1) * data.limit
        const result = await CompetitionDB.findAll([offset, data.limit]);
        const meta = HelperFunctions.pagination({ ...data, count: result.count })
        return { data: result.data, meta };
    }

    static async findById(data) {
        const result = await CompetitionDB.findById([data.id]);
        if (!result) {
            throw new ErrorResponse("competition.not_found", 404);
        }
        return result;
    }

    static async update(data) {
        await this.findById(data);

        const result = await CompetitionDB.update([
            data.id,
            data.title,
            data.description,
            data.type,
            data.topics,
            data.prize,
            data.deadline,
            data.participants,
            data.difficulty
        ]);
        return result;
    }

    static async delete(data) {
        await this.findById(data);
        await CompetitionDB.delete([data.id]);
    }
}

module.exports = { CompetitionService };
