import { Submission } from "@prisma/client";
import Joi from "joi";

const createSubmission = Joi.object<Submission>({
    code: Joi.string().required(),
    language: Joi.string().required().valid("cpp", "java", "python, javascript"),
    problemId: Joi.string().uuid().required(),
});


export default createSubmission;