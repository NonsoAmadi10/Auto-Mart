import { Router } from 'express';
import AuthController from '../controllers/users.controllers';
import Sanitize from '../middlewares/Sanitize';

// Initialize <Router>

const router = Router();

router.post('/signup', Sanitize.signupSanitizer, AuthController.signupController);
router.post('/signin', Sanitize.signinSanitizer, AuthController.signinController );

export default router;
