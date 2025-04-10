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
import { Typography, Container } from '@mui/material';

function PaymentSuccess() {
  const { user } = useUser();

  useEffect(() => {
    const saveSuccess = async () => {
      const paymentType = localStorage.getItem('selectedPaymentType'); // e.g., "6months" or "1year"

      if (!user?.uid || !paymentType) {
        console.error("Missing user or payment type");
        return;
      }

      try {
        // Get the user document by matching 'uid' field in Firestore
        const usersRef = collection(db, "users");
        const q = query(usersRef, where("uid", "==", user.uid));
        const querySnapshot = await getDocs(q);

        if (querySnapshot.empty) {
          console.error("No matching user document found for uid:", user.uid);
          return;
        }

        const userDoc = querySnapshot.docs[0];
        await updateDoc(doc(db, "users", userDoc.id), {
          isPaymentDone: true,
          paymentType: paymentType,
        });

        console.log("Payment success recorded in Firestore");

        localStorage.removeItem("selectedPaymentType");
      } catch (error) {
        console.error("Error updating user payment status:", error);
      }
    };

    saveSuccess();
  }, [user]);

  return (
    <Container sx={{ mt: 10 }}>
      <Typography variant="h4" align="center" color="primary">
        Payment Successful ✅
        You can continue using mobile application.
      </Typography>
     
    </Container>
  );
}

export default PaymentSuccess;
