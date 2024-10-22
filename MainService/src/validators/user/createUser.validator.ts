import Joi from "joi";
import CreateUserDto from "../../dtos/userDtos/createUser.dto";


const passwordPattern = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*\\d)(?=.*[@$!%*?&])[A-Za-z\\d@$!%*?&]{8,}$");

const createUser = Joi.object<CreateUserDto>({
    email: Joi.string().email().max(255).required(),
    userName: Joi.string().alphanum().min(3).max(30).required(),
    password: Joi.string().min(6).max(30).required()
        .pattern(passwordPattern),

    confirmPassword: Joi.string().equal(Joi.ref('password')).required()
});


export default createUser;