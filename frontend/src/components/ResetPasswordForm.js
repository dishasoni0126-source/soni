import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import { Lock } from '@mui/icons-material';
import axios from 'axios';

function ResetPasswordForm({ token, setCurrentForm }) {
  const [formData, setFormData] = useState({ newPassword: '', confirmPassword: '' });
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    if (formData.newPassword !== formData.confirmPassword) {
      setError('Passwords do not match');
      return;
    }
    try {
      await axios.post('https://soni-backend.onrender.com/api/auth/reset-password', {
        token,
        newPassword: formData.newPassword,
      });
      setSuccess('Password reset successful!');
      setCurrentForm('login');
    } catch (err) {
      setError(err.response?.data?.message || 'Password reset failed');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        Reset Password
      </Typography>
      {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
      {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
      <TextField
        margin="normal"
        required
        fullWidth
        name="newPassword"
        label="New Password"
        type="password"
        id="newPassword"
        autoComplete="new-password"
        autoFocus
        value={formData.newPassword}
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
        label="Confirm New Password"
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
        sx={{ mt: 3, mb: 2, background: 'linear-gradient(45deg, #4CAF50 30%, #8BC34A 90%)' }}
      >
        Reset Password
      </Button>
      <Typography variant="body2" className="link" onClick={() => setCurrentForm('login')} sx={{ textAlign: 'center' }}>
        Back to Sign In
      </Typography>
    </Box>
  );
}

export default ResetPasswordForm;
