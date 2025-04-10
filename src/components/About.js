import React from 'react';
import {
  Box,
  Container,
  Grid,
  Typography,
  Avatar,
  Paper,
  useTheme,
} from '@mui/material';
import { IoMdBulb } from 'react-icons/io';
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import profileImage from '../assets/profile.png';
import heroImg from '../assets/about-us-information-service-sharing-join-concept.jpg';
import sideimg from '../assets/businesspeople-meeting-office-working.jpg';

const teamMembers = [
  {
    image: profileImage,
    name: 'Vivek Kumar Yadav',
    position: 'Founder & CEO',
    text: 'Business Coach with over 8 years of experience in product building',
  },
  {
    image: profileImage,
    name: 'Sahil Verma',
    position: 'Co-Founder & CBO',
    text: 'Privacy advocate and former legal counsel specializing in data protection regulations.',
  },
  {
    image: profileImage,
    name: 'Ajay Kumar',
    position: 'Founder & CTO',
    text: 'Telecommunication specialist and software architect with a passion for secure communication.',
  },
];

function About() {
  const theme = useTheme();

  return (
    <Box>
      {/* Hero Section */}
      <Box
        sx={{
          backgroundImage: `url(${heroImg})`,
          height: 450,
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      />

      {/* About Section */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={6} alignItems="center">
          <Grid item xs={12} md={6}>
            <Typography
              variant="h4"
              sx={{ fontWeight: 'bold', fontSize: { xs: '2rem', md: '2.5rem' }, mb: 2 }}
            >
              Our Story
            </Typography>
            <Typography paragraph color="text.secondary">
              SafeXCode was founded in 2024 with a simple mission: to help people connect safely without compromising their privacy.
            </Typography>
            <Typography paragraph color="text.secondary">
              Our team of security experts and privacy advocates came together to create an innovative solution using QR code technology that allows people to share contact methods without revealing their actual phone numbers.
            </Typography>
            <Typography paragraph color="text.secondary">
              What started as a small idea has grown into a comprehensive privacy solution that serves thousands of users across multiple industries.
            </Typography>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              component="img"
              src={sideimg}
              alt="About SafeXCode"
              sx={{ width: '100%', borderRadius: 2, boxShadow: 3 }}
            />
          </Grid>
        </Grid>
      </Container>

      {/* Team Section */}
      <Container sx={{ py: 8 }}>
        <Typography
          variant="h4"
          sx={{ fontWeight: 'bold', fontSize: { xs: '2rem', md: '2.5rem' }, textAlign: 'center', mb: 6 }}
        >
          Our Team
        </Typography>
        <Grid container spacing={4} justifyContent="center">
          {teamMembers.map((member, index) => (
            <Grid item xs={12} sm={6} md={4} key={index}>
              <Paper elevation={4} sx={{ p: 4, borderRadius: 4, textAlign: 'center', height: '100%' }}>
                <Avatar
                  src={member.image}
                  alt={member.name}
                  sx={{ width: 112, height: 112, mx: 'auto', mb: 2 }}
                />
                <Typography variant="h6" fontWeight="bold">
                  {member.name}
                </Typography>
                <Typography variant="subtitle2" color="primary" gutterBottom>
                  {member.position}
                </Typography>
                <Typography color="text.secondary">{member.text}</Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      </Container>

      {/* Mission and Vision Section */}
      <Container sx={{ py: 8 }}>
        <Grid container spacing={4} alignItems="center">
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: theme.palette.primary.main,
                color: 'white',
                p: 4,
                borderRadius: 3,
                textAlign: 'center',
                minHeight: 250,
              }}
            >
              <IoMdBulb size={48} style={{ marginBottom: 16 }} />
              <Typography variant="h5" fontWeight="bold">
                Our Mission
              </Typography>
              <Typography mt={2}>
                To provide innovative privacy solutions that enable secure communication in an increasingly connected world, empowering individuals and businesses to protect their personal information while staying accessible.
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={12} md={6}>
            <Box
              sx={{
                backgroundColor: '#FB8C00',
                color: 'white',
                p: 4,
                borderRadius: 3,
                textAlign: 'center',
                minHeight: 250,
              }}
            >
              <MdOutlineRemoveRedEye size={48} style={{ marginBottom: 16 }} />
              <Typography variant="h5" fontWeight="bold">
                Our Vision
              </Typography>
              <Typography mt={2}>
                A world where communication is both seamless and secure, where people can connect without compromising their privacy, and where technology enhances safety in everyday interactions.
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Container>
    </Box>
  );
}

export default About;