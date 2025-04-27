import express, { Request, Response } from 'express';
import Todo from '../models/todo';

const router = express.Router();

// Buscar todas tarefas
router.get('/', async (req: Request, res: Response) => {
  try {
    const todos = await Todo.find();
    res.json(todos);
  } catch (error) {
    console.error('Erro ao buscar tarefas:', error);
    res.status(500).json({ error: 'Erro ao buscar tarefas' });
  }
});

// Criar uma nova tarefa
router.post('/', async (req: Request, res: Response) => {
  try {
    const { text, duedate } = req.body;
    const newTodo = new Todo({ text, duedate });
    const savedTodo = await newTodo.save();
    res.json(savedTodo);
  } catch (error) {
    console.error('Erro ao salvar tarefa:', error);
    res.status(500).json({ error: 'Erro interno ao salvar tarefa' });
  }
});

// Atualizar uma tarefa (editar texto ou marcar como concluída)
router.put('/:id', async (req: Request, res: Response) => {
  try {
    const { text, completed } = req.body;

    const updatedTodo = await Todo.findByIdAndUpdate(
      req.params.id,
      { 
        ...(text !== undefined && { text }), 
        ...(completed !== undefined && { completed }) 
      },
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
});

// Deletar uma tarefa
router.delete('/:id', async (req: Request, res: Response) => {
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
});

export default router;
