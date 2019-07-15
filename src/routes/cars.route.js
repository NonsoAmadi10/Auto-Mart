
import { Router } from 'express';
import Sanitize from '../middlewares/Sanitize';
import authorize from '../middlewares/token';
import CarAdvertControllers from '../controllers/cars.controllers';
import upload from '../config/mutler';
//import cloudinaryUploader from '../middlewares/cloudinary'

const router = Router();

router.post('/', authorize, upload.array('image_url', 2), CarAdvertControllers.postAdvert  );
router.patch('/:id/status', authorize, CarAdvertControllers.updateCarStatusController );
router.patch('/:id/price', authorize, Sanitize.updatePriceSanitizer, CarAdvertControllers.UpdateCarPriceController);
router.get('/:id', authorize, CarAdvertControllers.getSpecificCarController);
router.get('/', authorize, CarAdvertControllers.getCarsController);
router.delete('/:id', authorize, CarAdvertControllers.deleteCarController); 
export default router;