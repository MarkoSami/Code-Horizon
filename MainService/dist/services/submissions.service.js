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
const AssosiatedProblemNotFound_1 = __importDefault(require("../errors/AssosiatedProblemNotFound"));
const AssociatedUserNotFound_1 = __importDefault(require("../errors/AssociatedUserNotFound"));
const MessageProducer_1 = __importDefault(require("../RabbitMQ/MessageProducer"));
const MessageNotPublishedToQueue_1 = __importDefault(require("../errors/MessageNotPublishedToQueue"));
class SubmissionsService {
    create(submissionDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const associatedProblem = yield prismaClient_1.default.problem.findFirst({
                where: {
                    id: submissionDto.problemId
                }
            });
            if (!associatedProblem) {
                throw new AssosiatedProblemNotFound_1.default();
            }
            const associatedUser = yield prismaClient_1.default.user.findFirst({
                where: {
                    id: submissionDto.userId
                }
            });
            if (!associatedUser) {
                throw new AssociatedUserNotFound_1.default();
            }
            const createdSubmission = yield prismaClient_1.default.submission.create({
                data: submissionDto
            });
            if (!createdSubmission) {
                return null;
            }
            // add submission to submission squeue
            yield MessageProducer_1.default.createChannel();
            const message = JSON.stringify({
                submissionId: createdSubmission.id,
                code: createdSubmission.code,
                language: createdSubmission.language,
                problemId: createdSubmission.problemId,
            });
            const published = yield MessageProducer_1.default.publishMessage("submission", message);
            if (!published) {
                throw new MessageNotPublishedToQueue_1.default();
            }
            return createdSubmission;
        });
    }
    getAll(opts) {
        return __awaiter(this, void 0, void 0, function* () {
            const _a = opts.query, { title } = _a, otherFilters = __rest(_a, ["title"]);
            const [submissions, count] = yield prismaClient_1.default.$transaction([
                prismaClient_1.default.submission.findMany({
                    where: Object.assign({}, otherFilters),
                    skip: (opts.page - 1) * opts.limit,
                    take: opts.limit,
                    orderBy: opts.sortBy ? { [opts.sortBy]: opts.order } : {}
                }),
                prismaClient_1.default.submission.count({
                    where: opts.query
                })
            ]);
            return {
                data: submissions,
                count
            };
        });
    }
    getById(id) {
        return __awaiter(this, void 0, void 0, function* () {
            const submission = yield prismaClient_1.default.submission.findFirst({
                where: {
                    id
                }
            });
            return submission;
        });
    }
    delete(id) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const deletedSubmission = yield prismaClient_1.default.submission.delete({
                    where: {
                        id
                    }
                });
                return deletedSubmission;
            }
            catch (error) {
                if (error instanceof client_1.Prisma.PrismaClientKnownRequestError) {
                    // Handle the record not found error (P2025)
                    if (error.code === 'P2025') {
                        return null;
                    }
                }
                throw error; // Rethrow the error if it's not handled
            }
        });
    }
    update(id, submissionDto) {
        return __awaiter(this, void 0, void 0, function* () {
            const updatedSubmission = yield prismaClient_1.default.submission.update({
                where: {
                    id
                },
                data: submissionDto
            });
            return updatedSubmission;
        });
    }
}
exports.default = SubmissionsService;
//# sourceMappingURL=submissions.service.js.map