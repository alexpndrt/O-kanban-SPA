import Joi from 'joi';

export default Joi.object({
    title: Joi.string().min(5),
    position: Joi.number().integer().positive()
})
.min(1)
.required();