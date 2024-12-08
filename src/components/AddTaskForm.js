import React, { useState } from 'react';
import '../index.css';  // Link to the CSS file for styling

const AddTaskForm = ({ onAddTask }) => {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completed, setCompleted] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      completed,
      createdDate: new Date().toISOString(),
    };

    onAddTask(newTask);
    setTitle('');
    setDescription('');
    setCompleted(false);
  };

  return (
    <form onSubmit={handleSubmit} className="add-task-form">
      <h3>Add New Task</h3>
      <label>
        Title:
        <input 
          type="text" 
          value={title} 
          onChange={(e) => setTitle(e.target.value)} 
          required 
        />
      </label>
      <label>
        Description:
        <textarea 
          value={description} 
          onChange={(e) => setDescription(e.target.value)} 
          required 
        />
      </label>
      <label>
        Status:
        <select 
          value={completed} 
          onChange={(e) => setCompleted(e.target.value === 'true')}
        >
          <option value="false">Pending</option>
          <option value="true">Completed</option>
        </select>
      </label>
      <button type="submit">Add Task</button>
    </form>
  );
};

export default AddTaskForm;
