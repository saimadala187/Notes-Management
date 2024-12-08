import React, { useState } from 'react';
import axios from 'axios';
import '../index.css'; // Import external CSS for styling
import { useNavigate } from 'react-router-dom';

function Register() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false); // Loading state to show a spinner while submitting
  const [error, setError] = useState(''); // State for handling errors
const navigate=useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError('');

    try {
      await axios.post('http://localhost:8080/register', { username, password });
      
      setUsername('');
      setPassword('');
      navigate('/')
    } catch (error) {
      setError('Registration failed, please try again');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="register-container">
      <h2>Create an Account</h2>
      <form onSubmit={handleSubmit} className="register-form">
        <div className="input-group">
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            className="input-field"
            required
          />
        </div>
        <div className="input-group">
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            className="input-field"
            required
          />
        </div>

        {error && <p className="error-message">{error}</p>}

        <button type="submit" className="submit-button" disabled={loading}>
          {loading ? 'Registering...' : 'Register'}
        </button>
      </form>
    </div>
  );
}

export default Register;
