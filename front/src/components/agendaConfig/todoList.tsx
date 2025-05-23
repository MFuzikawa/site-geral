import React from "react";
import TodoItem from "./todoItem";
import "../../pages/agenda/todo.css"

// Interface para o objeto 
interface Todo {
  _id: string;
  title: string;
  duedate: string;
  completed: boolean;
}


interface TodoListProps {
    todos: Todo[];
    onDeleteTodo: (id: string) => Promise<void>;
    onUpdateTodo: (id: string, completed: boolean) => Promise<void>;
  }
  
  // --- Componente TodoList ---
  const TodoList: React.FC<TodoListProps> = ({ todos, onDeleteTodo, onUpdateTodo }) => {
    if (todos.length === 0) {
      return <p className="empty-message">Nenhuma tarefa na lista ainda!</p>;
    }
  
    return (
      <ul className="ul-todo">
        {todos.map((todo) => (
          <TodoItem
            key={todo._id}
            todo={todo}
            onDeleteTodo={onDeleteTodo}
            onUpdateTodo={onUpdateTodo}
          />
        ))}
      </ul>
    );
  };

  export default TodoList