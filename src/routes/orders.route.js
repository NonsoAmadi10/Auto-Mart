import { Router } from 'express';
import OrderControllers from '../controllers/orders.controllers';
import authorize from '../middlewares/token';
import Sanitize from '../middlewares/Sanitize';

const router = Router();

router.post('/order',authorize, Sanitize.OrderSanitizer, OrderControllers.postOrder);

export default router;