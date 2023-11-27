import { NextFunction, Request, Response } from 'express';
import User from '../models/user';
import { SessionRequest } from '../types';
import NotFoundError from '../errors/not-found';

export const createUser = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  const { name, about, avatar } = req.body;
  User.create({ name, about, avatar })
    .then((user) => {
      res.status(201).json(user);
    })
    .catch(next);
};

export const getUserById = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  User.findById(req.params.userId)
    .orFail(() => new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
};

export const getUsers = async (
  req: Request,
  res: Response,
  next: NextFunction,
) => {
  User.find({})
    .then((users) => {
      res.status(200).json(users);
    })
    .catch(next);
};

export const updateUser = (
  req: SessionRequest,
  res: Response,
  next: NextFunction,
) => {
  const { name, about } = req.body;
  User.findByIdAndUpdate(req.user?._id, { name, about }, { new: true })
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
};

export const updateAvatar = (
  req: SessionRequest,
  res: Response,
  next: NextFunction,
) => {
  const { avatar } = req.body;
  User.findByIdAndUpdate(
    req.user?._id,
    { avatar },
    { new: true, runValidators: true },
  )
    .orFail(new NotFoundError('Пользователь не найден'))
    .then((user) => {
      res.status(200).json(user);
    })
    .catch(next);
};
