import express, { Request, Response, NextFunction } from 'express';
import { createTodo, updateTodo, deleteTodo, getTodos } from "../controllers/todocontrollers";
import { ParamsDictionary } from 'express-serve-static-core';

const router = express.Router();

// Buscar todas tarefas
router.get('/', getTodos);

/// Criar uma nova tarefa
router.post('/', createTodo);

// Atualizar uma tarefa
router.put('/:id', (req: Request<ParamsDictionary>, res: Response, next: NextFunction) => {
  return updateTodo(req, res, next); // Passando o 'next' explicitamente
});

// Deletar uma tarefa
router.delete('/:id', (req: Request<ParamsDictionary>, res: Response, next: NextFunction) => {
  return deleteTodo(req, res, next); // Passando o 'next' explicitamente
});

export default router;