import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled, { css, keyframes } from "styled-components";
import { FaTrash, FaEdit } from "react-icons/fa";

// 🎨 Dégradé d'arrière-plan animé
const GradientBackground = styled.div`
  background: linear-gradient(135deg, #667eea, #764ba2);
  min-height: 100vh;
  display: flex;
  align-items: center;
  justify-content: center;
  flex-direction: column;
  padding: 20px;
`;

// 🎨 Animation de suppression des tâches (corrigée avec css``)
const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.9); }
`;

// 🎨 Style des tâches avec animation dynamique
const TaskItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  border-radius: 8px;
  margin-top: 8px;
  background: ${(props) => (props.completed ? "#a0e7a0" : "#f9f9f9")};
  border-left: 5px solid ${(props) => (props.completed ? "#2ecc71" : "#ff6b6b")};
  transition: 0.3s;
  position: relative;

  ${(props) =>
    props.deleting &&
    css`
      animation: ${fadeOut} 0.3s ease-in-out;
    `}

  &:hover {
    transform: scale(1.02);
    background: ${(props) => (props.completed ? "#91d891" : "#f0f0f0")};
  }
`;

// 🎨 Style des boutons
const ActionButton = styled.button`
  background: ${(props) => (props.delete ? "#e74c3c" : "#3498db")};
  color: white;
  border: none;
  padding: 5px 10px;
  border-radius: 5px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s;
  margin-left: 5px;

  &:hover {
    background: ${(props) => (props.delete ? "#c0392b" : "#2980b9")};
  }
`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingIndex, setEditingIndex] = useState(null);

  // Ajouter une tâche
  const addTask = () => {
    if (newTask.trim() === "") return;
    if (editingIndex !== null) {
      let updatedTasks = [...tasks];
      updatedTasks[editingIndex].text = newTask;
      setTasks(updatedTasks);
      setEditingIndex(null);
    } else {
      setTasks([...tasks, { text: newTask, completed: false, deleting: false }]);
    }
    setNewTask("");
  };

  // Marquer une tâche comme complétée
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Supprimer une tâche avec animation
  const deleteTask = (index) => {
    let updatedTasks = [...tasks];
    updatedTasks[index].deleting = true; // Active l'animation de suppression
    setTasks([...updatedTasks]);

    setTimeout(() => {
      setTasks(tasks.filter((_, i) => i !== index));
    }, 300); // Attends la fin de l'animation avant de supprimer
  };

  // Modifier une tâche
  const editTask = (index) => {
    setNewTask(tasks[index].text);
    setEditingIndex(index);
  };

  return (
    <GradientBackground>
      <h1 style={{ color: "white", fontSize: "32px", fontWeight: "bold", marginBottom: "10px" }}>
        Taskify 📝
      </h1>

      {/* 🏆 Section Ajouter/Modifier une tâche */}
      <div style={{ background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", textAlign: "center", width: "400px" }}>
        <h3>{editingIndex !== null ? "Modifier la tâche" : "Ajouter une nouvelle tâche"}</h3>
        <input
          type="text"
          className="form-control"
          placeholder="Écrire une tâche..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-primary mt-3" onClick={addTask}>
          {editingIndex !== null ? "Modifier" : "Ajouter"}
        </button>
      </div>

      {/* 📌 Liste des tâches */}
      <div style={{ background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0px 4px 15px rgba(0, 0, 0, 0.2)", textAlign: "center", width: "400px", marginTop: "20px" }}>
        <h3>Mes Tâches</h3>
        {tasks.length === 0 ? <p>Aucune tâche pour le moment.</p> : null}
        {tasks.map((task, index) => (
          <TaskItem key={index} completed={task.completed} deleting={task.deleting}>
            <span onClick={() => toggleComplete(index)} style={{ cursor: "pointer" }}>
              {task.completed ? <s>{task.text}</s> : task.text}
            </span>
            <div>
              <ActionButton onClick={() => editTask(index)}><FaEdit /></ActionButton>
              <ActionButton delete onClick={() => deleteTask(index)}><FaTrash /></ActionButton>
            </div>
          </TaskItem>
        ))}
      </div>
    </GradientBackground>
  );
}

export default App;
