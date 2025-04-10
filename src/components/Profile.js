import React, { useEffect, useState } from 'react';
import {
  Container,
  Typography,
  CircularProgress,
  Card,
  CardContent,
  Grid,
  Avatar,
  Chip,
  Box,
  Grow,
  Button,
  useMediaQuery,
} from '@mui/material';
import { useUser } from '../context/UserContext';
import { collection, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { useNavigate } from 'react-router-dom';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import CancelIcon from '@mui/icons-material/Cancel';
import { useTheme } from '@mui/material/styles';

const Profile = () => {
  const { user } = useUser();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  useEffect(() => {
    if (!user?.uid) {
      navigate('/login');
      return;
    }

    const fetchUserData = async () => {
      try {
        const usersRef = collection(db, 'users');
        const q = query(usersRef, where('uid', '==', user.uid));
        const snapshot = await getDocs(q);

        if (!snapshot.empty) {
          setUserData(snapshot.docs[0].data());
        }
      } catch (err) {
        console.error('Error fetching user data:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, navigate]);

  if (loading) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <CircularProgress />
      </Container>
    );
  }

  if (!userData) {
    return (
      <Container sx={{ mt: 10, textAlign: 'center' }}>
        <Typography variant="h6">No user data found.</Typography>
      </Container>
    );
  }

  return (
    <Container maxWidth="md" sx={{ mt: isMobile ? 4 : 10 }}>
      <Grow in timeout={500}>
        <Card
          sx={{
            borderRadius: 4,
            boxShadow: 4,
            overflow: 'hidden',
            bgcolor: '#fff',
          }}
        >
          <Box
            sx={{
              px: 3,
              py: 3,
              background: 'linear-gradient(to right, #ff9800, #ffb74d)',
              color: 'white',
              display: 'flex',
              alignItems: 'center',
              gap: 2,
              flexDirection: isMobile ? 'column' : 'row',
              textAlign: isMobile ? 'center' : 'left',
            }}
          >
            <Avatar sx={{ bgcolor: '#fff', color: '#ff9800', width: 60, height: 60, fontSize: 28 }}>
              {userData.name?.[0]?.toUpperCase() || 'U'}
            </Avatar>
            <Box>
              <Typography variant="h5" fontWeight="bold">
                {userData.name}
              </Typography>
              <Typography variant="body2" sx={{ opacity: 0.9 }}>
                Welcome to your profile!
              </Typography>
            </Box>
          </Box>

          <CardContent>
            <Grid container spacing={3}>
              <Grid item xs={12} sm={6}>
                <Typography color="textSecondary">Email:</Typography>
                <Typography fontWeight="bold">{userData.email}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography color="textSecondary">Phone:</Typography>
                <Typography fontWeight="bold">{userData.phoneNumber}</Typography>
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography color="textSecondary">Payment Status:</Typography>
                {userData.isPaymentDone ? (
                  <Chip
                    icon={<CheckCircleIcon />}
                    label="Payment Done"
                    color="success"
                    variant="outlined"
                    sx={{ mt: 1 }}
                  />
                ) : (
                  <>
                    <Chip
                      icon={<CancelIcon />}
                      label="Payment Pending"
                      color="error"
                      variant="outlined"
                      sx={{ mt: 1 }}
                    />
                    <Box sx={{ mt: 2 }}>
                      <Button
                        variant="contained"
                        color="warning"
                        onClick={() => navigate('/payment')}
                      >
                        Complete Payment
                      </Button>
                    </Box>
                  </>
                )}
              </Grid>

              <Grid item xs={12} sm={6}>
                <Typography color="textSecondary">Plan:</Typography>
                <Chip
                  label={userData.paymentType || 'N/A'}
                  color="primary"
                  variant="filled"
                  sx={{ mt: 1 }}
                />
              </Grid>

              <Grid item xs={12}>
                <Typography variant="h6" sx={{ mt: 2, mb: 1 }}>
                  Address Details 📍
                </Typography>
                <Box sx={{ pl: 2 }}>
                  <Typography><strong>Address:</strong> {userData.address || 'N/A'}</Typography>
                  <Typography><strong>City:</strong> {userData.city || 'N/A'}</Typography>
                  <Typography><strong>State:</strong> {userData.state || 'N/A'}</Typography>
                  <Typography><strong>Pin Code:</strong> {userData.pinCode || 'N/A'}</Typography>
                </Box>
              </Grid>
            </Grid>
          </CardContent>
        </Card>
      </Grow>
    </Container>
  );
};

export default Profile;
