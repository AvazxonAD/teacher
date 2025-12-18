const { Joi } = require('../../helper/joi');

class BookSchema {
    static createSchema() {
        return Joi.object({
            body: Joi.object({
                title: Joi.string().required(),
                author: Joi.string().required(),
                category: Joi.string().optional(),
                rating: Joi.number().precision(1).max(10).optional(),
                description: Joi.string().optional(),
                is_bookmarked: Joi.boolean().optional(),
            })
        });
    }

    static updateSchema() {
        return Joi.object({
            body: Joi.object({
                title: Joi.string().optional(),
                author: Joi.string().optional(),
                category: Joi.string().optional(),
                rating: Joi.number().precision(1).max(10).optional(),
                description: Joi.string().optional(),
                is_bookmarked: Joi.boolean().optional(),
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
                page: Joi.number().integer().positive().optional(),
                limit: Joi.number().integer().positive().optional(),
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

module.exports = { BookSchema };
