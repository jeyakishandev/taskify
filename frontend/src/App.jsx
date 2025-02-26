import React, { useState, useEffect } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";
import { motion, AnimatePresence } from "framer-motion";

// Fonction pour jouer un son
const playSound = (url) => {
  const audio = new Audio(url);
  audio.play();
};

// Fonction pour vibrer (si supporté par l'appareil)
const vibrate = () => {
  if (navigator.vibrate) {
    navigator.vibrate(100);
  }
};

function App() {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [editingId, setEditingId] = useState(null);

  // 🔥 Charger les tâches depuis le **backend**
  useEffect(() => {
    fetch("http://localhost:5001/tasks")
      .then((res) => res.json())
      .then((data) => setTasks(data))
      .catch((err) => console.error("❌ Erreur chargement tâches :", err));
  }, []);

  // ✅ Ajouter une tâche (Backend + Frontend)
  const addTask = () => {
    if (newTask.trim() === "") return;

    if (editingId !== null) {
      // ✏️ Modifier une tâche
      fetch(`http://localhost:5001/tasks/${editingId}`, {
        method: "PUT",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ completed: false, text: newTask }),
      })
        .then(() => {
          setTasks(tasks.map((t) => (t.id === editingId ? { ...t, text: newTask } : t)));
          setEditingId(null);
          setNewTask("");
        })
        .catch((err) => console.error("❌ Erreur mise à jour :", err));
    } else {
      // ➕ Ajouter une tâche
      fetch("http://localhost:5001/tasks", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ text: newTask }),
      })
        .then((res) => res.json())
        .then((newTaskFromServer) => {
          setTasks([...tasks, newTaskFromServer]);
          setNewTask("");
        })
        .catch((err) => console.error("❌ Erreur ajout :", err));
    }
  };

  // ✅ Marquer une tâche comme complétée
  const toggleComplete = (id, completed) => {
    fetch(`http://localhost:5001/tasks/${id}`, {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ completed: !completed }),
    })
      .then(() => {
        setTasks(tasks.map((task) => (task.id === id ? { ...task, completed: !completed } : task)));
      })
      .catch((err) => console.error("❌ Erreur completion :", err));
  };

  // 🗑️ Supprimer une tâche (Backend + Animation)
  const deleteTask = (id) => {
    playSound("/delete.mp3");
    vibrate();

    fetch(`http://localhost:5001/tasks/${id}`, { method: "DELETE" })
      .then(() => {
        setTasks(tasks.filter((task) => task.id !== id));
      })
      .catch((err) => console.error("❌ Erreur suppression :", err));
  };

  // ✏️ Modifier une tâche
  const editTask = (id, text) => {
    setNewTask(text);
    setEditingId(id);
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <h1 className="text-white text-4xl font-bold mb-6">Taskify 📝</h1>

      {/* 🔥 Compteur de tâches */}
      <div className="text-white mb-4">
        <p>📌 Tâches actives : {tasks.filter((t) => !t.completed).length}</p>
        <p>✅ Tâches complétées : {tasks.filter((t) => t.completed).length}</p>
      </div>

      {/* 📝 Ajouter une tâche */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h3 className="text-xl font-semibold mb-3">{editingId ? "Modifier" : "Ajouter"} une tâche</h3>
        <input
          type="text"
          className="w-full p-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-400"
          placeholder="Écrire une tâche..."
          value={newTask}
          onChange={(e) => setNewTask(e.target.value)}
        />
        <button
          className="mt-3 w-full bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition duration-300"
          onClick={addTask}
        >
          {editingId ? "Modifier" : "Ajouter"}
        </button>
      </div>

      {/* 📋 Liste des tâches */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-6">
        <h3 className="text-xl font-semibold mb-3">Mes Tâches</h3>
        {tasks.length === 0 ? <p className="text-gray-500">Aucune tâche pour le moment.</p> : null}

        <AnimatePresence>
          {tasks.map((task) => (
            <motion.div
              key={task.id}
              initial={{ opacity: 0, y: -10 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -10 }}
              transition={{ duration: 0.3 }}
              className={`flex justify-between items-center p-3 rounded-md mb-2 transition transform ${
                task.completed ? "bg-green-200" : "bg-gray-100"
              }`}
            >
              <span
                onClick={() => toggleComplete(task.id, task.completed)}
                className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : "text-black"}`}
              >
                {task.text}
              </span>
              <div className="flex">
                <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => editTask(task.id, task.text)}>
                  <FaEdit />
                </button>
                <button className="text-red-500 hover:text-red-700" onClick={() => deleteTask(task.id)}>
                  <FaTrash />
                </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>
    </div>
  );
}

export default App;
