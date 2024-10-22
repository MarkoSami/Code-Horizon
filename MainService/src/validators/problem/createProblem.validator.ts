import Joi from "joi";
import CreateProblemDto from "../../dtos/problemDtos/createProblem.dto";


const alphanumericAndWhiteSpacesPattern = /^[a-zA-Z0-9\s]*$/;
const createProblem = Joi.object<CreateProblemDto>({
    title: Joi.string()
        .pattern(alphanumericAndWhiteSpacesPattern)  // Regular expression for alphanumeric and white spaces
        .required()  // Ensure the field is required, if needed
        .messages({
            'string.pattern.base': 'Field can only contain alphanumeric characters and white spaces'
        }).min(3).max(255).required(),
    description: Joi.string().min(3).max(1000).required(),
    difficulty: Joi.string().valid("easy", "medium", "hard").required(),
    functionName: Joi.string().min(1).max(255).required(),
    parametersNames: Joi.array().items(
        Joi.string().min(1).max(255)
    ).min(1).max(10).required()

});


export default createProblem;
