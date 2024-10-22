"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class CreateTestCaseDto {
    /**
     *
     */
    constructor(testCase) {
        this.input = testCase.input;
        this.output = testCase.output;
        this.problemId = testCase.problemId;
        this.timeInMS = testCase.timeInMS;
        this.memoryInMB = testCase;
    }
}
exports.default = CreateTestCaseDto;
//# sourceMappingURL=createTestCase.dto.js.map