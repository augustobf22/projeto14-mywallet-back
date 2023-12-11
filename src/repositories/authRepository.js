import { db } from "../../database.js";

async function findUser({email}) {
    return db.collection("users").findOne({ email });
}

async function createUser({ name, email, password}) {
    return db.collection("users").insertOne({ name, email, password});
}

async function createSession({userId, token}) {
    return db.collection("sessions").insertOne({userId, token});
}

async function findSession({token}) {
    return db.collection("sessions").findOne({ token });
}

export const authRepository = {findUser, createUser, createSession, findSession};