"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProblemDto {
    constructor(problem) {
        this.id = problem.id;
        this.title = problem.title;
        this.description = problem.description;
        this.difficulty = problem.difficulty;
        this.createdAt = problem.createdAt;
        this.updatedAt = problem.updatedAt;
        this.functionName = problem.functionName;
        this.parametersNames = problem.parametersNames;
    }
}
exports.default = ProblemDto;
//# sourceMappingURL=problem.dto.js.map