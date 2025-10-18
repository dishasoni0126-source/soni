import React, { useState } from 'react';
import { TextField, Button, Typography, Box, Alert } from '@mui/material';
import { Email } from '@mui/icons-material';
import axios from 'axios';

function ForgotPasswordForm({ setCurrentForm, setResetToken }) {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');
    try {
      const response = await axios.post('/api/auth/forgot-password', { email });
      setSuccess('Reset token sent! Check your email (or console for demo).');
      setResetToken(response.data.resetToken); // For demo, set token directly
      setCurrentForm('reset');
    } catch (err) {
      setError(err.response?.data?.message || 'Failed to send reset email');
    }
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ mt: 1 }}>
      <Typography component="h2" variant="h5" sx={{ mb: 2 }}>
        Forgot Password
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
        value={email}
        onChange={(e) => setEmail(e.target.value)}
        InputProps={{
          startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />,
        }}
      />
      <Button
        type="submit"
        fullWidth
        variant="contained"
        sx={{ mt: 3, mb: 2, background: 'linear-gradient(45deg, #FF9800 30%, #FFC107 90%)' }}
      >
        Send Reset Link
      </Button>
      <Typography variant="body2" className="link" onClick={() => setCurrentForm('login')} sx={{ textAlign: 'center' }}>
        Back to Sign In
      </Typography>
    </Box>
  );
}

export default ForgotPasswordForm;
