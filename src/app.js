import express from 'express';
import cors from 'cors';
import { MongoClient, ObjectId } from "mongodb";
import dotenv from "dotenv";
import joi from "joi";
import dayjs from "dayjs";
import { v4 as uuid } from 'uuid';
import bcrypt from "bcrypt";

const token = uuid();

//call app
const app = express();

// config app
app.use(express.json());
app.use(cors());
dotenv.config();

//connect to db
const mongoClient = new MongoClient(process.env.DATABASE_URL);

try {
    mongoClient.connect();
    console.log("MongoDB conectado!");
} catch(err) {
    console.log(err.message);
}

const db = mongoClient.db();

//inputs schemas
const signupSchema = joi.object({
    nome: joi.string().required(),
    email: joi.string().email().required(),
    senha: joi.string().required().min(3),
});

const loginSchema = joi.object({
    email: joi.string().email().required(),
    senha: joi.string().required().min(3),
});

const transactionSchema = joi.object({
    token: joi.string().required,
    value: joi.number().positive().required,
    description: joi.string().required()
});

//endpoints
//confirmação de senha no front - validação
app.post("/cadastro", async (req, res) => {
    const { nome, email, senha } = req.body;
  
    const validation = signupSchema.validate(req.body, { abortEarly: false });
    
    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    };
  
    try {
        const usuario = await db.collection("usuarios").findOne({ email });

        if (usuario) return res.status(409).send("E-mail já cadastrado");
  
        const hash = bcrypt.hashSync(senha, 10);
  
        await db.collection("usuarios").insertOne({ nome, email, senha: hash });
        res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

app.post("/", async (req, res) => {
    const { email, senha } = req.body;
    
    const validation = loginSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    };

    const user = await db.collection("usuarios").findOne({ email });
    if(!user) return res.status(404).send("Usuário não encontrado!");

    if(user && bcrypt.compareSync(senha, user.senha)) {
        const token = uuid();
        
		await db.collection("sessions").insertOne({userId: user._id,token});

        const userSerialized = JSON.stringify(user);
        localStorage.setItem("user", userSerialized);

        return res.status(200).send(token);
    } else {
        return res.status(401).send("Senha incorreta!");
    }
});

app.post("/nova-transacao/:tipo", async(req, res) => {
    const tipo = req.params.tipo;

    const { token, value, description} = req.body;
    
    const validation = transactionSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map((detail) => detail.message);
        return res.status(422).send(errors);
    };

    try {
        const userToken = await db.collection("sessions").findOne({ token });
        if(!userToken) return res.status(401).send("Token inválido!");        
  
        await db.collection("operacoes").insertOne({ token, tipo, value, description});
        res.sendStatus(201);
    } catch (err) {
        return res.status(500).send(err.message);
    }
});

/*
app.post("/participants", async (req, res) => {
    const { name } = req.body;

    const validation = participantSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const participant = await db.collection("participants").findOne({ name: name });
        if (participant) return res.status(409).send("Já existe esse usuário!");

        const lastStatus = Date.now();
        await db.collection("participants").insertOne({ name, lastStatus });

        const time = dayjs(Date.now()).format('HH:mm:ss');
        await db.collection("messages").insertOne({ from: name, to: 'Todos', text: 'entra na sala...', type: 'status', time: time });

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get("/participants", async (req, res) => {
    try {
        const participants = await db.collection("participants").find().toArray();
        res.send(participants);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post("/messages", async (req, res) => {
    const { to, text, type } = req.body;
    const user = req.headers.user;

    const validation = msgSchema.validate(req.body, { abortEarly: false });

    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    try {
        const participant = await db.collection("participants").findOne({ name: user });
        if (!participant) return res.status(422).send("Usuário não está na sala!");

        const time = dayjs(Date.now()).format('HH:mm:ss');
        await db.collection("messages").insertOne({ from: user, to: to, text: text, type: type, time: time });

        res.sendStatus(201);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.get("/messages", async (req, res) => {
    const user = req.headers.user;
    const { limit } = req.query;

    const validation = limitSchema.validate(req.query);
    if (validation.error) {
        const errors = validation.error.details.map(detail => detail.message);
        return res.status(422).send(errors);
    }

    try {
        let messages = await db.collection("messages").find({ $or: [{ to: 'Todos' }, { to: user }, { from: user }] }).toArray();
        if (messages.length > limit) messages = messages.slice(-limit);
        res.send(messages);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

app.post("/status", async (req, res) => {
    const user = req.headers.user;

    if (!user) return res.status(404).send();

    try {
        const participant = await db.collection("participants").findOne({ name: user });
        
        if (!participant) {
            return res.status(404).send();
        };

        const { _id } = participant;

        const lastStatus = Date.now();
        const updatedUser = { name: user, lastStatus };
        await db.collection("participants").updateOne({ _id }, { $set: updatedUser });
        res.sendStatus(200);
    } catch (err) {
        res.status(500).send(err.message);
    }
});

async function rem() {
    const toRem = await db.collection("participants").find({ lastStatus: { $lt: Date.now() - 10000 } }).toArray();
    const time = dayjs(Date.now()).format('HH:mm:ss');

    for (const user of toRem) {
        await db.collection("participants").deleteOne({ _id: user._id });
        await db.collection("messages").insertOne({ from: user.name, to: 'Todos', text: 'sai da sala...', type: 'status', time: time });
    };
};

setInterval(rem, 15000);
*/

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));