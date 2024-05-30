import express, { Request, Response } from 'express';
import multer from 'multer';
import cloudinary from 'cloudinary';
import Hotel from '../models/hotel';
import { HotelType } from '../shared/types';
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

      const imageUrls = await uploadImages(imageFiles);
      newHotel.imageUrls = imageUrls;
      newHotel.lastUpdated = new Date();
      newHotel.userId = req.userId;

      const hotel = new Hotel(newHotel);
      await hotel.save();

      res.status(201).send(hotel);
    } catch (e) {
      res.status(500).json({ message: '伺服器出現問題' });
    }
  }
);

router.get('/', verifyToken, async (req: Request, res: Response) => {
  try {
    const hotels = await Hotel.find({ userId: req.userId });
    res.json(hotels);
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
});

router.get('/:id', verifyToken, async (req: Request, res: Response) => {
  const id = req.params.id;
  try {
    const hotel = await Hotel.findOne({
      _id: id,
      userId: req.userId,
    });
    res.json(hotel);
  } catch (error) {
    res.status(500).json({ message: '伺服器錯誤' });
  }
});

router.put(
  '/:hotelId',
  verifyToken,
  upload.array('imageFiles'),
  async (req: Request, res: Response) => {
    try {
      const updatedHotel: HotelType = req.body;
      updatedHotel.lastUpdated = new Date();

      const hotel = await Hotel.findOneAndUpdate(
        {
          _id: req.params.hotelId,
          userId: req.userId,
        },
        updatedHotel,
        { new: true }
      );

      if (!hotel) {
        res.status(404).json({ message: '未找到資料' });
      }

      const files = req.files as Express.Multer.File[];
      const updatedImageUrls = await uploadImages(files);

      if (hotel) {
        hotel.imageUrls = [
          ...updatedImageUrls,
          ...(updatedHotel.imageUrls || []),
        ];

        await hotel.save();
        res.status(201).json(hotel);
      }
    } catch (error) {
      res.status(500).json({ message: '伺服器錯誤' });
    }
  }
);

async function uploadImages(imageFiles: Express.Multer.File[]) {
  //將圖像上傳到雲區域,map一次只能上傳一張
  const uploadPromises = imageFiles.map(async (image) => {
    const b64 = Buffer.from(image.buffer).toString('base64');
    let dataURI = 'data:' + image.mimetype + ';base64,' + b64;
    const res = await cloudinary.v2.uploader.upload(dataURI);
    return res.url;
  });

  const imageUrls = await Promise.all(uploadPromises);
  return imageUrls;
}
export default router;
