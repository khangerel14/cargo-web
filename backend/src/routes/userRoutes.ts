import express, { Request, Response, NextFunction } from 'express';
import { body, validationResult, query } from 'express-validator';
import {
  getUsers,
  getUserById,
  deleteUser,
  createOrLoginUser,
  getUserByPhoneNumber,
} from '../controllers/userController';

const router = express.Router();

router.post('/auth', createOrLoginUser);

router.get(
  '/user',
  [
    query('phoneNumber')
      .isString()
      .notEmpty()
      .withMessage('Phone number must be a non-empty string'),
  ],
  (req: Request, res: Response, next: NextFunction) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400).json({ errors: errors.array() });
      return;
    }
    getUserByPhoneNumber(req, res);
  }
);

router.get('/', getUsers);

// Parameterized routes last
router.get('/:id', getUserById);
router.delete('/:id', deleteUser);

export default router;
