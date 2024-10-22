import { User } from "@prisma/client";

export default class UserDto {
    private email: string;
    private password: string;
    private userName: string;

    constructor(userData: User) {
        this.email = userData.email;
        this.password = userData.password;
        this.userName = userData.password;
    }

}
