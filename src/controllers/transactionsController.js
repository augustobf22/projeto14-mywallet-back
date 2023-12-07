import dayjs from "dayjs";
import { db } from "../../database.js";

export async function addTransaction(req, res) {
    const tipo = req.params.tipo;
    const token = req.headers.authorization.replace('Bearer ', '');

    const { value, description } = req.body;
    
    try {
        const userToken = await db.collection("sessions").findOne({ token });
        if(!userToken) return res.status(401).send("Invalid token!");     
        
        const time = dayjs(Date.now()).format('DD/MM');
  
        await db.collection("operations").insertOne({ token, type, value, description, time});
        res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export async function getTransactions(req, res) {
	const token = req.headers.authorization.replace('Bearer ', '');

    if(!token) return res.status(401);

    try {
        let transactions = await db.collection("operations").find({token}).toArray();
        res.send(transactions);
    } catch (err) {
        res.status(500).send(err.message);
    }
};