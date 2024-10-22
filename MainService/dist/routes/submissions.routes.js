"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const submissions_controller_1 = __importDefault(require("../controllers/submissions.controller"));
const validator_1 = __importDefault(require("../middlewares/validator"));
const passport_1 = __importDefault(require("passport"));
const submissionsController = new submissions_controller_1.default();
const router = (0, express_1.Router)();
router.post("/", passport_1.default.authenticate("jwt", { session: false }), (0, validator_1.default)("createSubmission"), submissionsController.create.bind(submissionsController));
router.get("/", (0, validator_1.default)("queryString"), submissionsController.getAll.bind(submissionsController));
router.get("/:id", submissionsController.getById.bind(submissionsController));
router.delete("/:id", submissionsController.delete.bind(submissionsController));
router.patch("/:id", (0, validator_1.default)("updateSubmission"), submissionsController.update.bind(submissionsController));
exports.default = router;
//# sourceMappingURL=submissions.routes.js.map