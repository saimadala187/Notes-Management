// src/components/EditTaskForm.js
import React, { useState } from 'react';

const EditTaskForm = ({ task, onUpdateTask, cancelUpdate }) => {
  const [title, setTitle] = useState(task.title);
  const [description, setDescription] = useState(task.description);
  const [completed, setCompleted] = useState(task.completed);

  const handleSubmit = (e) => {
    e.preventDefault();

    // Construct the complete updated task object
    const updatedTask = { 
      id: task.id,
      title,
      description,
      completed,
      createdDate: task.createdDate  // include createdDate if required
    };

    // Call the update function with the full task object
    onUpdateTask(updatedTask);
  };

  return (
    <form onSubmit={handleSubmit} className="edit-task-form">
      <input
        type="text"
        value={title}
        onChange={(e) => setTitle(e.target.value)}
        placeholder="Title"
      />
      <input
        type="text"
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Description"
      />
      <label>
        Status:
        <select
          value={completed ? 'completed' : 'pending'}
          onChange={(e) => setCompleted(e.target.value === 'completed')}
        >
          <option value="completed">Completed</option>
          <option value="pending">Pending</option>
        </select>
      </label>
      <button type="submit">Save</button>
      <button type="button" onClick={cancelUpdate}>
        Cancel
      </button>
    </form>
  );
};

export default EditTaskForm;
