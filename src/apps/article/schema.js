const Joi = require("joi");

class ArticleSchema {
    static createSchema() {
        return Joi.object({
            title: Joi.string().required(),
            description: Joi.string().optional(),
            author: Joi.string().optional(),
            read_time: Joi.string().optional(),
            category: Joi.string().optional(),
            pdf_url: Joi.string().optional(),
            page_count: Joi.number().integer().optional(),
        });
    }

    static updateSchema() {
        return Joi.object({
            title: Joi.string().optional(),
            description: Joi.string().optional(),
            author: Joi.string().optional(),
            read_time: Joi.string().optional(),
            category: Joi.string().optional(),
            pdf_url: Joi.string().optional(),
            page_count: Joi.number().integer().optional(),
        });
    }
}

module.exports = { ArticleSchema };
