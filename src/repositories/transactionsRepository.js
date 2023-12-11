import { db } from "../../database.js";

async function createTransaction({token, type, value, description, time}) {
    return db.collection("operations").insertOne({token, type, value, description, time});
}

async function findTransactions({token}){
    return db.collection("operations").find({token});
}

export const transactionsRepository = {createTransaction, findTransactions}