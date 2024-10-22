"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const BaseResponse_dto_1 = __importDefault(require("./BaseResponse.dto"));
/**
 * Represents a paginated response DTO (Data Transfer Object) that extends the base response DTO.
 *
 * @extends BaseResponseDto
 */
class PaginatedResponseDto extends BaseResponse_dto_1.default {
    /**
     * Creates a new instance of the PaginatedResponseDto class.
     *
     * @param {Boolean} success - Indicates if the request was successful.
     * @param {String} message - The response message.
     * @param {Object} data - The data to be returned.
     * @param {Number} totalRecords - The total number of records.
     * @param {Number} page - The current page.
     * @param {Number} limit - The number of records per page.
     */
    constructor(success, message, data, totalRecords, page, limit) {
        super(success, message, data);
        this.success = success;
        this.message = message;
        this.data = data;
        this.totalRecords = totalRecords;
        this.page = page;
        this.limit = limit;
        this.totalRecords = totalRecords;
        this.page = page;
        this.limit = limit;
    }
}
exports.default = PaginatedResponseDto;
//# sourceMappingURL=PaginatedResponse.dto.js.map