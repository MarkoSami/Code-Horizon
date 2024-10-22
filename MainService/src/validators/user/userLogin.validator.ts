import Joi from "joi";

const isEmail = (value: string) => value.includes("@");

const userLogin = Joi.object({
    credential: Joi.string()
        .min(3)
        .max(255)
        .required()
        .custom((value, helpers) => {
            if (isEmail(value)) {
                const emailSchema = Joi.string().email();
                const { error } = emailSchema.validate(value);
                if (error) {
                    return helpers.error('any.invalid');
                }
            } else {
                const alphanumSchema = Joi.string().alphanum();
                const { error } = alphanumSchema.validate(value);
                if (error) {
                    return helpers.error('any.invalid');
                }
            }
            return value;
        }, 'Credential Validation'),
    password: Joi.string().required(),
});

export default userLogin;
