import {Router} from 'express';
import { addTransaction, getTransactions } from '../controllers/transactionsController.js';
import validateTransaction from '../middlewares/transactionValidation.js';

const transactionRouter = Router();

transactionRouter.post("/nova-transacao/:tipo", validateTransaction, addTransaction);
transactionRouter.get("/home", getTransactions);

export default transactionRouter;