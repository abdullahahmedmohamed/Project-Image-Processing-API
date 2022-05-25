import { ValidationError } from 'joi';

type ApiErrorCode = 404 | 400 | 500;

export default class ApplicationError extends Error {
  constructor(public code: ApiErrorCode, public messages: Array<string>) {
    super(messages.join());
  }

  static badRequest(messages: Array<string>) {
    return new ApplicationError(400, messages);
  }

  static badRequestJoi(err: ValidationError) {
    return new ApplicationError(
      400,
      err.details.map((e) => e.message)
    );
  }
}
