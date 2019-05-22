import { Router } from 'express';
import UserControllers from '../controllers/users.controllers';
import Sanitize from '../middlewares/Sanitize';

// Initialize <Router>

const router = Router();

router.post('/auth/signup', Sanitize.signupSanitizer, UserControllers.signupUser);

export default router;
