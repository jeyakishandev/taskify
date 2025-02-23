import React, { useEffect, useState } from 'react';
import axios from 'axios';
import AddTodo from './AddTodo';

function TodoList() {
  const [todos, setTodos] = useState([]);

  const fetchTodos = () => {
    axios.get('http://localhost:5000/api/todos')
      .then(response => setTodos(response.data))
      .catch(error => console.error('Erreur lors du chargement des tâches:', error));
  };

  useEffect(() => {
    fetchTodos();
  }, []);

  return (
    <div>
      <h2>Liste des tâches</h2>
      <AddTodo refreshTodos={fetchTodos} />
      <ul>
        {todos.map(todo => (
          <li key={todo.id}>
            {todo.title} {todo.completed ? "✅" : "❌"}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoList;
