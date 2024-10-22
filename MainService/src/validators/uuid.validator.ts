import Joi from 'joi';

const uuid = Joi.string().uuid().required();


export default uuid;