import { Router } from "express";
const router = Router();
import ProblemsController from "../controllers/problems.controller"
const problemsController = new ProblemsController();
import validator from "../middlewares/validator";


router.get("/", problemsController.getAll.bind(problemsController));
router.post("/", validator("createProblem"), problemsController.create.bind(problemsController));

router.get("/:id", problemsController.getById.bind(problemsController));
router.patch("/:id", validator("updateProblem"), problemsController.update.bind(problemsController));
router.delete("/:id", problemsController.delete.bind(problemsController));


router.get("/:id/test-cases", problemsController.getTestCasesByProblemId.bind(problemsController));


export default router;


