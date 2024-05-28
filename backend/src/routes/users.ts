import express, { Request, Response } from 'express';
import User from '../models/user';
import jwt from 'jsonwebtoken';
import { check, validationResult } from 'express-validator';

const router = express.Router();

router.post(
  '/register',
  [
    check('firstName', '必須填寫姓氏').isString(),
    check('lastName', '必須填寫名子').isString(),
    check('email', '必須填寫信箱').isEmail(),
    check('password', '密碼必須大於6個字元').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array() });
    }

    try {
      let user = await User.findOne({ email: req.body.email });

      if (user) {
        return res.status(400).json({ message: '信箱已經存在' });
      }

      user = new User(req.body);
      await user.save();

      const token = jwt.sign(
        { userId: user.id },
        process.env.JWT_SECRET_KEY as string,
        { expiresIn: '1h' }
      );
      res.cookie('auth_token', token, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        maxAge: 3600000,
      });
      return res.status(200).json({ message: '註冊成功' });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: '發生了一些問題' });
    }
  }
);

export default router;