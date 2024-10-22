export default class UserLoginReponseDto {
    constructor(public email: string,
        public userName: string,
        public refreshToken: string,
        public accessToken: string) { }

}