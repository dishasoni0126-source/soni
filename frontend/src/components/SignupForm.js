import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import { Email, Lock } from '@mui/icons-material';
import axios from 'axios';

function SignupForm({ setCurrentForm }) {
  const [formData, setFormData] = useState({ email: '', password: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (formData.password !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      const response = await axios.post('https://soni-backend.onrender.com/api/auth/signup', {
        email: formData.email,
        password: formData.password,
      });
      setSuccess('Signup successful!');
      localStorage.setItem('token', response.data.token);
      // Optionally redirect or update state
    } catch (err) {
      setError(err.response?.data?.message || 'Signup failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        Sign Up
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <TextField
        margin="normal"
        required
        fullWidth
        id="email"
        label="Email Address"
        name="email"
        autoComplete="email"
        autoFocus
        value={formData.email}
        onChange={handleChange}
        InputProps={{
          startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />,
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="password"
        label="Password"
        type="password"
        id="password"
        autoComplete="new-password"
        value={formData.password}
        onChange={handleChange}
        InputProps={{
          startAdornment: <Lock sx={{ mr: 1, color: 'action.active' }} />,
        }}
      />
      <TextField
        margin="normal"
        required
        fullWidth
        name="confirmPassword"
        label="Confirm Password"
        type="password"
        id="confirmPassword"
        autoComplete="new-password"
        value={formData.confirmPassword}
        onChange={handleChange}
        InputProps={{
          startAdornment: <Lock sx={{ mr: 1, color: 'action.active' }} />,
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, background: 'linear-gradient(45deg, #2196F3 30%, #21CBF3 90%)' }}
      >
        Sign Up
      </Button>
      <Typography variant="body2" className="link" onClick={() => setCurrentForm('login')} sx={{ textAlign: 'center' }}>
        Already have an account? Sign In
      </Typography>
    </Box>
  );
}

export default SignupForm;
