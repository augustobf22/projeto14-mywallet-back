import { db } from "../../database.js";

async function findUser(email) {
    return await db.collection("users").findOne({ email });
}

async function createUser({ name, email, password}) {
    return await db.collection("users").insertOne({ name, email, password});
}

async function createSession({userId, token}) {
    return await db.collection("sessions").insertOne({userId, token});
}

export const authRepository = {findUser, createUser, createSession};