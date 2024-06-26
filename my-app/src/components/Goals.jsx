// components/GoalItem.jsx
import React from "react";

const GoalItem = ({ goal, onComplete }) => {
  return (
    <div className={`goal-item ${goal.completed ? "completed" : ""}`}>
      <h3>{goal.title}</h3>
      <p>{goal.description}</p>
      <button onClick={() => onComplete(goal._id)}>Mark as Completed</button>
    </div>
  );
};

export default GoalItem;
