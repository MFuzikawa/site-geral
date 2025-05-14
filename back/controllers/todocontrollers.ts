import { Request, Response, RequestHandler, NextFunction } from 'express';
import Todo from '../models/todo';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';

export const getTodos: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
};

export const createTodo: RequestHandler = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const { title, duedate } = req.body;
    const newTodo = new Todo({ title, duedate });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    console.error('Erro ao salvar tarefa:', error);
    res.status(500).json({ error: 'Erro interno ao salvar tarefa' });
  }
};

export const updateTodo: RequestHandler<
  ParamsDictionary,
  any,
  { title?: string; completed?: boolean; duedate?: Date },
  ParsedQs,
  Record<string, any>
> = async (req: Request<ParamsDictionary>, res: Response, next: NextFunction) => {
  try {
    const { title, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { ...(title !== undefined && { title }), ...(completed !== undefined && { completed }) },
      { new: true }
    );

    if (!updatedTodo) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.json(updatedTodo);
  } catch (error) {
    console.error('Erro ao atualizar tarefa:', error);
    res.status(500).json({ error: 'Erro interno ao atualizar tarefa' });
  }
};

export const deleteTodo: RequestHandler<
  ParamsDictionary,
  any,
  any,
  ParsedQs,
  Record<string, any>
> = async (req: Request<ParamsDictionary>, res: Response, next: NextFunction) => {
  try {
    const deletedTodo = await Todo.findByIdAndDelete(req.params.id);

    if (!deletedTodo) {
      return res.status(404).json({ error: 'Tarefa não encontrada' });
    }

    res.json({ message: 'Tarefa removida' });
  } catch (error) {
    console.error('Erro ao deletar tarefa:', error);
    res.status(500).json({ error: 'Erro interno ao deletar tarefa' });
  }
};