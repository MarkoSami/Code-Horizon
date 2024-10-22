
// @ts-ignore
import prisma from "../../prisma/prismaClient";
import CreateUserDto from "../dtos/userDtos/createUser.dto";
import { User } from "@prisma/client";
import UserAlreadyExistsError from "../errors/UserAlreadyExists.error";
import { hash, genSalt } from "bcrypt";

export default class UserService {


  async findUserByEmailOrUsername(credential: string): Promise<User | null> {

    const user = prisma.user.findFirst({
      where: {
        OR: [{ email: credential }, { userName: credential }],
      },
    });
    return user;
  }

  async createUser(userData: CreateUserDto): Promise<User | null> {
    const existingUser = await prisma.user.findFirst({
      where: {
        OR: [{ email: userData.email }, { userName: userData.userName }],
      },
    });

    // checking if user exists with the same email or the same username
    if (existingUser) {
      let message = "";

      const userExistsWithSameEmail = existingUser.email == userData.email;
      const userExistsWithSameUserName =
        existingUser.userName == userData.userName;

      if (userExistsWithSameEmail) {
        message = "User with this email already exists";
      } else if (userExistsWithSameUserName) {
        message = "User with this userName already exists";
      }

      throw new UserAlreadyExistsError(message);
    }

    // hashing user password before saving it to the database
    userData.password = await this.hashPassword(userData.password);
    const { confirmPassword, ...user } = userData;

    // creating new user
    const newUser: User = await prisma.user.create({ data: user });
    return newUser;

  }


  /**
   * Hashes a plain text password using bcrypt.
   *
   * @param password - The plain text password to be hashed.
   * @returns A promise that resolves to the hashed password.
   */
  async hashPassword(password: string): Promise<string> {
    if (!password) {
      throw new Error("Password is required");
    }
    const salt = await genSalt(10);
    const hashedPassword = await hash(password, salt);
    return hashedPassword;
  }

  // end of UserService class
};
