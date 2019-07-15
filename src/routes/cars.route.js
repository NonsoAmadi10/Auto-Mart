
import { Router } from 'express';
import Sanitize from '../middlewares/Sanitize';
import authorize from '../middlewares/token';
import CarAdvertControllers from '../controllers/cars.controllers';
import upload from '../config/mutler';
import cloudinaryUploader from '../middlewares/cloudinary'

const router = Router();

router.post('/', authorize, upload.array('image_url', 2), Sanitize.advertSanitizer, cloudinaryUploader, CarAdvertControllers.postAdvert  );
router.patch('/:id/status', authorize, Sanitize.updateStatusSanitizer, CarAdvertControllers.updateCarStatusController );
router.patch('/:id/price', authorize, Sanitize.updatePriceSanitizer, CarAdvertControllers.UpdateCarPriceController);
router.get('/:id', authorize, Sanitize.getSpecificCar, CarAdvertControllers.getSpecificCarController);
router.get('/', authorize, Sanitize.querySanitizer, CarAdvertControllers.getCarsController);
router.delete('/:id', authorize,Sanitize.getSpecificCar, CarAdvertControllers.deleteCarController); 
export default router;