"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SubmissionDto {
    constructor(submissionData) {
        this.id = submissionData.id;
        this.problemId = submissionData.problemId;
        this.userId = submissionData.userId;
        this.code = submissionData.code;
        this.language = submissionData.language;
        this.verdict = submissionData.verdict;
        this.createdAt = submissionData.createdAt;
        this.updatedAt = submissionData.updatedAt;
    }
}
exports.default = SubmissionDto;
//# sourceMappingURL=submission.dto.js.map