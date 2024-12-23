export class AppError extends Error {
  name;
  httpCode;
  isOperational;

  constructor(
    name,
    httpCode,
    description,
    isOperational = true
  ) {
    super(description);
    Object.setPrototypeOf(this, new.target.prototype);

    this.name = name;
    this.httpCode = httpCode;
    this.isOperational = isOperational;

    Error.captureStackTrace(this, AppError);
  }
}
