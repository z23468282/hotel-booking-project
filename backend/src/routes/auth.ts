import express, { Request, Response } from 'express';
import { check, validationResult } from 'express-validator';
import User from '../models/user';
import bcrypt from 'bcrypt';
import jwt from 'jsonwebtoken';
import verifyToken from '../middleware/auth';

const router = express.Router();

router.post(
  '/login',
  [
    check('email', '請填寫信箱').isEmail(),
    check('password', '密碼必須大於6個字元').isLength({ min: 6 }),
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(422).json({ message: errors.array() });
    }

    const { email, password } = req.body;
    try {
      const user = await User.findOne({ email });
      if (!user) {
        res.status(422).json({ message: '信箱不存在' });
      }

      if (user) {
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          return res.status(422).json({ message: '密碼不正確' });
        }

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
        res.status(200).json({ userId: user._id });
      }
    } catch (error) {
      res.status(500).json('發生了一些問題');
    }
  }
);

router.get('/validate-token', verifyToken, (req: Request, res: Response) => {
  res.status(200).json({ userId: req.userId });
});

router.post('/logout', (req: Request, res: Response) => {
  res.cookie('auth_token', '', {
    expires: new Date(0),
  });
  res.send();
});

export default router;
