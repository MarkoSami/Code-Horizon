import { TestCase } from "@prisma/client";
import Joi from "joi";

const updateTestCase = Joi.object<TestCase>({
    input: Joi.object().optional(),
    output: Joi.object().optional(),
    timeInMS: Joi.number().positive().max(5000).optional(),
    memoryInMB: Joi.number().positive().max(128).optional(),
});

export default updateTestCase;