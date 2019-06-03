import { Router } from 'express';
import FlagController from '../controllers/flags.controller';
import authorize from '../middlewares/token';
import Sanitizer from '../middlewares/Sanitize';

const router = Router();

router.post('/flag', authorize, Sanitizer.flagSanitizer, FlagController);

export default router;
