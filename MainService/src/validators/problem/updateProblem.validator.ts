import Joi from "joi";
import UpdateProblem from "../../dtos/problemDtos/updateProblem.dto";


const alphanumericAndWhiteSpacesPattern = /^[a-zA-Z0-9\s]*$/;

const createProblem = Joi.object<UpdateProblem>({
    title: Joi.string().pattern(alphanumericAndWhiteSpacesPattern).min(3).max(255).optional(),
    description: Joi.string().min(3).max(1000).optional(),
    difficulty: Joi.string().valid("easy", "medium", "hard").optional(),
    functionName: Joi.string().min(1).max(255).required(),
    parametersNames: Joi.array().items(
        Joi.string().min(1).max(255)
    ).min(1).max(10).required()
});


export default createProblem;
