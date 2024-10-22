import { Submission } from "@prisma/client";
import Joi from "joi";

const updateSubmission = Joi.object<Submission>({
    verdict: Joi.string().valid("ACC", "WA", "TLE", "MLE", "RE", "CE", "PENDING").optional(),
});


export default updateSubmission;