import React, { useState, useContext } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  Paper,
  CircularProgress,
} from '@mui/material';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { UserContext } from '../context/UserContext';
import { motion } from 'framer-motion'; // 💥 Animation

function Login() {
  const [mobileNumber, setMobileNumber] = useState('');
  const [otp, setOtp] = useState('');
  const [sentOtp, setSentOtp] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useContext(UserContext);

  const handleSendOTP = async () => {
    if (!/^[0-9]{10}$/.test(mobileNumber)) {
      setError('Please enter a valid 10-digit mobile number');
      return;
    }
    setError('');
    setLoading(true);
    const generatedOtp = Math.floor(100000 + Math.random() * 900000);

    try {
      const response = await axios.get(
        `https://www.fast2sms.com/dev/bulkV2?authorization=OsaJknN4b1loQ7kK64sYGvCpGvZxiI1OZaSOnjTyJs8cjMsIxFMWOG10ddxG&route=dlt&sender_id=CARSHL&message=181448&variables_values=${generatedOtp}&numbers=${mobileNumber}`
      );
      if (response.data.return) {
        setSentOtp(generatedOtp);
        toast.success('OTP sent!');
      } else {
        setError('Failed to send OTP.');
      }
    } catch (err) {
      console.error(err);
      setError('Error sending OTP.');
    } finally {
      setLoading(false);
    }
  };

  const handleVerifyOTP = async () => {
    if (!otp) {
      setError('Please enter the OTP');
      return;
    }
    if (parseInt(otp) !== sentOtp) {
      setError('Invalid OTP');
      return;
    }

    try {
      const q = query(collection(db, 'users'), where('phoneNumber', '==', mobileNumber));
      const snapshot = await getDocs(q);

      if (!snapshot.empty) {
        const userData = snapshot.docs[0].data();
        login(userData);
        toast.success('Login successful!');

        if (userData.isPaymentDone) {
          navigate('/profile');
        } else {
          navigate('/payment');
        }
      } else {
        navigate('/signup', { state: { mobileNumber } });
      }
    } catch (err) {
      console.error(err);
      setError('Login error');
    }
  };

  return (
    <Box
      sx={{
        minHeight: '60vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        py: { xs: 4, sm: 6, md: 8 }, // responsive padding top/bottom
        boxSizing: 'border-box',
      }}
    >
      {/* Logo + Heading */}
      <motion.div
        initial={{ opacity: 0, y: -30 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 1 }}
        style={{ textAlign: 'center', marginBottom: '20px' }}
      >
        <Box sx={{ fontSize: 48 }}>🛡️</Box> {/* Logo Icon - you can replace this with your own logo */}
        <Typography variant="h4" fontWeight="bold" color="primary">
          Welcome to SafeXCode
        </Typography>
      </motion.div>

      {/* Login Card */}
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: '20px',
          maxWidth: 400,
          width: '100%',
          textAlign: 'center',
          backdropFilter: 'blur(10px)',
          background: 'rgba(255, 255, 255, 0.85)',
          boxShadow: '0px 8px 24px rgba(0, 0, 0, 0.1)',
        }}
      >
        <Typography variant="h6" fontWeight="600" mb={3}>
          Sign in with your mobile number
        </Typography>

        {!sentOtp ? (
          <>
            <TextField
              label="Mobile Number"
              variant="outlined"
              fullWidth
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              error={!!error}
              helperText={error}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleSendOTP}
              disabled={loading}
              sx={{ borderRadius: '12px', fontWeight: 'bold', py: 1.5 }}
            >
              {loading ? <CircularProgress size={24} color="inherit" /> : 'Send OTP'}
            </Button>
          </>
        ) : (
          <>
            <TextField
              label="Enter OTP"
              variant="outlined"
              fullWidth
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              error={!!error}
              helperText={error}
              sx={{ mb: 2 }}
            />
            <Button
              variant="contained"
              fullWidth
              size="large"
              onClick={handleVerifyOTP}
              sx={{ borderRadius: '12px', fontWeight: 'bold', py: 1.5 }}
            >
              Verify OTP
            </Button>
          </>
        )}
      </Paper>
    </Box>
  );
}

export default Login;
