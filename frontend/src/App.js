import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import styled from "styled-components";

// 🎨 Styled Components
const TaskContainer = styled.div`
  max-width: 500px;
  margin: 20px auto;
  padding: 20px;
  background: white;
  border-radius: 8px;
  box-shadow: 0px 4px 10px rgba(0, 0, 0, 0.1);
`;

const TaskItem = styled.div`
  display: flex;
  justify-content: space-between;
  align-items: center;
  padding: 10px;
  margin-top: 5px;
  border-radius: 5px;
  background: ${(props) => (props.completed ? "#d4edda" : "#fff")};
  border-left: 5px solid ${(props) => (props.completed ? "#28a745" : "#007bff")};
  transition: 0.3s;
`;

const Button = styled.button`
  border: none;
  padding: 5px 10px;
  cursor: pointer;
  font-size: 14px;
  border-radius: 4px;
  font-weight: bold;
  transition: 0.3s;
  ${(props) =>
    props.delete
      ? "background: #dc3545; color: white;"
      : "background: #28a745; color: white;"}

  &:hover {
    opacity: 0.8;
  }
`;

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");

  // Ajouter une tâche
  const addTask = () => {
    if (newTask.trim() === "") return;
    setTasks([...tasks, { text: newTask, completed: false }]);
    setNewTask("");
  };

  // Marquer une tâche comme complétée
  const toggleComplete = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].completed = !updatedTasks[index].completed;
    setTasks(updatedTasks);
  };

  // Supprimer une tâche
  const deleteTask = (index) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <div className="container text-center mt-5">
      <h1 className="text-primary">Taskify 📝</h1>

      {/* 🏆 Section Ajouter une tâche */}
      <TaskContainer>
        <h3>Ajouter une nouvelle tâche</h3>
        <input
          type="text"
          className="form-control"
          placeholder="Écrire une tâche..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button className="btn btn-primary mt-3" onClick={addTask}>
          Ajouter
        </button>
      </TaskContainer>

      {/* 📌 Liste des tâches */}
      <TaskContainer>
        <h3>Mes Tâches</h3>
        {tasks.length === 0 ? <p>Aucune tâche pour le moment.</p> : null}
        {tasks.map((task, index) => (
          <TaskItem key={index} completed={task.completed}>
            <span onClick={() => toggleComplete(index)} style={{ cursor: "pointer" }}>
              {task.completed ? <s>{task.text}</s> : task.text}
            </span>
            <div>
              <Button onClick={() => toggleComplete(index)}>
                {task.completed ? "✅" : "✔"}
              </Button>
              <Button delete onClick={() => deleteTask(index)}>❌</Button>
            </div>
          </TaskItem>
        ))}
      </TaskContainer>
    </div>
  );
}

export default App;

