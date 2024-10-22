"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const passport_1 = __importDefault(require("passport"));
const BaseResponse_dto_1 = __importDefault(require("../dtos/BaseResponse.dto"));
const utils_1 = require("../lib/utils");
const userLoginReponse_dto_1 = __importDefault(require("../dtos/userDtos/userLoginReponse.dto"));
const UserAlreadyExists_error_1 = __importDefault(require("../errors/UserAlreadyExists.error"));
class AuthController {
    /**
     *
     */
    constructor(userService) {
        this.userService = userService;
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
    login(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            passport_1.default.authenticate('local', (err, user, info) => __awaiter(this, void 0, void 0, function* () {
                if (err) {
                    return next(err);
                }
                if (!user) {
                    return res.status(401).json(new BaseResponse_dto_1.default(false, info.message, null));
                }
                const accessToken = yield (0, utils_1.issueJwtToken)(user, "1h");
                const refreshToken = yield (0, utils_1.issueJwtToken)(user, "7d");
                const userData = new userLoginReponse_dto_1.default(user.email, user.userName, refreshToken, accessToken);
                const response = new BaseResponse_dto_1.default(true, "Login successful", userData);
                res.status(200).json(response);
            }))(req, res, next);
        });
    }
    register(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                console.log("Register");
                const newUSer = yield this.userService.createUser(req.body);
                if (!newUSer) {
                    return res.status(400).json(new BaseResponse_dto_1.default(false, "User registration failed", null));
                }
                return res.status(201).json(new BaseResponse_dto_1.default(true, "User registration successful", null));
            }
            catch (error) {
                // if user already exists error is thrown, return a 400 response
                if (error instanceof UserAlreadyExists_error_1.default) {
                    return res.status(400).json(new BaseResponse_dto_1.default(false, error.message, null));
                }
            }
        });
    }
}
exports.default = AuthController;
//# sourceMappingURL=auth.controller.js.map