import React, { useState } from 'react';
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  Container,
  Fade
} from '@mui/material';
import { useUser } from '../context/UserContext';
import SHA512 from 'crypto-js/sha512';

const merchantKey = 'oTq3Pd';
const salt = 'rjiU3f5AV0VzUG4FSkQRmQwBb2n4XXbi';

const plans = [
  {
    title: '6 Months Plan',
    price: 2,
    duration: '6 Months',
    gstInfo: 'Including 18% GST',
  },
  {
    title: '1 Year Plan',
    price: 2,
    duration: '12 Months',
    gstInfo: 'Including 18% GST',
  },
];

const generatePayUHash = ({ key, txnid, amount, productinfo, firstname, email }) => {
  const hashString = `${key}|${txnid}|${amount}|${productinfo}|${firstname}|${email}|||||||||||${salt}`;
  return SHA512(hashString).toString();
};

function Payment() {
  const [selectedPlan, setSelectedPlan] = useState(null);
  const { user } = useUser();

  const handleSelect = (plan) => {
    setSelectedPlan(plan);
    const txnid = `txn_${Date.now()}`;
    const amount = plan.price;
    const productinfo = plan.title;
    const firstname = user?.name || 'User';
    const email = user?.email || 'test@example.com';
    const phone = user?.phoneNumber || '9999999999';
    const paymentType = plan.duration === '6 Months' ? '6months' : '1Year';
    localStorage.setItem('selectedPaymentType', paymentType);

    const hash = generatePayUHash({
      key: merchantKey,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
    });

    const payUFormDetails = {
      key: merchantKey,
      txnid,
      amount,
      productinfo,
      firstname,
      email,
      phone,
      surl: 'https://us-central1-safecode-001.cloudfunctions.net/payuSuccessRedirect',
      furl: 'https://us-central1-safecode-001.cloudfunctions.net/payuFailureRedirect',
      hash,
      service_provider: 'payu_paisa',
    };

    const form = document.createElement('form');
    form.action = 'https://secure.payu.in/_payment';
    form.method = 'POST';

    Object.entries(payUFormDetails).forEach(([key, value]) => {
      const input = document.createElement('input');
      input.type = 'hidden';
      input.name = key;
      input.value = value;
      form.appendChild(input);
    });

    document.body.appendChild(form);
    form.submit();
  };

  return (
    <Box
      sx={{
        minHeight: '100vh',
        background: 'linear-gradient(135deg, #eef2f3 0%, #8e9eab 100%)',
        py: 8,
      }}
    >
      <Container maxWidth="md">
        <Box textAlign="center" mb={6}>
          <Typography variant="h3" fontWeight="bold" gutterBottom>
            Unlock Premium Access
          </Typography>
          <Typography variant="subtitle1" color="textSecondary">
            Choose a subscription plan that fits your needs and get started instantly
          </Typography>
        </Box>

        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid item xs={12} md={5} key={plan.title}>
              <Fade in timeout={500 + index * 200}>
                <Card
                  sx={{
                    borderRadius: 4,
                    p: 3,
                    background: selectedPlan?.title === plan.title
                      ? 'linear-gradient(135deg, #4e54c8 0%, #8f94fb 100%)'
                      : 'white',
                    color: selectedPlan?.title === plan.title ? 'white' : 'black',
                    boxShadow: selectedPlan?.title === plan.title
                      ? '0 8px 24px rgba(78,84,200,0.4)'
                      : '0 6px 20px rgba(0,0,0,0.1)',
                    transition: '0.3s ease',
                    '&:hover': {
                      transform: 'scale(1.03)',
                      boxShadow: '0 10px 28px rgba(0,0,0,0.15)',
                    },
                  }}
                >
                  <CardContent>
                    <Typography variant="h5" fontWeight="bold" gutterBottom>
                      {plan.title}
                    </Typography>
                    <Typography variant="h3" fontWeight="bold" gutterBottom>
                      ₹{plan.price}
                    </Typography>
                    <Typography variant="subtitle1" gutterBottom>
                      {plan.duration}
                    </Typography>
                    <Typography variant="body2" gutterBottom>
                      {plan.gstInfo}
                    </Typography>
                    <Button
                      variant={selectedPlan?.title === plan.title ? 'outlined' : 'contained'}
                      color="inherit"
                      fullWidth
                      sx={{
                        mt: 3,
                        fontWeight: 'bold',
                        background: selectedPlan?.title === plan.title ? 'white' : '#212121',
                        color: selectedPlan?.title === plan.title ? '#4e54c8' : 'white',
                        '&:hover': {
                          background: selectedPlan?.title === plan.title ? '#f5f5f5' : '#000',
                        },
                      }}
                      onClick={() => handleSelect(plan)}
                    >
                      {selectedPlan?.title === plan.title ? 'Selected' : 'Choose Plan'}
                    </Button>
                  </CardContent>
                </Card>
              </Fade>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
}

export default Payment;
