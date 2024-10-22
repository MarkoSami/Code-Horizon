import AuthController from "../controllers/auth.controller";
import { Router } from "express";
import UserService from "../services/user.service";
import validator from "../middlewares/validator";

const router = Router();
const authController = new AuthController(new UserService());

router.post("/login", validator("userLogin"), authController.login.bind(authController));
router.post("/register", validator("createUser"), authController.register.bind(authController));



export default router;