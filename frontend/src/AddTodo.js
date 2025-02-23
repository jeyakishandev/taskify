import React, { useState } from 'react';
import axios from 'axios';

function AddTodo({ refreshTodos }) {
  const [title, setTitle] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!title.trim()) return;

    await axios.post('http://localhost:5000/api/todos', { title });
    setTitle("");
    refreshTodos();
  };

  return (
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Nouvelle tâche"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
      />
      <button type="submit">Ajouter</button>
    </form>
  );
}

export default AddTodo;
