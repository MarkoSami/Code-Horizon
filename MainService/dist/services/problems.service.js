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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const prismaClient_1 = __importDefault(require("../../prisma/prismaClient"));
const ProblemWithSameTitleExists_1 = __importDefault(require("../errors/ProblemWithSameTitleExists"));
const validators_1 = require("../validators");
const testCase_service_1 = __importDefault(require("./testCase.service"));
class ProblemsService {
    constructor() {
        this.testCaseService = new testCase_service_1.default();
    }
    getAll(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = opts.query, { title } = _a, otherFilters = __rest(_a, ["title"]);
            const [problems, count] = yield prismaClient_1.default.$transaction([
                prismaClient_1.default.problem.findMany({
                    where: Object.assign(Object.assign({}, otherFilters), { title: {
                            contains: title,
                            mode: 'insensitive'
                        } }),
                    skip: (opts.page - 1) * opts.limit,
                    take: opts.limit,
                    orderBy: opts.sortBy ? { [opts.sortBy]: opts.order } : {}
                }),
                prismaClient_1.default.problem.count({
                    where: opts.query
                })
            ]);
            return {
                data: problems,
                count
            };
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const problem = yield prismaClient_1.default.problem.findFirst({
                where: {
                    id
                }
            });
            return problem;
        });
    }
    create(problemData) {
        return __awaiter(this, void 0, void 0, function* () {
            const problemWithSameTitle = yield this.getByTitle(problemData.title);
            if (problemWithSameTitle) {
                throw new ProblemWithSameTitleExists_1.default("Problem with the same Title already exists");
            }
            const createdProblem = yield prismaClient_1.default.problem.create({
                data: problemData
            });
            return createdProblem;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedPeoblem = yield prismaClient_1.default.problem.delete({
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
            // Try to find out why it happens and how to fix it
            // It is important to validate the id before querying the database to avoid database being stuck
            const { error } = validators_1.uuid.validate(id);
            if (error) {
                return null;
            }
            try {
                if (updatesDto.title) {
                    const problemWithSameTitle = yield this.getByTitle(updatesDto.title);
                    if (problemWithSameTitle && problemWithSameTitle.id !== id) {
                        throw new ProblemWithSameTitleExists_1.default("Problem with the same Title already exists");
                    }
                }
                console.log(id);
                const updatedProblem = yield prismaClient_1.default.problem.update({
                    where: {
                        id
                    },
                    data: updatesDto
                });
                return updatedProblem;
            }
            catch (error) {
                throw error;
            }
        });
    }
    getByTitle(title) {
        return __awaiter(this, void 0, void 0, function* () {
            const problem = yield prismaClient_1.default.problem.findFirst({
                where: {
                    title
                }
            });
            return problem;
        });
    }
    getTestCases(problemId) {
        return __awaiter(this, void 0, void 0, function* () {
            const testCases = yield this.testCaseService.getAll({ query: { problemId }, limit: 100, page: 1 });
            return testCases;
        });
    }
}
exports.default = ProblemsService;
//# sourceMappingURL=problems.service.js.map