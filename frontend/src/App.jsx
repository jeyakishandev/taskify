import React, { useState } from "react";
import { FaTrash, FaEdit } from "react-icons/fa";

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
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-r from-blue-500 to-purple-600 p-6">
      <h1 className="text-white text-4xl font-bold mb-6">Taskify 📝</h1>

      {/* Section Ajouter/Modifier une tâche */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md text-center">
        <h3 className="text-xl font-semibold mb-3">{editingIndex !== null ? "Modifier la tâche" : "Ajouter une nouvelle tâche"}</h3>
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
          {editingIndex !== null ? "Modifier" : "Ajouter"}
        </button>
      </div>

      {/* Liste des tâches */}
      <div className="bg-white p-6 rounded-lg shadow-lg w-full max-w-md mt-6">
        <h3 className="text-xl font-semibold mb-3">Mes Tâches</h3>
        {tasks.length === 0 ? <p className="text-gray-500">Aucune tâche pour le moment.</p> : null}
        {tasks.map((task, index) => (
          <div
            key={index}
            className={`flex justify-between items-center p-3 rounded-md mb-2 transition transform ${task.completed ? "bg-green-200" : "bg-gray-100"} ${task.deleting ? "scale-90 opacity-50" : "scale-100"}`}
          >
            <span
              onClick={() => toggleComplete(index)}
              className={`cursor-pointer ${task.completed ? "line-through text-gray-500" : "text-black"}`}
            >
              {task.text}
            </span>
            <div className="flex">
              <button className="text-blue-500 hover:text-blue-700 mr-2" onClick={() => editTask(index)}>
                <FaEdit />
              </button>
              <button className="text-red-500 hover:text-red-700" onClick={() => deleteTask(index)}>
                <FaTrash />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

export default App;
