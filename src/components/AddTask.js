// src/components/AddTask.js
import React from 'react';
import axios from 'axios';
import AddTaskForm from './AddTaskForm';
import { useNavigate } from 'react-router-dom';

const AddTask = () => {

    const navigate=useNavigate();
    const handleSubmit=(e)=>{
        e.preventDefault();

        navigate("/dashboard")
    }

  const addTask = async (newTask) => {
    try {
      const token = localStorage.getItem('token');
      const response = await axios.post(
        'http://localhost:8080/task',
        newTask,
        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      console.log('Task added:', response.data);
    } catch (err) {
      console.error('Failed to add task:', err);
    }
  };

  return ( <div>
  <AddTaskForm onAddTask={addTask} />
<button onClick={handleSubmit}>Go To Dashboard</button>
</div>
  );



};

export default AddTask;
