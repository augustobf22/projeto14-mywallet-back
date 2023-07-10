import bcrypt from "bcrypt";
import { v4 as uuid } from 'uuid';
import { signupSchema } from "../schemas/signupSchema.js";
import { loginSchema } from "../schemas/loginSchema.js";
import { db } from "../database.js";

export async function signUp(req, res) {
    const { nome, email, senha } = req.body;
  
    try {
        const usuario = await db.collection("usuarios").findOne({ email });

        if (usuario) return res.status(409).send("E-mail já cadastrado");
  
        const hash = bcrypt.hashSync(senha, 10);
  
        await db.collection("usuarios").insertOne({ nome, email, senha: hash });
        res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
};

export async function signIn(req, res) {
    const { email, senha } = req.body;

    const user = await db.collection("usuarios").findOne({ email });
    if(!user) return res.status(404).send("Usuário não encontrado!");

    if(user && bcrypt.compareSync(senha, user.senha)) {
        const token = uuid();
        
		await db.collection("sessions").insertOne({userId: user._id,token});

        /*const userSerialized = JSON.stringify(user);
        localStorage.setItem("user", userSerialized);*/

        return res.status(200).send(token);
    } else {
        return res.status(401).send("Senha incorreta!");
    }
};