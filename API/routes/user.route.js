import { Router } from 'express';
import UserControllers from '../controllers/users.controllers';

// Initialize <Router>

const router = Router();

router.post('/auth/signup', UserControllers.signupUser);

export default router;
