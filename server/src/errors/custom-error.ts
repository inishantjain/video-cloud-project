const StatusCodes = {
  UNAUTHORIZED: 401,
  NOTFOUND: 404,
  BAD_REQUEST: 400,
};

export class CustomError extends Error {
  statusCode: number = 500;
  constructor(message: string) {
    super(message);
  }
}

export class BadRequestError extends CustomError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.BAD_REQUEST;
  }
}

export class NotFoundError extends CustomError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.NOTFOUND;
  }
}

export class UnAuthenticatedError extends CustomError {
  constructor(message: string) {
    super(message);
    this.statusCode = StatusCodes.UNAUTHORIZED;
  }
}
