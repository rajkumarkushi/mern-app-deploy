import express from "express";
import Task from "../models/Task.js";

const router = express.Router();

// ✅ Get all tasks
router.get("/", async (req, res) => {
  try {
    const tasks = await Task.find();
    res.json(tasks);
  } catch (error) {
    console.error("GET /tasks Error:", error.message);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});

// ✅ Add new task
router.post("/", async (req, res) => {
  try {
    const { title } = req.body;
    if (!title) {
      return res.status(400).json({ message: "Title is required" });
    }
    const newTask = new Task({ title });
    await newTask.save();
    res.json(newTask);
  } catch (error) {
    console.error("POST /tasks Error:", error.message);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});

// ✅ Toggle completion
router.put("/:id", async (req, res) => {
  try {
    const task = await Task.findById(req.params.id);
    if (!task) return res.status(404).json({ message: "Task not found" });

    task.completed = !task.completed;
    await task.save();
    res.json(task);
  } catch (error) {
    console.error("PUT /tasks Error:", error.message);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});

// ✅ Delete task
router.delete("/:id", async (req, res) => {
  try {
    await Task.findByIdAndDelete(req.params.id);
    res.json({ message: "Task deleted" });
  } catch (error) {
    console.error("DELETE /tasks Error:", error.message);
    res.status(500).json({ message: "Server Error: " + error.message });
  }
});

export default router;
