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
const submissions_service_1 = __importDefault(require("../services/submissions.service"));
const BaseResponse_dto_1 = __importDefault(require("../dtos/BaseResponse.dto"));
const MessageNotPublishedToQueue_1 = __importDefault(require("../errors/MessageNotPublishedToQueue"));
const PaginatedResponse_dto_1 = __importDefault(require("../dtos/PaginatedResponse.dto"));
class SubmissionsController {
    constructor() {
        this.submissionsService = new submissions_service_1.default();
    }
    create(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const user = req.user;
                const submissionData = Object.assign(Object.assign({}, req.body), { code: req.body.code, userId: user.sub });
                const submission = yield this.submissionsService.create(submissionData);
                res.json(new BaseResponse_dto_1.default(true, "Submission created successfully", submission));
            }
            catch (error) {
                if (error instanceof MessageNotPublishedToQueue_1.default) {
                    res.status(500).json(new BaseResponse_dto_1.default(false, "Submission created successfully but not published to queue", null));
                }
                next(error);
            }
        });
    }
    getAll(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const submissions = yield this.submissionsService.getAll(res.locals.options);
                res.json(new PaginatedResponse_dto_1.default(true, "Submissions fetched successfully", submissions.data, submissions.count, res.locals.options.page, res.locals.options.limit));
            }
            catch (error) {
                next(error);
            }
        });
    }
    getById(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const submission = yield this.submissionsService.getById(req.params.id);
                if (!submission) {
                    return res.status(404).json(new BaseResponse_dto_1.default(false, "Submission not found", null));
                }
                res.json(new BaseResponse_dto_1.default(true, "Submission fetched successfully", submission));
            }
            catch (error) {
                next(error);
            }
        });
    }
    delete(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const submission = yield this.submissionsService.delete(req.params.id);
                if (!submission) {
                    return res.status(404).json(new BaseResponse_dto_1.default(false, "Submission not found", null));
                }
                res.json(new BaseResponse_dto_1.default(true, "Submission deleted successfully", submission));
            }
            catch (error) {
                next(error);
            }
        });
    }
    update(req, res, next) {
        return __awaiter(this, void 0, void 0, function* () {
            try {
                const submission = yield this.submissionsService.update(req.params.id, req.body);
                res.json(new BaseResponse_dto_1.default(true, "Submission updated successfully", submission));
            }
            catch (error) {
                next(error);
            }
        });
    }
}
exports.default = SubmissionsController;
//# sourceMappingURL=submissions.controller.js.map