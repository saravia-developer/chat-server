import { HttpCode, statusResponse } from "./http-status-codes.js";

const RESPONSE_STATUS = {
  POST: {
    httpCode: HttpCode.CREATED,
    message: statusResponse.CREATED,
  },
  GET: {
    httpCode: HttpCode.OK,
    message: statusResponse.OK,
  },
  PUT: {
    httpCode: HttpCode.OK,
    message: statusResponse.OK,
  },
  DELETE: {
    httpCode: HttpCode.OK,
    message: statusResponse.OK,
  },
  PATCH: {
    httpCode: HttpCode.OK,
    message: statusResponse.OK,
  },
};

export class AppResponse {
  data;
  success;
  kindMessage;
  httpCode;

  constructor(method, data) {
    const { httpCode, message } = RESPONSE_STATUS[method];
    this.success = data?.success ?? true;
    this.kindMessage = data?.kindMessage ?? "";
    this.data = data?.data;
    this.httpCode = httpCode;
  }
}