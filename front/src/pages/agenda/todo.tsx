import { useCallback, useEffect, useState} from "react";
import axios from "axios";
import TodoList from "../../components/agendaConfig/todoList";
import AddTodoForm from "../../components/agendaConfig/addTodoForm";

interface Todo{
  _id: string;
  title: string;
  duedate: string;
  completed: boolean;
}


const App = () => {
  
  
  const [todos, setTodos] = useState<Todo[]>([]);
  const API_URL = "http://localhost:5000/api/todos"; // Centralizar a URL da API

  // Função para buscar todas as tarefas (usando useCallback para otimização)
  const fetchTodos = useCallback(async () => {
    try {
      const response = await axios.get<Todo[]>(API_URL);
      // Ordenar tarefas: pendentes primeiro, depois por data de vencimento
      const sortedTodos = response.data.toSorted((a, b) => {
        if (a.completed === b.completed) {
          return new Date(a.duedate).getTime() - new Date(b.duedate).getTime();
        }
        return a.completed ? 1 : -1;
      });
      setTodos(sortedTodos);
    } catch (error) {
      console.error("Erro ao buscar tarefas:", error);
      // Adicionar feedback para o usuário, ex: usando um estado de erro
    }
  }, []); // useCallback com dependência vazia, pois API_URL é constante

  // Carregar tarefas na primeira renderização
  useEffect(() => {
    fetchTodos();
  }, [fetchTodos]);

  // Função para adicionar uma nova tarefa
  const addTodo = async (title: string, duedate: string) => {
    try {
      // A data do input tipo 'date' já vem no formato 'YYYY-MM-DD'
      await axios.post(API_URL, {
        title,
        duedate, // Enviar a data diretamente
      });
      fetchTodos(); // Recarregar tarefas após a adição
    } catch (error) {
      console.error("Erro ao adicionar tarefa:", error);
    }
  };

  // Função para deletar uma tarefa
  const deleteTodo = async (id: string) => {
    try {
      await axios.delete(`${API_URL}/${id}`);
      fetchTodos(); // Recarregar tarefas após a remoção
    } catch (error) {
      console.error("Erro ao deletar tarefa:", error);
    }
  };

  // Função para atualizar a tarefa
  const updateTodo = async (id: string, completed: boolean) => {
    try {
      await axios.put(`${API_URL}/${id}`, {
        completed: !completed,
      });
      fetchTodos(); // Recarregar tarefas após a atualização
    } catch (error) {
      console.error("Erro ao atualizar tarefa:", error);
    }
  };

  return (
    <div className="container">
      <div className="box-tarefas">
        <h1>to-do list</h1>
        <AddTodoForm onAddTodo={addTodo} />
        <TodoList
          todos={todos}
          onDeleteTodo={deleteTodo}
          onUpdateTodo={updateTodo}
        />
      </div>
    </div>
  );
};

export default App;