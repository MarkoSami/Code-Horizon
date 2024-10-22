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
const testCase_service_1 = __importDefault(require("../services/testCase.service"));
const testCase_dto_1 = __importDefault(require("..//dtos/testCaseDtos/testCase.dto"));
const PaginatedResponse_dto_1 = __importDefault(require("../dtos/PaginatedResponse.dto"));
const BaseResponse_dto_1 = __importDefault(require("../dtos/BaseResponse.dto"));
const AssosiatedProblemNotFound_1 = __importDefault(require("../errors/AssosiatedProblemNotFound"));
const client_1 = require("@prisma/client");
class TestCaseController {
    constructor() {
        this.testCaseService = new testCase_service_1.default();
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const testCasesData = yield this.testCaseService.getAll(res.locals.options);
                const mappedTestCases = testCasesData.data.map(testCase => new testCase_dto_1.default(testCase));
                res.status(200).json(new PaginatedResponse_dto_1.default(true, 'Test cases fetched successfully', mappedTestCases, testCasesData.count, res.locals.options.page, res.locals.options.limit));
            }
            catch (error) {
                next(error);
            }
        });
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const testCase = yield this.testCaseService.create(req.body);
                const mappedTestCase = new testCase_dto_1.default(testCase);
                res.status(201).json(new BaseResponse_dto_1.default(true, 'Test case created successfully', mappedTestCase));
            }
            catch (error) {
                if (error instanceof AssosiatedProblemNotFound_1.default) {
                    return res.status(400).json(new BaseResponse_dto_1.default(false, error.message, null));
                }
                next(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const testCase = yield this.testCaseService.getById(req.params.id);
                if (!testCase) {
                    return res.status(404).json(new BaseResponse_dto_1.default(false, 'Test case not found', null));
                }
                return res.status(200).json(new BaseResponse_dto_1.default(true, 'Test case fetched successfully', new testCase_dto_1.default(testCase)));
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const testCase = yield this.testCaseService.update(req.params.id, req.body);
                if (!testCase) {
                    return res.status(404).json(new BaseResponse_dto_1.default(false, 'Test case not found', null));
                }
                return res.status(200).json(new BaseResponse_dto_1.default(true, 'Test case updated successfully', new testCase_dto_1.default(testCase)));
            }
            catch (error) {
                if (error instanceof AssosiatedProblemNotFound_1.default) {
                    return res.status(400).json(new BaseResponse_dto_1.default(false, error.message, null));
                }
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    // Handle the record not found error (P2025)
                    if (error.code === 'P2025') {
                        return res.status(404).json(new BaseResponse_dto_1.default(false, 'Test case not found', null));
                    }
                }
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const testCase = yield this.testCaseService.delete(req.params.id);
                if (!testCase) {
                    return res.status(404).json(new BaseResponse_dto_1.default(false, 'Test case not found', null));
                }
                return res.status(200).json(new BaseResponse_dto_1.default(true, 'Test case deleted successfully', null));
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = TestCaseController;
//# sourceMappingURL=testCases.controller.js.map