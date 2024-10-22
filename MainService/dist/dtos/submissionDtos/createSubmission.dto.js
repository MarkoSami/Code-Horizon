"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class SubmissionDto {
    constructor(submissionData) {
        this.problemId = submissionData.problemId;
        this.userId = submissionData.userId;
        this.code = submissionData.code;
        this.language = submissionData.language;
    }
}
exports.default = SubmissionDto;
//# sourceMappingURL=createSubmission.dto.js.map