"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
class BaseResponseDto {
    /**
     *
     * @param {Boolean} success if the request was successful
     * @param {String} message message to be sent to the user
     * @param {Object} data data to be sent to the user
     */
    constructor(success, message, data) {
        this.success = success;
        this.message = message;
        this.data = data;
    }
}
exports.default = BaseResponseDto;
;
//# sourceMappingURL=BaseResponse.dto.js.map