import express from 'express';
import mongoose from 'mongoose';
import cors from 'cors';
import dotenv from 'dotenv';
import todoRoutes from './Routes/todos'; 

dotenv.config();

const app = express();

app.use(cors({origin:"http://localhost:5173"}));
app.use(express.json());
app.use('/api/todos', todoRoutes);


if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI não está definida");
}

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log("Conectado ao MongoDB");
    const port = process.env.PORT ?? 5000;
    app.listen(port, () => {
      console.log(`Servidor rodand ${port}`);
    });
  })
  .catch(err => console.error("Erro na conexão com :", err));
