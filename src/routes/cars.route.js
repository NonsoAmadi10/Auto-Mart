
import { Router } from 'express';
import Sanitize from '../middlewares/Sanitize';
import authorize from '../middlewares/token';
import CarsControllers from '../controllers/cars.controllers';
import upload from '../config/mutler';
import cloudinaryUploader from '../middlewares/cloudinary'

const router = Router();

router.post('/car', authorize, upload.array('photo', 2), Sanitize.advertSanitizer, cloudinaryUploader, CarsControllers.postAd );
router.patch('/car/:id/status', authorize, Sanitize.updateStatusSanitizer, CarsControllers.updateCarStatus )

export default router;