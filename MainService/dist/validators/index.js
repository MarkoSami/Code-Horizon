"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.updateSubmission = exports.createSubmission = exports.updateTestCase = exports.createTestCase = exports.uuid = exports.queryString = exports.updateProblem = exports.createProblem = exports.userLogin = exports.createUser = void 0;
const createUser_validator_1 = __importDefault(require("./user/createUser.validator"));
exports.createUser = createUser_validator_1.default;
const userLogin_validator_1 = __importDefault(require("./user/userLogin.validator"));
exports.userLogin = userLogin_validator_1.default;
const createProblem_validator_1 = __importDefault(require("./problem/createProblem.validator"));
exports.createProblem = createProblem_validator_1.default;
const updateProblem_validator_1 = __importDefault(require("./problem/updateProblem.validator"));
exports.updateProblem = updateProblem_validator_1.default;
const queryString_validator_1 = __importDefault(require("./queryString.validator"));
exports.queryString = queryString_validator_1.default;
const uuid_validator_1 = __importDefault(require("./uuid.validator"));
exports.uuid = uuid_validator_1.default;
const createTestCase_validator_1 = __importDefault(require("./testCase/createTestCase.validator"));
exports.createTestCase = createTestCase_validator_1.default;
const updateTestCase_validator_1 = __importDefault(require("./testCase/updateTestCase.validator"));
exports.updateTestCase = updateTestCase_validator_1.default;
const createtestCase_validator_1 = __importDefault(require("./submission/createtestCase.validator"));
exports.createSubmission = createtestCase_validator_1.default;
const updateSubmission_validator_1 = __importDefault(require("./submission/updateSubmission.validator"));
exports.updateSubmission = updateSubmission_validator_1.default;
//# sourceMappingURL=index.js.map