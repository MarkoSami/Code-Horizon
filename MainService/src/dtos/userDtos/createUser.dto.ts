export default class CreateUserDto {
    constructor(public email: string, public password: string, public userName: string, public confirmPassword: string) {
    }

}