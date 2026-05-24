import express from "express";
import cors from "cors";
import path from "path";
import { fileURLToPath } from "url";

const app = express();
const PORT = 3000;

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

app.use(cors());
app.use(express.json());
app.use(express.static(path.join(__dirname, "public")));

app.get("/api/tasks", (req, res) => {
  res.json({ status: "success", message: "taskflow API is running" });
});
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});

