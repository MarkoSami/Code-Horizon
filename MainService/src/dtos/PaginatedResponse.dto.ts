import BaseResponseDto from "./BaseResponse.dto";


/**
 * Represents a paginated response DTO (Data Transfer Object) that extends the base response DTO.
 * 
 * @extends BaseResponseDto
 */
export default class PaginatedResponseDto extends BaseResponseDto {

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
    constructor(public success: Boolean,
        public message: String,
        public data: Object | null,
        public totalRecords: number,
        public page: number,
        public limit: number) {
        super(success, message, data);
        this.totalRecords = totalRecords;
        this.page = page;
        this.limit = limit;
    }
}