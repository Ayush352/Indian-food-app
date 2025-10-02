
import React, { useState } from 'react';
import axios from 'axios';
import { Link, useNavigate } from 'react-router-dom';


export default function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await axios.post('/api/auth/login', { username, password });
      localStorage.setItem('token', res.data.token);
      if (onLogin) onLogin();
      navigate('/home');
    } catch (err) {
      setError(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div style={{ minHeight: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', background: '#f5f6fa' }}>
      <form onSubmit={handleSubmit} style={{ background: 'white', padding: 32, borderRadius: 12, boxShadow: '0 2px 16px #0001', minWidth: 320 }}>
        <h2 style={{ textAlign: 'center', marginBottom: 24, color: '#1976d2' }}>Login</h2>
        <input
          value={username}
          onChange={e => setUsername(e.target.value)}
          placeholder="Username"
          style={{ width: '100%', padding: 10, marginBottom: 16, borderRadius: 6, border: '1px solid #ccc' }}
        />
        <input
          type="password"
          value={password}
          onChange={e => setPassword(e.target.value)}
          placeholder="Password"
          style={{ width: '100%', padding: 10, marginBottom: 16, borderRadius: 6, border: '1px solid #ccc' }}
        />
        <button type="submit" style={{ width: '100%', padding: 10, background: '#1976d2', color: 'white', border: 'none', borderRadius: 6, fontWeight: 'bold', marginBottom: 8 }}>
          Login
        </button>
        <div style={{ textAlign: 'center', marginBottom: 8 }}>
          <span>New User? </span>
          <Link to="/signup" style={{ color: '#1976d2', textDecoration: 'underline' }}>Sign up</Link>
        </div>
        {error && <div style={{ color: 'red', textAlign: 'center' }}>{error}</div>}
      </form>
    </div>
  );
}
