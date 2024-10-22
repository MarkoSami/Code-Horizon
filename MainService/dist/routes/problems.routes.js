"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const router = (0, express_1.Router)();
const problems_controller_1 = __importDefault(require("../controllers/problems.controller"));
const problemsController = new problems_controller_1.default();
const validator_1 = __importDefault(require("../middlewares/validator"));
router.get("/", problemsController.getAll.bind(problemsController));
router.post("/", (0, validator_1.default)("createProblem"), problemsController.create.bind(problemsController));
router.get("/:id", problemsController.getById.bind(problemsController));
router.patch("/:id", (0, validator_1.default)("updateProblem"), problemsController.update.bind(problemsController));
router.delete("/:id", problemsController.delete.bind(problemsController));
router.get("/:id/test-cases", problemsController.getTestCasesByProblemId.bind(problemsController));
exports.default = router;
//# sourceMappingURL=problems.routes.js.map