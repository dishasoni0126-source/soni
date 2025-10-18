import React, { useState } from 'react';
import { Container, Typography, Box, Paper } from '@mui/material';
import LoginForm from './components/LoginForm';
import SignupForm from './components/SignupForm';
import ForgotPasswordForm from './components/ForgotPasswordForm';
import ResetPasswordForm from './components/ResetPasswordForm';

function App() {
  const [currentForm, setCurrentForm] = useState('login'); // 'login', 'signup', 'forgot', 'reset'
  const [resetToken, setResetToken] = useState('');

  const renderForm = () => {
    switch (currentForm) {
      case 'signup':
        return <SignupForm setCurrentForm={setCurrentForm} />;
      case 'forgot':
        return <ForgotPasswordForm setCurrentForm={setCurrentForm} setResetToken={setResetToken} />;
      case 'reset':
        return <ResetPasswordForm token={resetToken} setCurrentForm={setCurrentForm} />;
      default:
        return <LoginForm setCurrentForm={setCurrentForm} />;
    }
  };

  return (
    <Container component="main" maxWidth="sm">
      <Box
        sx={{
          marginTop: 8,
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
        }}
      >
        <Paper
          elevation={10}
          sx={{
            padding: 4,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            backgroundColor: 'rgba(255, 255, 255, 0.9)',
            borderRadius: 2,
          }}
          className="form-container"
        >
          <Typography component="h1" variant="h4" sx={{ mb: 2, color: '#333' }}>
            MERN Auth App
          </Typography>
          <Box sx={{ mt: 1, width: '100%' }}>
            {renderForm()}
          </Box>
        </Paper>
      </Box>
    </Container>
  );
}

export default App;
