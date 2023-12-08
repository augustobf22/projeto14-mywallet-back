import {authRepository} from "../repositories/authRepository.js";
import {transactionsRepository} from "../repositories/transactionsRepository.js";
import {errors} from "../utils/errors.js";
import dayjs from "dayjs";

async function addTransaction({token, type, value, description}) {
    const userToken = await authRepository.findSession({token});
    if(!userToken) throw errors.invalidToken();
        
    const time = dayjs(Date.now()).format('DD/MM');
  
    return transactionsRepository.createTransaction({token, type, value, description, time});
}

async function getTransactions({token}) {
    const transactions = await transactionsRepository.findTransactions({token}).toArray();

    return transactions;
}

export const transactionsService = {addTransaction, getTransactions}