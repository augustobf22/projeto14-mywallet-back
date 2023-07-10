import {Router} from 'express';
import { addTransaction, getTransactions } from '../controllers/transactionsController.js';
import validaTransaction from '../middlewares/transactionValidation.js';

const router = Router();

router.post("/nova-transacao/:tipo", validaTransaction, addTransaction);
router.get("/home", getTransactions);

export default router;