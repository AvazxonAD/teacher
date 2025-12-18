const { Joi } = require('../../helper/joi');

class CompetitionSchema {
    static createSchema() {
        return Joi.object({
            body: Joi.object({
                title: Joi.string().required(),
                description: Joi.string().optional(),
                type: Joi.string().required(),
                topics: Joi.array().items(Joi.string()).required(),
                prize: Joi.string().optional().allow(null),
                deadline: Joi.string().optional().allow(null),
                participants: Joi.number().integer().optional().allow(null),
                difficulty: Joi.string().optional().allow(null),
            })
        });
    }

    static updateSchema() {
        return Joi.object({
            body: Joi.object({
                title: Joi.string().optional(),
                description: Joi.string().optional(),
                type: Joi.string().optional(),
                topics: Joi.array().items(Joi.string()).optional().allow(null),
                prize: Joi.string().optional().allow(null),
                deadline: Joi.string().optional().allow(null),
                participants: Joi.number().integer().optional().allow(null),
                difficulty: Joi.string().optional().allow(null),
            }),
            params: Joi.object({
                id: Joi.number().integer().positive().required(),
            })
        });
    }

    static deleteSchema() {
        return Joi.object({
            params: Joi.object({
                id: Joi.number().integer().positive().required(),
            })
        });
    }

    static findAllSchema() {
        return Joi.object({
            query: Joi.object({
                page: Joi.number().integer().positive().optional().default(1),
                limit: Joi.number().integer().positive().optional().default(10),
            })
        });
    }

    static findByIdSchema() {
        return Joi.object({
            params: Joi.object({
                id: Joi.number().integer().positive().required(),
            })
        });
    }
}

module.exports = { CompetitionSchema };
