import express from 'express';
import cors from 'cors';
import dotenv from "dotenv";
import routes from '../src/routers/indexRouter.js';

const app = express();

app.use(express.json());
app.use(cors());
dotenv.config();

app.use(routes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));