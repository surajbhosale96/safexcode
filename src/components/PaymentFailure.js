import React, { useEffect } from 'react';
import {
  collection,
  query,
  where,
  getDocs,
  doc,
  updateDoc
} from 'firebase/firestore';
import { db } from '../firebase';
import { useUser } from '../context/UserContext';
import { Typography, Container, Button, Box, Paper } from '@mui/material';
import { useNavigate, useLocation } from 'react-router-dom';
import ErrorOutlineIcon from '@mui/icons-material/ErrorOutline';
import { motion } from 'framer-motion';

function PaymentFailure() {
  const { user } = useUser();
  const navigate = useNavigate();
  const location = useLocation();

  const queryParams = new URLSearchParams(location.search);
  const errorMessage =
    queryParams.get("error_Message") || "Your payment could not be completed. Please try again.";

  const handleGoBackToPlans = () => {
    navigate("/payment");
  };

  useEffect(() => {
    const saveFailure = async () => {
      if (!user?.uid) return;

      try {
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.error("No matching user document found for uid:", user.uid);
          return;
        }

        const userDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, "users", userDoc.id), {
          isPaymentDone: false,
          paymentType: null,
        });

        console.log("Payment failure recorded in Firestore");

        localStorage.removeItem("selectedPaymentType");

      } catch (error) {
        console.error("Error updating user payment status:", error);
      }
    };

    saveFailure();
  }, [user]);

  return (
    <Container maxWidth="sm" sx={{ mt: 10 }}>
      <Paper
        elevation={6}
        sx={{
          p: 4,
          borderRadius: 4,
          textAlign: 'center',
          background: '#fff5f5',
          border: '1px solid #ffcdd2'
        }}
      >
        <motion.div
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ duration: 0.5 }}
        >
          <ErrorOutlineIcon sx={{ fontSize: 60, color: '#d32f2f' }} />
        </motion.div>

        <Typography variant="h4" color="error" gutterBottom sx={{ mt: 2 }}>
          Payment Failed
        </Typography>

        <Typography variant="body1" color="text.secondary" sx={{ mt: 1 }}>
          {errorMessage}
        </Typography>

        <Button
          variant="contained"
          color="secondary"
          sx={{ mt: 4, borderRadius: '30px', px: 4 }}
          onClick={handleGoBackToPlans}
        >
          Go Back to Plans
        </Button>
      </Paper>
    </Container>
  );
}

export default PaymentFailure;
