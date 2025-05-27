import React, { useState } from "react";
import '../../pages/agenda/todo.css'; 
import { IoIosAdd } from "react-icons/io";


  
  // Props para o componente AddTodoForm
  interface AddTodoFormProps {
    onAddTodo: (title: string, duedate: string) => Promise<void>;
  }
  
  // --- Componente AddTodoForm ---
  const AddTodoForm: React.FC<AddTodoFormProps> = ({ onAddTodo }) => {
    const [newTodoTitle, setNewTodoTitle] = useState<string>("");
    const [newTodoDuedate, setNewTodoDuedate] = useState<string>("");
  
    const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault(); // Prevenir o comportamento padrão do formulário
      if (newTodoTitle.trim() && newTodoDuedate) {
        try{
        await onAddTodo(newTodoTitle, newTodoDuedate);
        setNewTodoTitle("");
        setNewTodoDuedate("");
        } catch(error){
          console.error("Erro ao adicionar tarefa", error)
        }
      } else {
        // Adicionar alguma lógica de feedback para o usuário se os campos estiverem vazios
        console.warn("Título e data de vencimento são obrigatórios.");
      }
    };
  
    return (
      <form onSubmit={handleSubmit} className="inputs">
        <input
          type="text"
          placeholder="Nova tarefa"
          value={newTodoTitle}
          onChange={(e) => setNewTodoTitle(e.target.value)}
          aria-label="Título da nova tarefa"
        />
        <input
          type="date"
          value={newTodoDuedate}
          onChange={(e) => setNewTodoDuedate(e.target.value)}
          aria-label="Data de vencimento da nova tarefa"
        />
        <button id="button-addtodo" type="submit" aria-label="Adicionar nova tarefa">
          <IoIosAdd size={30} />
        </button>
      </form>
    );
  };

  export default AddTodoForm