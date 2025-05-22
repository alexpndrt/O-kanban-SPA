import Joi from 'joi';

export default Joi.object({
  name: Joi.string().min(5).required(),
  color: Joi.string().regex(/^#[A-Fa-f0-9]{6}/)
})
.min(1)
.required();