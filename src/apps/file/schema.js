const { Joi } = require("../../helper/joi")

exports.Schema = class {
    static downloadSchema() {
        return Joi.object({
            query: Joi.object({
                filename: Joi.string().required()
            })
        })
    }
}