import Joi from 'joi';

export default Joi.object({
  name: Joi.string().required(),
  width: Joi.number().min(1).max(5000).required(),
  height: Joi.number().min(1).max(5000).required(),
});
