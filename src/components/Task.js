// src/components/Tasks.js
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AddTaskForm from './AddTaskForm';
import EditTaskForm from './EditTaskForm';
import '../index.css';

const Tasks = () => {
  const [tasks, setTasks] = useState([]);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(true);
  const [editingTaskId, setEditingTaskId] = useState(null);  // Track which task is in edit mode

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const token = localStorage.getItem('token');
        const response = await axios.get('http://localhost:8080/tasks', {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        });
        setTasks(response.data);
        setLoading(false);
      } catch (err) {
        setError('Failed to load tasks');
        setLoading(false);
      }
    };

    fetchTasks();
  }, []);

  const addTask = async (newTask) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/task',
        newTask,
        {
          headers: {
            'Content-Type': 'application/json',
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setTasks([...tasks, response.data]);
    } catch (err) {
      setError('Failed to add task');
    }
  };

  const deleteTask = async (id) => {
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:8080/task/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (err) {
      setError('Failed to delete task');
    }
  };

  const updateTask = async (updatedTask) => {
  try {
    const token = localStorage.getItem('token');
    
    // Send the entire updatedTask object, including the id, in the request body
    const response = await axios.put("http://localhost:8080/task", updatedTask, {
      headers: {
        'Content-Type': 'application/json',
        Authorization: `Bearer ${token}`,
      },
    });

    // Update the task in the tasks state with the server response
    setTasks(tasks.map((task) => (task.id === updatedTask.id ? response.data : task)));
    setEditingTaskId(null); // Close edit mode if applicable
  } catch (err) {
    setError('Failed to update task');
  }
};
  

  return (
    <div>
      <h2>Your Tasks</h2>

      {loading && <p>Loading tasks...</p>}

      <ul className="task-list">
        {tasks.length > 0 ? (
          tasks.map((task) =>
            editingTaskId === task.id ? (
              <EditTaskForm
                key={task.id}
                task={task}
                onUpdateTask={updateTask}
                cancelUpdate={() => setEditingTaskId(null)}
              />
            ) : (
              <li key={task.id} className="task-card">
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p>Status: {task.completed ? 'Completed' : 'Pending'}</p>
                <p>Created On: {new Date(task.createdDate).toLocaleString()}</p>
                <div className="task-buttons">
                  <button onClick={() => setEditingTaskId(task.id)}>Update</button>
                  <button onClick={() => deleteTask(task.id)}>Delete</button>
                </div>
              </li>
            )
          )
        ) : (
          <p>No tasks available</p>
        )}
      </ul>

      {error && <p style={{ color: 'red' }}>{error}</p>}

      <AddTaskForm onAddTask={addTask} />
    </div>
  );
};

export default Tasks;
