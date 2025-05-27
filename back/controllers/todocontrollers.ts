import { Request, Response, RequestHandler, NextFunction } from 'express';
import Todo from '../models/todo';
import { ParamsDictionary } from 'express-serve-static-core';
import { ParsedQs } from 'qs';
import { handleErrorResponse } from '../utils/erroUtils'

export const getTodos: RequestHandler = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    handleErrorResponse(res, error, 'Erro ao listar tarefa')
  }
};

interface NewTodoBody{
  title:string
  duedate?: Date
}
export const createTodo: RequestHandler <ParamsDictionary, any, NewTodoBody, ParsedQs,Record<string, any> > = async (req, res, next
) => {
  try {
    const { title, duedate } = req.body;
    const newTodo = new Todo({ title, duedate });
    const savedTodo = await newTodo.save();
    res.status(201).json(savedTodo);
    console.log("Corpo da requisição recebido no backend:", req.body);
  } catch (error) {
    handleErrorResponse(res, error, 'Erro ao criar tarefa')
  }
};

interface UpdateTodoBody{
  title?: string
  completed?: boolean
  duedate?: Date
}
export const updateTodo: RequestHandler< ParamsDictionary,any,UpdateTodoBody,ParsedQs, Record<string, any> > = async (req, res, next) => {
  try {
    const { title, completed } = req.body;
    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { ...(title !== undefined && { title }), ...(completed !== undefined && { completed }) },
      { new: true }
    );

    if (!updatedTodo) {
      res.status(404).json({ error: 'Tarefa não encontrada' });
      return
    }

    res.json(updatedTodo);
  } catch (error) {
    handleErrorResponse(res, error, 'Erro ao atualizar tarefa tarefa')
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
      res.status(404).json({ error: 'Tarefa não encontrada' });
      return
    }

    res.json({ message: 'Tarefa removida' });
  } catch (error) {
    handleErrorResponse(res, error, 'Erro ao deletar tarefa')
  }
};