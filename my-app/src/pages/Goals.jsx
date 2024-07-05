// pages/GoalsPage.jsx
import React, { useState, useEffect } from "react";
import axios from "axios";
import Cookies from "js-cookie";
import GoalItem from "../components/Goals";
import SideBar from "../components/SideBar";

export default function GoalsPage() {
  const [goals, setGoals] = useState([]);
  const [newGoal, setNewGoal] = useState({ title: "", description: "" });

  useEffect(() => {
    const fetchGoals = async () => {
      const token = Cookies.get("authToken");
      try {
        const response = await axios.get("http://localhost:3001/api/goals", {
          headers: { Authorization: `Bearer ${token}` },
        });
        setGoals(response.data);
      } catch (error) {
        console.error("Error fetching goals:", error);
      }
    };

    fetchGoals();
  }, []);

  const handleAddGoal = async () => {
    const token = Cookies.get("authToken");
    try {
      const response = await axios.post(
        "http://localhost:3001/api/goals/add",
        newGoal,
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGoals([...goals, response.data]);
      setNewGoal({ title: "", description: "" });
    } catch (error) {
      console.error("Error adding goal:", error);
    }
  };

  const handleCompleteGoal = async (goalId) => {
    const token = Cookies.get("authToken");
    try {
      await axios.put(
        `http://localhost:3001/api/goals/complete/${goalId}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setGoals(
        goals.map((goal) =>
          goal._id === goalId ? { ...goal, completed: true } : goal
        )
      );
    } catch (error) {
      console.error("Error completing goal:", error);
    }
  };

  return (
    <div className="goals-page">
      <h1>My Goals</h1>
      <SideBar />
      <div className="add-goal">
        <input
          type="text"
          placeholder="Title"
          value={newGoal.title}
          onChange={(e) => setNewGoal({ ...newGoal, title: e.target.value })}
        />
        <input
          type="text"
          placeholder="Description"
          value={newGoal.description}
          onChange={(e) =>
            setNewGoal({ ...newGoal, description: e.target.value })
          }
        />
        <button onClick={handleAddGoal}>Add Goal</button>
      </div>
      <div className="goals-list">
        {goals.map((goal) => (
          <GoalItem
            key={goal._id}
            goal={goal}
            onComplete={handleCompleteGoal}
          />
        ))}
      </div>
    </div>
  );
}
