import {Router} from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import { validateSchemaMiddleware } from '../middlewares/schemaHandler.js';
import {loginSchema} from '../schemas/loginSchema.js';
import { signupSchema } from '../schemas/signupSchema.js';

const authRouter = Router();

authRouter.post("/cadastro", validateSchemaMiddleware(loginSchema), signUp);
authRouter.post("/", validateSchemaMiddleware(signupSchema), signIn);

export default authRouter;