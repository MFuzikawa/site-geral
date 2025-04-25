import express from 'express'
import Todo from '../models/todo'



const router = express.Router()

router.get('/', async (req, res) => {
    const todos = await Todo.find()
    res.json(todos)
})

router.post('/', async (req, res) => {
    try {
      const { title, duedate } = req.body;
      const newTodo = new Todo({ title, duedate });
      const savedTodo = await newTodo.save();
      res.json(savedTodo);
    } catch (error) {
      console.error('Erro ao salvar tarefa:', error);
      res.status(500).json({ error: 'Erro interno no servidor' });
    }
  });
  

router.put('/:id', async (req, res) => {
    const update = await Todo.findByIdAndUpdate
        (
            req.params.id,
            { completed: req.body.completed },
            { new: true }
        )
    res.json(update)

})

router.delete('/:id', async (req, res) => {
    await Todo.findByIdAndDelete(req.params.id)
    res.json({ message: 'tarefa removida' })
})
export default router