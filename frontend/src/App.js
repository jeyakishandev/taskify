import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled, { keyframes } from "styled-components";
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

// 🎨 Animation pour l'apparition des tâches
const fadeIn = keyframes`
  from { opacity: 0; transform: translateY(-10px); }
  to { opacity: 1; transform: translateY(0); }
`;

// 🎨 Animation pour la suppression des tâches
const fadeOut = keyframes`
  from { opacity: 1; transform: scale(1); }
  to { opacity: 0; transform: scale(0.9); }
`;

// 🎨 Style de la carte
const Card = styled.div`
  background: white;
  padding: 20px;
  border-radius: 12px;
  box-shadow: 0px 4px 15px rgba(0, 0, 0, 0.2);
  width: 400px;
  text-align: center;
  margin: 15px;
  animation: ${fadeIn} 0.3s ease-in-out;
`;

// 🎨 Style des tâches
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
  animation: ${fadeIn} 0.5s ease-in-out;
  position: relative;

  &:hover {
    transform: scale(1.02);
    background: ${(props) => (props.completed ? "#91d891" : "#f0f0f0")};
  }
`;

// 🎨 Style du bouton "Ajouter"
const CustomButton = styled.button`
  background: #ff6b6b;
  color: white;
  border: none;
  padding: 10px 15px;
  font-size: 16px;
  border-radius: 8px;
  cursor: pointer;
  font-weight: bold;
  transition: 0.3s ease-in-out;
  
  &:hover {
    background: #ff3b3b;
    transform: scale(1.05);
  }
`;

// 🎨 Boutons d'actions
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

const Counter = styled.p`
  font-size: 14px;
  color: white;
  font-weight: bold;
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
      setTasks([...tasks, { text: newTask, completed: false }]);
    }
    setNewTask("");
  };

  // Marquer une tâche comme complétée
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Supprimer une tâche avec effet de disparition
  const deleteTask = (index) => {
    let updatedTasks = [...tasks];
    updatedTasks[index].deleting = true; 
    setTasks([...updatedTasks]);
    setTimeout(() => {
      setTasks(tasks.filter((_, i) => i !== index));
    }, 300);
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

      {/* ✅ Message motivant */}
      <Counter>{tasks.length} tâche(s) en cours. Garde le rythme ! 🚀</Counter>

      {/* 🏆 Section Ajouter/Modifier une tâche */}
      <Card>
        <h3>{editingIndex !== null ? "Modifier la tâche" : "Ajouter une nouvelle tâche"}</h3>
        <input
          type="text"
          className="form-control"
          placeholder="Écrire une tâche..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <CustomButton className="mt-3" onClick={addTask}>
          {editingIndex !== null ? "Modifier" : "Ajouter"}
        </CustomButton>
      </Card>

      {/* 📌 Liste des tâches */}
      <Card>
        <h3>Mes Tâches</h3>
        {tasks.length === 0 ? <p>Aucune tâche pour le moment.</p> : null}
        {tasks.map((task, index) => (
          <TaskItem
            key={index}
            completed={task.completed}
            style={{ animation: task.deleting ? `${fadeOut} 0.3s ease-in-out` : "" }}
          >
            <span onClick={() => toggleComplete(index)} style={{ cursor: "pointer" }}>
              {task.completed ? <s>{task.text}</s> : task.text}
            </span>
            <div>
              <ActionButton onClick={() => editTask(index)}><FaEdit /></ActionButton>
              <ActionButton delete onClick={() => deleteTask(index)}><FaTrash /></ActionButton>
            </div>
          </TaskItem>
        ))}
      </Card>
    </GradientBackground>
  );
}

export default App;
