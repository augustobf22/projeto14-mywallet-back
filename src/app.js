import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import routes from '../routers/indexRouter.js';

//call app
const app = express();

// config app
app.use(express.json());
app.use(cors());
dotenv.config();

app.use(routes);

const PORT = 5000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));