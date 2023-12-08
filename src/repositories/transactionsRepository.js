async function createTransaction({token, type, value, description, time}) {
    return await db.collection("operations").insertOne({token, type, value, description, time});
}

async function findTransactions({token}){
    return await db.collection("operations").find({token});
}

export const transactionsRepository = {createTransaction, findTransactions}