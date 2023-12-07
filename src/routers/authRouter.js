import {Router} from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import validateSignup from '../middlewares/signupValidation.js';
import validateLogin from '../middlewares/loginValidation.js';

const authRouter = Router();

authRouter.post("/cadastro", validateSignup, signUp);
authRouter.post("/", validateLogin, signIn);

export default authRouter;