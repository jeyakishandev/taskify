# 📌 Taskify - Gestionnaire de Tâches Moderne  

> Un projet inspiré d’un tutoriel YouTube, adapté et amélioré pour renforcer mes compétences en développement web full-stack.

---

## 🚀 Présentation  

**Taskify** est une application web simple et efficace permettant de gérer ses tâches quotidiennes.  
Ce projet m’a permis de pratiquer et d'approfondir mes connaissances en **développement web full-stack**, en utilisant des technologies modernes comme **React, Node.js et MySQL**.

L'objectif de cette application est de proposer une interface fluide et interactive pour :
- Ajouter des tâches 📝
- Modifier une tâche ✏️
- Marquer une tâche comme terminée ✅
- Supprimer une tâche ❌

---

## 🛠️ Technologies utilisées  

### **Frontend :**  
- ⚛️ **React.js** – Librairie JavaScript pour créer une interface utilisateur réactive.  
- 🎨 **Tailwind CSS** – Framework CSS pour styliser l’application rapidement.  
- ✨ **Framer Motion** – Bibliothèque d'animations pour ajouter des transitions fluides.  
- 🎵 **Gestion des sons** – Ajout de sons interactifs (ajout, suppression).  

### **Backend :**  
- 🚀 **Node.js & Express.js** – Création d’une API REST pour gérer les tâches.  
- 🛢️ **MySQL** – Base de données relationnelle pour stocker les tâches.  
- 🔐 **CORS & Dotenv** – Sécurisation et gestion des variables d’environnement.  

---

## 🎯 Fonctionnalités  

✅ Ajouter une tâche avec un effet interactif.  
✅ Modifier une tâche existante.  
✅ Marquer une tâche comme terminée ou en cours.  
✅ Supprimer une tâche avec une animation et un son de confirmation.  
✅ Stockage des tâches dans une base de données MySQL.  
✅ Interface fluide et animée avec React et Framer Motion.  
✅ Responsive Design avec Tailwind CSS.  

---

## 📂 Installation et Exécution  

### 1️⃣ **Cloner le projet**  

```bash
git clone git@github.com:jeyakishandev/taskify.git
cd taskify
```
### 2️⃣ **Installation du backend**  
```bash
cd backend
npm install
```
### 3️⃣ **Configuration des variables d'environnement**
```
PORT=5001
DB_HOST=localhost
DB_USER=root
DB_PASSWORD=ton_mot_de_passe
DB_NAME=taskify
```

### 4️⃣ **Configuration des variables d'environnement**
```
npm start
```
### 5️⃣ **Configuration des variables d'environnement**
```
cd ../frontend
npm install
```
### 6️⃣ **Configuration des variables d'environnement**
```
VITE_API_URL=http://localhost:5001
```
### 7️⃣ **Démarrer le frontend**
```
npm run dev
```
L'application sera accessible sur http://localhost:5173