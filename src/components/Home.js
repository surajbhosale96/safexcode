import React from "react";
import {
  MdDeviceUnknown,
  MdOutlinePrivacyTip,
  MdQrCodeScanner,
} from "react-icons/md";
import heroImg from "../assets/heroimg.jpg";
import {
  Box,
  Typography,
  Button,
  Grid,
  Paper,
  Container,
} from "@mui/material";

const features = [
  {
    icon: <MdOutlinePrivacyTip color="blue" size={58} />,
    title: "Privacy Protection",
    text: "Connect without revealing your personal phone number",
  },
  {
    icon: <MdQrCodeScanner color="blue" size={58} />,
    title: "Easy QR Scanning",
    text: "Simple scan-to-call technology for instant connections",
  },
  {
    icon: <MdDeviceUnknown color="blue" size={58} />,
    title: "Anonymous Calling",
    text: "Communication with complete anonymity and peace of mind",
  },
];

const plans = [
  {
    title: "Basic Plan",
    price: "₹199",
    features: ["✅ 1 QR Code", "✅ Basic call forwarding", "✅ Email support"],
    popular: false,
    color: "primary",
  },
  {
    title: "Standard",
    price: "₹599",
    features: [
      "✅ 3 QR Codes",
      "✅ Advanced call forwarding",
      "✅ Priority email support",
      "✅ Call statistics",
    ],
    popular: true,
    color: "warning",
  },
  {
    title: "Premium",
    price: "₹999",
    features: [
      "✅ Unlimited QR Codes",
      "✅ Premium call forwarding",
      "✅ 24/7 phone support",
      "✅ Advanced analytics",
      "✅ Custom QR designs",
    ],
    popular: false,
    color: "primary",
  },
];

const Home = () => {
  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${heroImg})`,
          height: "400px",
          backgroundSize: "cover",
          backgroundPosition: "center",
          color: "white",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          textAlign: "center",
        }}
      >
        <Typography variant="h2" fontWeight="bold" mb={1}>
          SafeXCode
        </Typography>
        <Typography variant="h5" mb={2}>
          Safe and Secure Calling
        </Typography>
        <Typography variant="body1" fontSize={18}>
          Connect without compromising your privacy. Our QR code system <br />
          enables secure communication without revealing personal phone numbers.
        </Typography>
      </Box>

      {/* Features Section */}
      <Container sx={{ my: 10 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={2}>
          Why Choose SafeXCode
        </Typography>
        <Typography textAlign="center" color="gray">
          Our innovative QR code solution puts privacy and security first
        </Typography>

        <Grid container spacing={4} justifyContent="center" mt={4}>
          {features.map(({ icon, title, text }, index) => (
            <Grid item key={index}>
              <Paper elevation={3} sx={{ p: 4, textAlign: "center", borderRadius: 4 }}>
                {icon}
                <Typography variant="h5" fontWeight="bold" mt={2}>
                  {title}
                </Typography>
                <Typography color="gray" mt={1}>
                  {text}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Steps Section */}
      <Box sx={{ backgroundColor: "#f9f9f9", py: 8 }}>
        <Container>
          <Typography variant="h4" textAlign="center" fontWeight="bold" color="text.secondary">
            How It Works
          </Typography>

          <Grid container justifyContent="center" spacing={4} mt={4}>
            {[
              {
                number: "1",
                title: "Sign Up & Generate QR",
                text: "Create an account and receive your unique QR code",
              },
              {
                number: "2",
                title: "Place Your QR Code",
                text: "Display your QR code on vehicles, bags, bottles, or doors",
              },
              {
                number: "3",
                title: "Get Connected",
                text: "Others scan your QR code to call you without seeing your number",
              },
            ].map(({ number, title, text }, idx) => (
              <Grid item xs={12} md={3} key={idx}>
                <Box textAlign="center">
                  <Typography
                    variant="h4"
                    color="white"
                    sx={{
                      backgroundColor: "#1976d2",
                      borderRadius: "50%",
                      width: 60,
                      height: 60,
                      mx: "auto",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontWeight: "bold",
                    }}
                  >
                    {number}
                  </Typography>
                  <Typography fontWeight="bold" mt={2}>
                    {title}
                  </Typography>
                  <Typography color="text.secondary">{text}</Typography>
                </Box>
              </Grid>
            ))}
          </Grid>
        </Container>
      </Box>

      {/* Plans Section */}
      <Container sx={{ py: 8 }}>
        <Typography variant="h4" textAlign="center" fontWeight="bold" mb={1}>
          Subscription Plans
        </Typography>
        <Typography textAlign="center" color="gray" mb={4}>
          Choose the plan that fits your needs
        </Typography>

        <Grid container spacing={4} justifyContent="center">
          {plans.map((plan, index) => (
            <Grid item xs={12} md={3.5} key={index}>
              <Paper
                elevation={4}
                sx={{
                  p: 4,
                  textAlign: "center",
                  borderRadius: 4,
                  position: "relative",
                  border: plan.popular ? "2px solid #ffb300" : "none",
                }}
              >
                {plan.popular && (
                  <Box
                    sx={{
                      position: "absolute",
                      top: -12,
                      left: "50%",
                      transform: "translateX(-50%)",
                      bgcolor: "warning.main",
                      px: 2,
                      py: 0.5,
                      borderRadius: "16px",
                      color: "white",
                      fontWeight: "bold",
                      fontSize: 12,
                    }}
                  >
                    MOST POPULAR
                  </Box>
                )}
                <Typography variant="h5" fontWeight="bold" mt={plan.popular ? 4 : 0}>
                  {plan.title}
                </Typography>
                <Typography variant="h6" fontWeight="bold">
                  {plan.price}
                </Typography>
                <Typography color="gray" mb={2}>
                  per month
                </Typography>
                {plan.features.map((feat, i) => (
                  <Typography color="text.secondary" key={i}>
                    {feat}
                  </Typography>
                ))}
                <Button
                  variant="contained"
                  fullWidth
                  sx={{ mt: 3, bgcolor: plan.color + ".main", ":hover": { bgcolor: plan.color + ".dark" } }}
                >
                  Choose Plan
                </Button>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Box>
  );
};

export default Home;
