import React from 'react';
import { Link } from 'react-router-dom';

const Dashboard = () => {
  return (
    <div style={styles.dashboardContainer}>
      <h2>Welcome to the Dashboard</h2>
      <div style={styles.cardContainer}>
        <div style={styles.card}>
          <h3>Tasks</h3>
          <p>View your current tasks</p>
          <Link to="/tasks" style={styles.link}>Go to Tasks</Link>
        </div>
        <div style={styles.card}>
          <h3>Add Task</h3>
          <p>Create a new task</p>
          <Link to="/add-task" style={styles.link}>Add Task</Link>
        </div>
      </div>
    </div>
  );
};

const styles = {
  dashboardContainer: {
    textAlign: 'center',
    padding: '20px',
  },
  cardContainer: {
    display: 'flex',
    justifyContent: 'space-around',
    marginTop: '20px',
  },
  card: {
    width: '200px',
    padding: '20px',
    border: '1px solid #ccc',
    borderRadius: '8px',
    boxShadow: '0 2px 5px rgba(0, 0, 0, 0.1)',
  },
  link: {
    color: 'blue',
    textDecoration: 'none',
    marginTop: '10px',
    display: 'block',
  }
};

export default Dashboard;
