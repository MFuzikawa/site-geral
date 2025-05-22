import React, { useState, useEffect } from "react";
import axios from "axios";
import './todo.css'
import { IoIosAdd } from "react-icons/io";


interface Todo {
  _id: string;
  title: string;
  duedate: string;
  completed: boolean;
}

const App = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  const [newTodo, setNewTodo] = useState<string>("");
  const [duedate, setDuedate] = useState<string>("");

  // Função para buscar todas as tarefas
  const fetchTodos = async () => {
    try {
      const response = await axios.get("http://localhost:5000/api/todos");
      setTodos(response.data);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
    }
  };

  // Função para adicionar uma nova tarefa
  const addTodo = async () => {
    if (newTodo) {
      try {
        const response = await axios.post("http://localhost:5000/api/todos", {
          title: newTodo,
          duedate: duedate,
        });
        setNewTodo(""); // Limpar o input após adicionar
        setDuedate(""); // Limpar o campo da data
        fetchTodos(); // Recarregar tarefas após a adição
      } catch (error) {
        console.error("Erro ao adicionar tarefa:", error);
      }
    }
  };

  // Função para deletar uma tarefa
  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`http://localhost:5000/api/todos/${id}`);
      fetchTodos(); // Recarregar tarefas após a remoção
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  // Função para atualizar a tarefa
  const updateTodo = async (id: string, completed: boolean) => {
    try {
      await axios.put(`http://localhost:5000/api/todos/${id}`, {
        completed: !completed,
      });
      fetchTodos(); // Recarregar tarefas após a atualização
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  // Carregar tarefas na primeira renderização
  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>


      {/* Formulário para adicionar tarefa */}
      <div className="container">
        <div className="box-tarefas">
          <h1>to-do list</h1>
          <div className="inputs">
            <input
              type="text"
              placeholder="Nova tarefa"
              value={newTodo}
              onChange={(e) => setNewTodo(e.target.value)}
            />
            <input
              type="date"
              value={duedate}
              onChange={(e) => setDuedate(e.target.value)}
            />
            <button id="button-addtodo" onClick={addTodo}><IoIosAdd size={30} /> </button>
          </div>
          {/* Lista de tarefas */}
          <ul>
            {todos.map((todo) => (
              <li key={todo._id}>
                <span>{todo.title} - {todo.duedate}</span>
                <button onClick={() => updateTodo(todo._id, todo.completed)}>
                  {todo.completed ? "Desmarcar" : "Marcar como Concluída"}
                </button>
                <button onClick={() => deleteTodo(todo._id)}>Deletar</button>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default App;
