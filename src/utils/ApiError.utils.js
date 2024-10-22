class ApiError extends Error {
  constructor(statusCode , message = "something went wrong", error, stack) {
    super(message);
    console.log(statusCode );
    this.statusCode  = statusCode ;
    this.data = null;
    this.message = message;
    this.succes = false;
    this.error = error;
    if (stack) {
      this.stack = stack;
    } else {
      Error.captureStackTrace(this, this.constructor);
    }
  }
}

export { ApiError };
