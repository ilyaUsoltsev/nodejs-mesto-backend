import { ErrorWithStatusCode } from '../types';

class NotFoundError extends Error implements ErrorWithStatusCode {
  statusCode: number;

  constructor(message: string) {
    super(message);
    this.statusCode = 404;
  }
}

export default NotFoundError;
