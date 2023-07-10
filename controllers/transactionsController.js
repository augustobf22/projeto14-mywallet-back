import dayjs from "dayjs";
import { transactionSchema } from "../schemas/transactionSchema.js";
import { db } from "../database.js";

export async function addTransaction(req, res) {
    const tipo = req.params.tipo;
    const token = req.headers.token;

    const { value, description } = req.body;
    
    try {
        const userToken = await db.collection("sessions").findOne({ token });
        if(!userToken) return res.status(401).send("Token inválido!");     
        
        const time = dayjs(Date.now()).format('DD/MM');
  
        await db.collection("operacoes").insertOne({ token, tipo, value, description, time});
        res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export async function getTransactions(req, res) {
	const token = req.headers.token;
    if(!token) return res.status(401);

    try {
        let transactions = await db.collection("operacoes").find({token}).toArray();
        res.send(transactions);
    } catch (err) {
        res.status(500).send(err.message);
    }
};