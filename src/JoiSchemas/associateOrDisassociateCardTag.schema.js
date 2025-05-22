import Joi from 'joi';

export default Joi.object({
    card_id: Joi.number().integer().positive().required(),
    tag_id: Joi.number().integer().positive().required(),
}).required();
