import React, { useState, useEffect } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faCheckCircle,
  faTimesCircle,
} from "@fortawesome/free-solid-svg-icons";
import axios from "axios";
import SideBar from "../components/SideBar";

const ToDoList = () => {
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState("");
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    fetchUserId();
  }, []);

  useEffect(() => {
    if (userId) {
      fetchTasks();
    }
  }, [userId]);

  const fetchUserId = async () => {
    try {
      const response = await axios.get("http://localhost:3001/api/userData", {
        withCredentials: true,
      });
      setUserId(response.data._id); // Asegúrate de obtener el ID del usuario correctamente
    } catch (error) {
      console.error("Error fetching user ID:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await axios.get(
        `http://localhost:3001/api/toDo/${userId}`,
        {
          withCredentials: true,
        }
      );
      const fetchedTasks = response.data.map((task) => ({
        text: task,
        done: false,
      }));
      setTasks(fetchedTasks);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const addTask = async () => {
    if (newTask.trim() !== "") {
      try {
        await axios.post(
          `http://localhost:3001/api/toDo/${userId}`,
          { task: newTask },
          {
            withCredentials: true,
            headers: {
              "Content-Type": "application/json",
            },
          }
        );
        setTasks([...tasks, { text: newTask, done: false }]);
        setNewTask("");
      } catch (error) {
        console.error("Error adding task:", error);
      }
    }
  };

  const toggleTask = async (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);

    try {
      // Aquí puedes realizar la lógica adicional que necesites al marcar una tarea como completada
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const deleteTask = async (index) => {
    const updatedTasks = [...tasks];
    const taskToDelete = updatedTasks[index].text;
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);

    try {
      await axios.delete(
        `http://localhost:3001/api/toDo/${userId}/${taskToDelete}`,
        {
          withCredentials: true,
        }
      );
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  return (
    <div className="flex flex-col min-h-screen w-full bg-customGreen md:flex-row">
      <SideBar />
      <div className="flex-grow p-4 bg-customGreen md:p-8">
        <div className="h-full p-4 mx-4 my-4 bg-white rounded-3xl shadow-gray-600 shadow-xl md:mx-8 md:my-8 md:p-8 md:h-[92%] w-full md:w-auto">
          <h2 className="mb-4 text-xl font-bold md:text-2xl">ToDo List</h2>
          <textarea
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task..."
            className="w-full h-16 px-3 py-2 border rounded-lg resize-none"
          />
          <button
            onClick={addTask}
            className="px-4 py-2 mt-2 font-semibold text-white bg-blue-500 rounded-lg"
          >
            Add Task
          </button>
          <ul className="mt-4">
            {tasks.map((task, index) => (
              <li
                key={index}
                className={`flex items-center justify-between p-2 mb-2 bg-gray-100 rounded-lg ${
                  task.done ? "line-through text-gray-500" : ""
                }`}
              >
                <span className="flex-grow ml-2">{task.text}</span>
                <div>
                  <FontAwesomeIcon
                    icon={faCheckCircle}
                    className={`cursor-pointer text-green-500 ${
                      task.done ? "opacity-50" : "hover:text-green-700"
                    }`}
                    onClick={() => toggleTask(index)}
                  />
                  <FontAwesomeIcon
                    icon={faTimesCircle}
                    className="ml-2 text-red-500 cursor-pointer hover:text-red-700"
                    onClick={() => deleteTask(index)}
                  />
                </div>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default ToDoList;
