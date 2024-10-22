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
const client_1 = require("@prisma/client");
const prismaClient_1 = __importDefault(require("../../prisma/prismaClient"));
const AssosiatedProblemNotFound_1 = __importDefault(require("../errors/AssosiatedProblemNotFound"));
const validators_1 = require("../validators");
class TestCaseService {
    getAll(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            console.log(opts.query);
            const [testCases, count] = yield prismaClient_1.default.$transaction([
                prismaClient_1.default.testCase.findMany({
                    where: opts.query,
                    // skip: (opts.page - 1) * opts.limit,
                    take: 200,
                    orderBy: opts.sortBy ? { [opts.sortBy]: opts.order } : {}
                }),
                prismaClient_1.default.testCase.count({
                    where: opts.query
                })
            ]);
            return {
                data: testCases,
                count
            };
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const testCase = yield prismaClient_1.default.testCase.findFirst({
                where: {
                    id
                }
            });
            return testCase;
        });
    }
    create(testCaseData) {
        return __awaiter(this, void 0, void 0, function* () {
            const assosiatedProblem = yield prismaClient_1.default.problem.findFirst({
                where: {
                    id: testCaseData.problemId
                }
            });
            if (!assosiatedProblem) {
                throw new AssosiatedProblemNotFound_1.default();
            }
            const createdTestCase = yield prismaClient_1.default.testCase.create({
                data: testCaseData
            });
            return createdTestCase;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedPeoblem = yield prismaClient_1.default.testCase.delete({
                    where: {
                        id
                    }
                });
                return deletedPeoblem;
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    // Handle the record not found error (P2025)
                    if (error.code === 'P2025') {
                        return null;
                    }
                }
            }
        });
    }
    update(id, updatesDto) {
        return __awaiter(this, void 0, void 0, function* () {
            // It is important to validate the id before querying the database to avoid database being stuck
            const { error } = validators_1.uuid.validate(id);
            if (updatesDto.problemId) {
                const assosiatedProblem = yield prismaClient_1.default.problem.findFirst({
                    where: {
                        id: updatesDto.problemId
                    }
                });
                if (!assosiatedProblem) {
                    throw new AssosiatedProblemNotFound_1.default();
                }
            }
            if (error) {
                return null;
            }
            try {
                const updatedTestCase = yield prismaClient_1.default.testCase.update({
                    where: {
                        id
                    },
                    data: updatesDto
                });
                return updatedTestCase;
            }
            catch (error) {
                throw error;
            }
        });
    }
}
exports.default = TestCaseService;
//# sourceMappingURL=testCase.service.js.map