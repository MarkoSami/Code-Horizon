import { TestCase } from "@prisma/client";
import Joi from "joi";



const createTestCase = Joi.object<TestCase>({
    input: Joi.object().required(),
    output: Joi.array().required(),
    timeInMS: Joi.number().positive().max(5000).required(),
    memoryInMB: Joi.number().positive().max(128).required(),
    problemId: Joi.string().uuid().required()
});


export default createTestCase;