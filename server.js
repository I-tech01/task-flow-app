import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";
import fs from "fs";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

function readTasks() {
  const data = fs.readFileSync(tasksFile, 'utf-8');
  return JSON.parse(data);
}
function writeTasks(tasks) {
  fs.writeFileSync(tasksFile, JSON.stringify(tasks, null, 2));
}

app.get('/api/tasks', (req, res) => {
  const tasks = readTasks();
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const tasks = readTasks();
  const newTask = {
    id: Date.now(),
    title: req.body.title,
    completed: false
  };
   tasks.push(newTask);
  writeTasks(tasks);

  res.json(newTask);
});

app.put('/api/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const id = Number(req.params.id);

  const updatedTasks = tasks.map(task =>
    task.id === id ? { ...task, ...req.body } : task
  );

   writeTasks(updatedTasks);

  res.json({ message: 'Task updated' });
});

app.delete('/api/tasks/:id', (req, res) => {
  const tasks = readTasks();
  const id = Number(req.params.id);

  const filtered = tasks.filter(task => task.id !== id);
  writeTasks(filtered);

  res.json({ message: 'Task deleted' });
});


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

