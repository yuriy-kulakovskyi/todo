export class AppError extends Error {
  constructor(
    public readonly statusCode: number = 500,
    public readonly detail: string,
    public readonly error?: string,
  ) {
    super();
    Error.captureStackTrace(this, this.constructor)
  }
}