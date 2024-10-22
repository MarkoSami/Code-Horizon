//* middlewares/Validator.js
import { Request, Response, NextFunction } from "express";
const Validators = require("../validators");


export default function (validator: string) {
    if (!Validators.hasOwnProperty(validator))
        throw new Error(`'${validator}' validator does not exist`);

    return async function (req: Request, res: Response, next: NextFunction) {
        try {
            if (
                (req.method === "GET" || req.method === "DELETE") &&
                validator !== "queryString"
            ) {
                return next();
            }

            const validateQuery = (validator === "queryString");
            const validationData = validateQuery ? req.query : req.body;
            const validated = await Validators[validator].validateAsync(
                validationData
            );
            if (validateQuery) {
                req.query = validated;
            } else {

                req.body = validated;
            }
            next();
        } catch (err: any) {
            if (err.isJoi) {
                // Format the error message
                const errorMessage = err.details.map((detail: any) => ({
                    field: detail.context.key,
                    message: detail.message.replace(/"/g, ""),
                }));
                return res.status(422).json({ errors: errorMessage });
            }

            res.status(500).json({ message: "Internal Server Error" });
        }
    };
};
