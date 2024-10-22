"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class TestCase {
    constructor(testCase) {
        this.id = testCase.id;
        this.input = testCase.input;
        this.output = testCase.output;
        this.timeInMS = testCase.timeInMS;
        this.memoryInMB = testCase.memoryInMB;
        this.problemId = testCase.problemId;
    }
}
exports.default = TestCase;
//# sourceMappingURL=testCase.dto.js.map