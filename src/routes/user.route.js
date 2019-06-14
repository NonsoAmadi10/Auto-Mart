import { Router } from 'express';
import AuthController from '../controllers/users.controllers';
import Sanitize from '../middlewares/Sanitize';

// Initialize <Router>

const router = Router();

router.post('/auth/signup', Sanitize.signupSanitizer, AuthController.signupController);


export default router;
