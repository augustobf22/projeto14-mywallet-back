import {Router} from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import validaSignup from '../middlewares/signupValidation.js';
import validaLogin from '../middlewares/loginValidation.js';

const router = Router();

router.post("/cadastro", validaSignup, signUp);
router.post("/", validaLogin, signIn);

export default router;