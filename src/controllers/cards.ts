import { NextFunction, Response } from 'express';
import { SessionRequest } from '../types';
import Card from '../models/card';
import NotFoundError from '../errors/not-found';

export const createCard = (
  req: SessionRequest,
  res: Response,
  next: NextFunction,
) => {
  const { name, link } = req.body;
  Card.create({ name, link, owner: req.user?._id })
    .then((card) => {
      res.status(201).json(card);
    })
    .catch(next);
};

export const getCards = (
  req: SessionRequest,
  res: Response,
  next: NextFunction,
) => {
  Card.find({})
    .then((cards) => {
      res.status(200).json(cards);
    })
    .catch(next);
};

export const deleteCard = (
  req: SessionRequest,
  res: Response,
  next: NextFunction,
) => {
  Card.findOneAndDelete({ _id: req.params.cardId })
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      res.status(200).json(card);
    })
    .catch(next);
};

export const likeCard = (
  req: SessionRequest,
  res: Response,
  next: NextFunction,
) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $addToSet: { likes: req.user?._id } },
    { new: true, throwOnValidationError: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      res.status(200).json(card);
    })
    .catch(next);
};

export const dislikeCard = (
  req: SessionRequest,
  res: Response,
  next: NextFunction,
) => {
  Card.findByIdAndUpdate(
    req.params.cardId,
    { $pull: { likes: `${req.user?._id}` } },
    { new: true },
  )
    .orFail(new NotFoundError('Карточка не найдена'))
    .then((card) => {
      res.status(200).json(card);
    })
    .catch(next);
};
