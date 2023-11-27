import express, { NextFunction, Response } from 'express';
import { errors } from 'celebrate';
import mongoose from 'mongoose';
import usersRouter from './routes/users';
import cardsRouter from './routes/cards';
import { ErrorWithStatusCode, SessionRequest } from './types';

mongoose
  .connect('mongodb://localhost:27017/mestodb')
  .then(() => console.log('Connected to MongoDB.'))
  .catch(console.log);

const { PORT = 3000 } = process.env;

const app = express();

app.use(express.json());

// TODO: get user id from JWT token
app.use((req: SessionRequest, _res: Response, next: NextFunction) => {
  req.user = {
    _id: '6563945054cd7cfe07295859',
  };
  next();
});

app.use('/', usersRouter);
app.use('/', cardsRouter);

app.use(errors());

app.use(
  (
    err: ErrorWithStatusCode,
    _req: SessionRequest,
    res: Response,
    // eslint-disable-next-line no-unused-vars
    _next: NextFunction,
  ) => {
    const { statusCode = 500, message } = err;

    res.status(statusCode).send({
      message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
    });
  },
);

app.listen(3000, () => {
  console.log(`Server is running on port ${PORT}.`);
});
