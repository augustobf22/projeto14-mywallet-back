import {Router} from 'express';
import { signUp, signIn } from '../controllers/authController.js';
import { validateSchemaMiddleware } from '../middlewares/schemaHandler.js';
import {loginSchema} from '../schemas/loginSchema.js';
import { signupSchema } from '../schemas/signupSchema.js';

const authRouter = Router();

authRouter.post("/cadastro", validateSchemaMiddleware(signupSchema), signUp);
authRouter.post("/", validateSchemaMiddleware(loginSchema), signIn);

export default authRouter;