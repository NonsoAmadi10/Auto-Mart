
import { Router } from 'express';
import Sanitize from '../middlewares/Sanitize';
import authorize from '../middlewares/token';
import CarAdvertControllers from '../controllers/cars.controllers';
import upload from '../config/mutler';
import cloudinaryUploader from '../middlewares/cloudinary'

const router = Router();

router.post('/car', authorize, upload.array('photo', 2), Sanitize.advertSanitizer, cloudinaryUploader, CarAdvertControllers.postAdvert  );
router.patch('/car/:id/status', authorize, Sanitize.updateStatusSanitizer, CarAdvertControllers.updateCarStatusController );
router.patch('/car/:id/price', authorize, Sanitize.updatePriceSanitizer, CarAdvertControllers.UpdateCarPriceController);
/* router.get('/car/:id', authorize, Sanitize.getSpecificCar, CarsControllers.getSpecificCar);
router.get('/car', authorize, Sanitize.querySanitizer, CarsControllers.getAll);
router.delete('/car/:id', authorize,Sanitize.getSpecificCar, CarsControllers.deleteCarAd); */
export default router;