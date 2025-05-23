import React from "react";
import '../../pages/agenda/todo.css';

interface Todo {
    _id: string;
    title: string;
    duedate: string;
    completed: boolean;
}

interface TodoItemProps {
    todo: Todo;
    onDeleteTodo: (id: string) => Promise<void>;
    onUpdateTodo: (id: string, completed: boolean) => Promise<void>;
}

// --- Componente TodoItem ---
const TodoItem: React.FC<TodoItemProps> = ({ todo, onDeleteTodo, onUpdateTodo }) => {
    const dueDateObj = new Date(todo.duedate);
    // Adiciona 1 dia porque o construtor de Date pode interpretar a data como UTC 00:00,
    // o que pode resultar no dia anterior dependendo do fuso horário local.
    // Isso garante que a data exibida seja a data selecionada pelo usuário.
    dueDateObj.setDate(dueDateObj.getDate() + 1);
    const formattedDuedate = dueDateObj.toLocaleDateString('pt-BR', {
        day: '2-digit',
        month: '2-digit',
        year: 'numeric',
    });


    return (
        <li id="lista-todo" className={todo.completed ? "completed" : ""}>
            <div className="todo-info">
                <span className="todo-title">{todo.title}</span>
                <span className="todo-duedate">Data: {formattedDuedate}</span>
            </div>

            <div className="todo-actions">
                <button
                    onClick={() => onUpdateTodo(todo._id, todo.completed)}
                    className="button-update"
                    aria-label={todo.completed ? "Desmarcar tarefa como concluída" : "Marcar tarefa como concluída"}
                >

                    {todo.completed ? "Desmarcar" : "Concluir"}
                </button>

                <button
                    onClick={() => onDeleteTodo(todo._id)}
                    className="button-delete"
                    aria-label="Deletar tarefa"
                >
                    Deletar
                </button>
            </div>
        </li>
    );
};
export default TodoItem