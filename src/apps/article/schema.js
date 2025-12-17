const { Joi } = require('../../helper/joi');

class ArticleSchema {
    static createSchema() {
        return Joi.object({
            body: Joi.object({
                title: Joi.string().required(),
                description: Joi.string().optional(),
                author: Joi.string().optional(),
                read_time: Joi.string().optional(),
                category: Joi.string().optional(),
            })
        });
    }

    static updateSchema() {
        return Joi.object({
            body: Joi.object({
                title: Joi.string().optional(),
                description: Joi.string().optional(),
                author: Joi.string().optional(),
                read_time: Joi.string().optional(),
                category: Joi.string().optional(),
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

module.exports = { ArticleSchema };
