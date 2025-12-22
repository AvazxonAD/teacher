const { Joi } = require('../../helper/joi');

class MethodicalSchema {
    static createSchema() {
        return Joi.object({
            body: Joi.object({
                title: Joi.string().required(),
                author: Joi.string().required(),
                description: Joi.string().optional(),
                date: Joi.date().required(),
                category: Joi.string().optional(),
            })
        });
    }

    static updateSchema() {
        return Joi.object({
            body: Joi.object({
                title: Joi.string().optional(),
                author: Joi.string().optional(),
                description: Joi.string().optional(),
                date: Joi.date().optional(),
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

module.exports = { MethodicalSchema };
