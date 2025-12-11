import { CustomError } from "./custom-error";
import { ZodError } from "zod/v4";

export class RequestValidationError extends CustomError {
  statusCode = 400;

  constructor(public error: ZodError) {
    super("Invalid request parameters");
    Object.setPrototypeOf(this, RequestValidationError.prototype);
  }

  serializeError() {
    return this.error.issues.map((issue) => ({
      message: issue.message,
      field: issue.path.join("."),
    }));
  }
}
