"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class UserAlreadyExistsError extends Error {
    constructor(message) {
        super(message);
        this.name = "UserAlreadyExistsError";
    }
}
exports.default = UserAlreadyExistsError;
//# sourceMappingURL=UserAlreadyExists.error.js.map