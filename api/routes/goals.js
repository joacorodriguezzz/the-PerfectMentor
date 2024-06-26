// routes/goals.js
const express = require("express");
const router = express.Router();
const verifyToken = require("../middlewares/verifyToken");
const Goal = require("../models/goal");

// Ruta para agregar un nuevo objetivo
router.post("/add", verifyToken, async (req, res) => {
  const { title, description } = req.body;
  const menteeId = req.user.id;

  try {
    const newGoal = new Goal({ mentee: menteeId, title, description });
    await newGoal.save();
    res.status(201).json(newGoal);
  } catch (error) {
    console.error("Error creating goal:", error);
    res.status(500).json({ error: "Error creating goal" });
  }
});

// Ruta para obtener los objetivos de un mentee
router.get("/", verifyToken, async (req, res) => {
  const menteeId = req.user.id;

  try {
    const goals = await Goal.find({ mentee: menteeId });
    res.status(200).json(goals);
  } catch (error) {
    console.error("Error fetching goals:", error);
    res.status(500).json({ error: "Error fetching goals" });
  }
});

// Ruta para marcar un objetivo como completado
router.put("/complete/:goalId", verifyToken, async (req, res) => {
  const { goalId } = req.params;

  try {
    const goal = await Goal.findById(goalId);
    if (!goal) {
      return res.status(404).json({ error: "Goal not found" });
    }

    goal.completed = true;
    await goal.save();
    res.status(200).json(goal);
  } catch (error) {
    console.error("Error completing goal:", error);
    res.status(500).json({ error: "Error completing goal" });
  }
});

module.exports = router;
