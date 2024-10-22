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
const problems_service_1 = __importDefault(require("../services/problems.service"));
const problem_dto_1 = __importDefault(require("../dtos/problemDtos/problem.dto"));
const BaseResponse_dto_1 = __importDefault(require("../dtos/BaseResponse.dto"));
const ProblemWithSameTitleExists_1 = __importDefault(require("../errors/ProblemWithSameTitleExists"));
const PaginatedResponse_dto_1 = __importDefault(require("../dtos/PaginatedResponse.dto"));
const testCase_service_1 = __importDefault(require("../services/testCase.service"));
const testCase_dto_1 = __importDefault(require("../dtos/testCaseDtos/testCase.dto"));
class ProblemsController {
    constructor() {
        this.problemsService = new problems_service_1.default();
        this.testCaseService = new testCase_service_1.default();
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            // do caching here
            const problemsData = yield this.problemsService.getAll(res.locals.options);
            const mappedProblems = problemsData.data.map(problem => new problem_dto_1.default(problem));
            res.status(200).json(new PaginatedResponse_dto_1.default(true, 'Problems fetched successfully', mappedProblems, problemsData.count, res.locals.options.page, res.locals.options.limit));
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const problem = yield this.problemsService.create(req.body);
                const mappedProblem = new problem_dto_1.default(problem);
                res.status(201).json(new BaseResponse_dto_1.default(true, 'Problem created successfully', mappedProblem));
            }
            catch (error) {
                if (error instanceof ProblemWithSameTitleExists_1.default) {
                    return res.status(400).json(new BaseResponse_dto_1.default(false, error.message, null));
                }
                next(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const problem = yield this.problemsService.getById(req.params.id);
            if (!problem) {
                res.status(404).json(new BaseResponse_dto_1.default(false, 'Problem not found', null));
                return;
            }
            const mappedProblem = new problem_dto_1.default(problem);
            res.status(200).json(new BaseResponse_dto_1.default(true, 'Problem fetched successfully', mappedProblem));
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const problem = yield this.problemsService.update(req.params.id, req.body);
                if (!problem) {
                    return res.status(404).json(new BaseResponse_dto_1.default(false, 'Problem not found', null));
                }
                const mappedProblem = new problem_dto_1.default(problem);
                res.status(200).json(new BaseResponse_dto_1.default(true, 'Problem updated successfully', mappedProblem));
            }
            catch (error) {
                if (error instanceof ProblemWithSameTitleExists_1.default) {
                    res.status(400).json(new BaseResponse_dto_1.default(false, error.message, null));
                }
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            const deletedProblem = yield this.problemsService.delete(req.params.id);
            if (!deletedProblem) {
                return res.status(404).json(new BaseResponse_dto_1.default(false, 'Problem not found', null));
            }
            res.status(200).json(new BaseResponse_dto_1.default(true, 'Problem deleted successfully', null));
        });
    }
    getTestCasesByProblemId(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const probelmTestCases = yield this.testCaseService.getAll({
                    limit: 100, page: 1, query: { problemId: req.params.id }
                });
                return res.status(200).json(new PaginatedResponse_dto_1.default(true, 'Test cases fetched successfully', probelmTestCases.data.map(testCase => new testCase_dto_1.default(testCase)), probelmTestCases.count, 1, 100));
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = ProblemsController;
//# sourceMappingURL=problems.controller.js.map