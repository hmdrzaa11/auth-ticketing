import { CustomError } from "./custom-error";

export class BadRequestError extends CustomError {
  statusCode = 400;
  constructor(msg: string) {
    super(msg);
    Object.setPrototypeOf(this, BadRequestError.prototype);
  }
  serializeErrors(): { message: string; field?: string | undefined }[] {
    return [{ message: this.message }];
  }
}
