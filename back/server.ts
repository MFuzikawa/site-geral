import express from 'express';
//express: É o framework web principal para Node.js, usado para construir a API

import mongoose from 'mongoose';
//mongoose: É uma biblioteca ODM (Object Data Modeling) para MongoDB e Node.js. Ela gerencia os relacionamentos entre dados, fornece validação de esquema e é usada para traduzir entre objetos no código e a representação desses objetos no MongoDB

import cors from 'cors';
//cors: É um pacote Node.js para fornecer um middleware Express que pode ser usado para habilitar o CORS (Cross-Origin Resource Sharing) com várias opções

import dotenv from 'dotenv';
//dotenv: É um módulo que carrega variáveis de ambiente de um arquivo .env para process.env. Isso é útil para manter configurações sensíveis (como strings de conexão de banco de dados) fora do código fonte

import todoRoutes from './Routes/todos';
/*todoRoutes from './Routes/todos': Importa as definições de rotas para o endpoint /api/todos. Presume-se que exista um arquivo todos.ts (ou todos.js após a compilação) dentro de uma pasta Routes no mesmo diretório do arquivo atual. Este arquivo provavelmente contém a lógica para manipular requisições CRUD (Criar, Ler, Atualizar, Deletar) para tarefas*/

dotenv.config();
//dotenv.config(): Função para carregar as variáveis de ambiente

const app = express();
//express(): Função para criar uma instância da aplicação Express

app.use(cors({ origin: "http://localhost:5173" }));
//cors(): Função middleware para habilitar o CORS

app.use(express.json());
//Ele torna os dados JSON enviados no corpo da requisição acessíveis através de req.body

app.use('/api/todos', todoRoutes);
//Monta o todoRoutes (importado anteriormente) no caminho base /api/todos


if (!process.env.MONGO_URI) {
  throw new Error("MONGO_URI não está definida");
}
//Verifica se a variável de ambiente MONGO_URI (que deve conter a string de conexão com o MongoDB) está definida

mongoose.connect(process.env.MONGO_URI)
  //Tenta estabelecer uma conexão com o banco de dados MongoDB usando a string de conexão fornecida em process.env.MONGO_URI esta função retorna uma Promise

  .then(() => {
    //Este bloco é executado se a conexão com o MongoDB for bem-sucedida
    console.log("Conectado ao MongoDB");
    //Exibe uma mensagem no console indicando que a conexão foi estabelecida
    const port = process.env.PORT ?? 5000;
    //Determina a porta em que o servidor irá escutar.
    app.listen(port, () => {
      console.log(`Servidor rodand ${port}`);
    });
    //Inicia o servidor Express para escutar por requisições HTTP na porta especificada e exibe uma mensagem para indicar a porta em que esta rodando
  })
  .catch(err => console.error("Erro na conexão com :", err));
//Este bloco é executado se ocorrer um erro durante a tentativa de conexão com o MongoDB.