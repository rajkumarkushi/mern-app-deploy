import React, { useState, useEffect } from "react";
import axios from "axios";
import TaskList from "./components/TaskList";
import Users from "./components/Users";


function App() {
  const [tasks, setTasks] = useState([]);
  const [title, setTitle] = useState("");

  const API = process.env.REACT_APP_API_URL;

  const fetchTasks = async () => {
    const res = await axios.get(`${API}/tasks`);
    setTasks(res.data);
  };

  const addTask = async () => {
    if (!title.trim()) return;
    await axios.post(`${API}/tasks`, { title });
    setTitle("");
    fetchTasks();
  };

  const toggleTask = async (id) => {
    await axios.put(`${API}/tasks/${id}`);
    fetchTasks();
  };

  const deleteTask = async (id) => {
    await axios.delete(`${API}/tasks/${id}`);
    fetchTasks();
  };

  useEffect(() => { fetchTasks(); }, []);

  return (
    <div style={{ textAlign: "center", marginTop: "50px" }}>
      <h1>Rajkumar Enduri</h1>

      <h1>📝 Task Manager</h1>
      <input
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Enter new task"
      />
      <button onClick={addTask}>Add</button>
      <TaskList tasks={tasks} toggleTask={toggleTask} deleteTask={deleteTask} />

      <Users />
    </div>
  );
}
 
export default App;
