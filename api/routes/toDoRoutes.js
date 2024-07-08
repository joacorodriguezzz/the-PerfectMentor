const express = require("express");
const router = express.Router();
const User = require("../models/user");

// Obtener tareas de un usuario específico
router.get("/:userId", async (req, res) => {
  const { userId } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.status(200).json(user.toDo);
  } catch (error) {
    console.error("Error getting user ToDo:", error);
    res.status(500).json({ message: "Failed to get user ToDo" });
  }
});

// Agregar una tarea a la lista de un usuario
router.post("/:userId", async (req, res) => {
  const { userId } = req.params;
  const { task } = req.body;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    user.toDo.push(task);
    await user.save();
    res.status(201).json({ message: "Task added successfully", task });
  } catch (error) {
    console.error("Error adding task:", error);
    res.status(500).json({ message: "Failed to add task" });
  }
});

// Eliminar una tarea de la lista de un usuario
router.delete("/:userId/:taskText", async (req, res) => {
  const { userId, taskText } = req.params;
  try {
    const user = await User.findById(userId);
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    const taskIndex = user.toDo.indexOf(taskText);
    if (taskIndex === -1) {
      return res.status(404).json({ message: "Task not found" });
    }
    user.toDo.splice(taskIndex, 1);
    await user.save();
    res.status(200).json({ message: "Task deleted successfully" });
  } catch (error) {
    console.error("Error deleting task:", error);
    res.status(500).json({ message: "Failed to delete task" });
  }
});

module.exports = router;
