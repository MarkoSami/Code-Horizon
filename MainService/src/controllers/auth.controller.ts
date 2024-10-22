import { NextFunction, Request, Response } from "express";
import passport from "passport";
import BaseResponseDto from "../dtos/BaseResponse.dto";
import { issueJwtToken } from "../lib/utils";
import { User } from "@prisma/client";
import UserLoginReponseDto from "../dtos/userDtos/userLoginReponse.dto";
import UserService from "../services/user.service";
import UserAlreadyExistsError from "../errors/UserAlreadyExists.error";



export default class AuthController {


    /**
     *
     */
    constructor(private userService: UserService) {


    }

    /**
    * Handles user login using passport local strategy.
    * 
    * @param req - The request object.
    * @param res - The response object.
    * @param next - The next middleware function.
    * 
    * @returns A JSON response with the login status, message, and user data if successful.
    * 
    * @remarks
    * This method uses passport's `authenticate` function to verify the user credentials.
    * If authentication is successful, it issues an access token and a refresh token for the user.
    * The response contains a `BaseResponseDto` object with the login status, message, and user data.
    * 
    * @throws Will pass any authentication errors to the next middleware.
    */
    public async login(req: Request, res: Response, next: NextFunction) {
        passport.authenticate('local', async (err: any, user: User, info: any) => {
            if (err) {
                return next(err);
            }
            if (!user) {
                return res.status(401).json(new BaseResponseDto(false, info.message, null));
            }
            const accessToken = await issueJwtToken(user, "1h");
            const refreshToken = await issueJwtToken(user, "7d");
            const userData = new UserLoginReponseDto(user.email, user.userName, refreshToken, accessToken);
            const response = new BaseResponseDto(true, "Login successful", userData);

            res.status(200).json(response);
        })(req, res, next);
    }

    public async register(req: Request, res: Response, next: NextFunction) {

        try {
            console.log("Register");
            const newUSer = await this.userService.createUser(req.body);
            if (!newUSer) {
                return res.status(400).json(new BaseResponseDto(false, "User registration failed", null));
            }
            return res.status(201).json(new BaseResponseDto(true, "User registration successful", null));

        } catch (error) {
            // if user already exists error is thrown, return a 400 response
            if (error instanceof UserAlreadyExistsError) {
                return res.status(400).json(new BaseResponseDto(false, error.message, null));
            }
        }

    }

}