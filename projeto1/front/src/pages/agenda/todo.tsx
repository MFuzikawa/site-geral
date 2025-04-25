import {useState, useEffect}from 'react'
import axios from 'axios'
import "./todo.css"


  function Agenda() {
    interface todo {
      _id: string;
      title: string;
      duedate?: string;
      diasRestantes?: number;
    }
  const [todos, settodos] = useState<todo[]>([])
  const [newtodo, setnewtodo] = useState('')
  const [duedate, setduedate] = useState('')


  useEffect(() => {
    axios.get('http://localhost:5000/api/todos')
      .then(response => settodos(response.data))
      .catch(error => console.error('Erro ao carregar tarefas', error))
  }, [])
  const addtodo = () => {
    const newtask =
    {
      title: newtodo,
      duedate: new Date(duedate)
    }
    axios.post('http://localhost:5000/api/todos', newtask)
      .then(response => {
        settodos([...todos, response.data])
        setnewtodo('')
        setduedate('')
      })
      
  }

  return (
    <div className="Agenda">
      <h1>To-Do List</h1>

      <div className='box'>
      
        <input
          type="text"
          value={newtodo}
          onChange={(e) => setnewtodo(e.target.value)}
          placeholder="Nova tarefa"
        />
        <input
          type="date"
          value={duedate}
          onChange={(e) => setduedate(e.target.value)}
        />
        <button onClick={addtodo}>criar tarefas</button>
      </div>

      <ul>
        {todos.map((todo) => (
          <li key={todo._id}>
            <span>{todo.title}</span> - <span>{todo.duedate ? new Date(todo.duedate).toLocaleDateString() : 'Sem data'}</span>
            <span> - {todo.diasRestantes} dias restantes</span>
          </li>
        ))}
      </ul>
    </div>
  );


}
export default Agenda
