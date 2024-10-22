import Joi from "joi";
import { PaginationConfig } from "../config/pagination.config";

const queryStringValidator = Joi.object({
    page: Joi.number().min(1).optional(),
    limit: Joi.number().min(1).max(PaginationConfig.MAX_PAGE_SIZE).optional(),
    sortBy: Joi.string().valid('title', 'createdAt', 'updatedAt', 'difficulty').optional(),
    order: Joi.string().valid('asc', 'desc').optional(),
}).unknown(true);


export default queryStringValidator;

