import { Router } from 'express';
import { Joi, celebrate } from 'celebrate';
import {
  createUser,
  getUserById,
  getUsers,
  updateUser,
  updateAvatar,
} from '../controllers/users';

const router = Router();

router.get('/users', getUsers);

router.get(
  '/users/:userId',
  celebrate({
    params: Joi.object().keys({
      userId: Joi.string().hex().length(24),
    }),
  }),
  getUserById,
);

router.post(
  '/users',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().required().min(2).max(30),
      about: Joi.string().required().min(2).max(200),
      avatar: Joi.string().required(),
    }),
  }),
  createUser,
);

router.patch(
  '/users/me',
  celebrate({
    body: Joi.object().keys({
      name: Joi.string().min(2).max(30),
      about: Joi.string().min(2).max(200),
    }),
  }),
  updateUser,
);

router.patch(
  '/users/me/avatar',
  celebrate({
    body: Joi.object().keys({
      avatar: Joi.string().required(),
    }),
  }),
  updateAvatar,
);

export default router;
