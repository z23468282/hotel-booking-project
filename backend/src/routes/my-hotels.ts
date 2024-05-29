import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel, { HotelType } from '../models/hotel';
import verifyToken from '../middleware/auth';
import { body } from 'express-validator';

const router = express.Router();

const storage = multer.memoryStorage(); //告訴multer我們要存取任何文件
const upload = multer({
  storage: storage,
  limits: {
    fileSize: 5 * 1024 * 1024, //圖片不超過5MB
  },
});

router.post(
  '/',
  verifyToken,
  [
    body('name').notEmpty().withMessage('請填寫名稱'),
    body('city').notEmpty().withMessage('請填寫城市'),
    body('description').notEmpty().withMessage('請敘述'),
    body('type').notEmpty().withMessage('請填寫類型'),
    body('pricePerNight').notEmpty().isNumeric().withMessage('請填寫每晚價格'),
    body('facilities').notEmpty().isArray().withMessage('請填寫設施'),
  ],
  upload.array('imageFiles', 6),
  async (req: Request, res: Response) => {
    try {
      const imageFiles = req.files as Express.Multer.File[];
      const newHotel: HotelType = req.body;
      //將圖像上傳到雲區域,map一次只能上傳一張
      const uploadPromises = imageFiles.map(async (image) => {
        const b64 = Buffer.from(image.buffer).toString('base64');
        let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
        const res = await cloudinary.v2.uploader.upload(dataURI);
        return res.url;
      });

      //將url添加到旅店
      const imageUrls = await Promise.all(uploadPromises);
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;
      console.log(newHotel);

      const hotel = new Hotel(newHotel);
      await hotel.save();

      res.status(201).send(hotel);
    } catch (e) {
      res.status(500).json({ message: '伺服器出現問題' });
    }
  }
);

export default router;
