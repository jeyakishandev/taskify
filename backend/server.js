import express from "express";
import mysql from "mysql2";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Connexion à MySQL
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE,
});


db.connect((err) => {
  if (err) {
    console.error("❌ Erreur de connexion à MySQL :", err);
  } else {
    console.log("✅ Connecté à MySQL !");
  }
});

// 📌 Route pour récupérer toutes les tâches
app.get("/tasks", (req, res) => {
  db.query("SELECT * FROM tasks", (err, result) => {
    if (err) return res.status(500).send(err);
    res.json(result);
  });
});

// 📌 Route pour ajouter une tâche
app.post("/tasks", (req, res) => {
  const { text } = req.body;
  db.query("INSERT INTO tasks (text) VALUES (?)", [text], (err, result) => {
    if (err) return res.status(500).send(err);
    res.json({ id: result.insertId, text, completed: false });
  });
});

// 📌 Route pour marquer une tâche comme complétée
app.put("/tasks/:id", (req, res) => {
  const { id } = req.params;
  const { completed } = req.body;
  db.query("UPDATE tasks SET completed = ? WHERE id = ?", [completed, id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Tâche mise à jour !" });
  });
});

// 📌 Route pour supprimer une tâche
app.delete("/tasks/:id", (req, res) => {
  const { id } = req.params;
  db.query("DELETE FROM tasks WHERE id = ?", [id], (err) => {
    if (err) return res.status(500).send(err);
    res.json({ message: "Tâche supprimée !" });
  });
});
app.get("/", (req, res) => {
  res.send("🚀 API Taskify est en ligne !");
});

// Lancer le serveur
const PORT = process.env.PORT || 5001; 
app.listen(PORT, () => {
  console.log(`🚀 Serveur backend sur http://localhost:${PORT}`);
});


