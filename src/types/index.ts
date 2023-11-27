import { Request } from 'express';

export interface SessionRequest extends Request {
  user?: { _id: string };
}

export interface ErrorWithStatusCode extends Error {
  statusCode?: number;
}
