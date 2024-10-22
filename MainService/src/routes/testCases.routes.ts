import { Router } from "express";
import TestCaseController from "../controllers/testCases.controller";
const testCaseController = new TestCaseController();
import validator from "../middlewares/validator";

const router = Router();

router.get("/", testCaseController.getAll.bind(testCaseController));
router.post("/", validator("createTestCase"), testCaseController.create.bind(testCaseController));

router.get("/:id", testCaseController.getById.bind(testCaseController));
router.patch("/:id", validator("updateTestCase"), testCaseController.update.bind(testCaseController));
router.delete("/:id", testCaseController.delete.bind(testCaseController));


export default router;