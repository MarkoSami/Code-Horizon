export default class BaseResponseDto {
  /**
   *
   * @param {Boolean} success if the request was successful
   * @param {String} message message to be sent to the user
   * @param {Object} data data to be sent to the user
   */
  constructor(public success: Boolean, public message: String, public data: Object | null) { }

};
