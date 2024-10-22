import { Router } from "express";
import SubmissionsController from "../controllers/submissions.controller";
import validator from "../middlewares/validator";
import passport from "passport";
const submissionsController = new SubmissionsController();


const router = Router();

router.post("/", passport.authenticate("jwt", { session: false }), validator("createSubmission"), submissionsController.create.bind(submissionsController));
router.get("/", validator("queryString"), submissionsController.getAll.bind(submissionsController));

router.get("/:id", submissionsController.getById.bind(submissionsController));
router.delete("/:id", submissionsController.delete.bind(submissionsController));
router.patch("/:id", validator("updateSubmission"), submissionsController.update.bind(submissionsController));




export default router;