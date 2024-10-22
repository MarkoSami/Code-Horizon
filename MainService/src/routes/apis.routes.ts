import { Router } from "express";
import authRoute from "./auth.routes";
import problemsRoute from "./problems.routes";
import testCasesRoute from "./testCases.routes";
import validator from "../middlewares/validator";
import submissionsRoute from "./submissions.routes";

const router = Router()



router.use("/auth", authRoute);
router.use("/problems", validator("queryString"), problemsRoute);
router.use("/testcases", validator("queryString"), testCasesRoute);
router.use("/submissions", validator("queryString"), submissionsRoute);


export default router;
