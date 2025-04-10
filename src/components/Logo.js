import React from 'react';
import { Box, Typography } from '@mui/material';
import { styled } from '@mui/material/styles';

// Styled component for the QR code icon
const QrIcon = styled(Box)(({ theme }) => ({
  width: 24,
  height: 24,
  backgroundColor: '#F5A623', // Orange color
  position: 'relative',
  border: '2px solid #F5A623',
  '&::before, &::after': {
    content: '""',
    position: 'absolute',
    backgroundColor: 'white',
  },
  '&::before': {
    width: 8,
    height: 8,
    top: 2,
    left: 2,
  },
  '&::after': {
    width: 8,
    height: 8,
    bottom: 2,
    right: 2,
  },
}));

// Styled component for the logo text
const LogoText = styled(Typography)(({ theme }) => ({
  display: 'flex',
  alignItems: 'center',
  fontFamily: "'Poppins', sans-serif",
  fontWeight: 700,
  fontSize: '24px',
}));

const Safe = styled('span')(({ theme }) => ({
  color: 'black',
}));

const X = styled('span')(({ theme }) => ({
  color: '#F5A623', // Orange color for the 'X'
}));

const Code = styled('span')(({ theme }) => ({
  color: 'black',
}));

const SafeXCodeLogo = () => {
  return (
    <Box sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
      <QrIcon />
      <LogoText component="div">
        <Safe>Safe</Safe>
        <X>X</X>
        <Code>Code</Code>
      </LogoText>
    </Box>
  );
};

export default SafeXCodeLogo;