"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class ProblemWithSameTitleExists extends Error {
    constructor(message) {
        super(message);
        this.name = "ProblemWithSameTitleAlreadyExists";
    }
}
exports.default = ProblemWithSameTitleExists;
//# sourceMappingURL=ProblemWithSameTitleExists.js.map