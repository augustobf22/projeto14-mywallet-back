import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';
import { db } from "../database.js";

export async function signUp(req, res) {
    const { name, email, password } = req.body;
  
    try {
        const usuario = await db.collection("usuarios").findOne({ email });

        if (usuario) return res.status(409).send("E-mail já cadastrado");
  
        const hash = bcrypt.hashSync(password, 10);
  
        await db.collection("usuarios").insertOne({ name, email, password: hash });
        res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export async function signIn(req, res) {
    const { email, password } = req.body;

    try{
        const user = await db.collection("usuarios").findOne({ email });
        if(!user) return res.status(404).send("Usuário não encontrado!");

        if(user && bcrypt.compareSync(password, user.password)) {
            const token = uuid();
            
            await db.collection("sessions").insertOne({userId: user._id,token});

            /*const userSerialized = JSON.stringify(user);
            localStorage.setItem("user", userSerialized);*/

            return res.status(200).send(token);
        } else {
            return res.status(401).send("Senha incorreta!");
        }
    } catch (err){
        return res.status(500).send(err.message);
    }
};