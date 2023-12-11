import { transactionsService } from "../services/transactionsService.js";

export async function addTransaction(req, res) {
    const type = req.params.tipo;

    const token = req.headers.authorization.replace('Bearer ', '');
    if(!token) return res.status(401);

    const { value, description } = req.body;
    
    const response = await transactionsService.addTransaction({ token, type, value, description });
    
    return res.status(201).send(response);
};

export async function getTransactions(req, res) {
	const token = req.headers.authorization.replace('Bearer ', '');
    if(!token) return res.status(401);

    const transactions = await transactionsService.getTransactions({token});
    return res.send(transactions);
};