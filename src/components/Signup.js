import React, { useEffect, useState } from 'react';
import {
  TextField,
  Button,
  Box,
  Typography,
  MenuItem,
  Container,
  InputAdornment,
  Fade
} from '@mui/material';
import CheckCircleIcon from '@mui/icons-material/CheckCircle';
import { v4 as uuidv4 } from 'uuid';
import { useNavigate, useLocation } from 'react-router-dom';
import { collection, addDoc, query, where, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import indiaData from '../states-and-districts.json';
import { useUser } from '../context/UserContext';
import Paper from '@mui/material/Paper';

function Signup() {
  const location = useLocation();
  const prefilledMobile = location?.state?.mobileNumber || '';
  const [name, setName] = useState('');
  const [surName, setSurName] = useState('');
  const [email, setEmail] = useState('');
  const [emailVerified, setEmailVerified] = useState(false);
  const [pincode, setPincode] = useState('');
  const [state, setState] = useState('');
  const [district, setDistrict] = useState('');
  const [mobileNumber, setMobileNumber] = useState(prefilledMobile);
  const [address, setAddress] = useState('');
  const [stateList, setStateList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();
  const { login } = useUser();

  useEffect(() => {
    if (indiaData?.states) {
      setStateList(indiaData.states.map((s) => s.state));
    }
  }, []);

  useEffect(() => {
    if (state) {
      const selected = indiaData.states.find((s) => s.state === state);
      setDistrictList(selected ? selected.districts : []);
      setDistrict('');
    }
  }, [state]);

  const validate = () => {
    let tempErrors = {};
    tempErrors.name = name ? '' : 'First name is required';
    tempErrors.surName = surName ? '' : 'Last name is required';
    tempErrors.email = /^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)
      ? ''
      : 'Enter a valid email';
    tempErrors.pincode = /^[0-9]{6}$/.test(pincode)
      ? ''
      : '6-digit Pincode required';
    tempErrors.state = state ? '' : 'State is required';
    tempErrors.district = district ? '' : 'District is required';
    tempErrors.address = address ? '' : 'Address is required';
    tempErrors.mobileNumber = /^[0-9]{10}$/.test(mobileNumber)
      ? ''
      : 'Enter a valid 10-digit number';
    setErrors(tempErrors);
    return Object.values(tempErrors).every((x) => x === '');
  };

  const checkEmailInFirestore = async (emailToCheck) => {
    if (!emailToCheck) return;
    const q = query(collection(db, 'users'), where('email', '==', emailToCheck));
    const snapshot = await getDocs(q);
    if (snapshot.empty) {
      setEmailVerified(true);
      setErrors((prev) => ({ ...prev, email: '' }));
    } else {
      setEmailVerified(false);
      setErrors((prev) => ({
        ...prev,
        email: 'Email already registered. Please use another.',
      }));
    }
  };

  useEffect(() => {
    if (email) checkEmailInFirestore(email);
  }, [email]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate() || !emailVerified) return;

    const uid = uuidv4();
    const userData = {
      uid,
      name,
      surName,
      email,
      emailVerified,
      firebaseUid: uid,
      phoneNumber: mobileNumber,
      phoneVerified: false,
      profilePhoto:
        'https://firebasestorage.googleapis.com/v0/b/spenzabeta-74e04.appspot.com/o/images%2Fuser.png?alt=media&token=dc1f756f-b9a7-44b2-9c1a-d98ae5376a85',
      isActive: true,
      provider: 'mobileNumber',
      push_token: '',
      state,
      city: district,
      address,
      pinCode: pincode,
      zipCode: '',
      createdAt: new Date().toISOString(),
      createdBy: 'self',
      tempEmail: `temp_${mobileNumber}@tempuser.com`,
      totalActiveCodes: 1,
      userHash: '',
      vehicleCode: '',
    };

    try {
      await addDoc(collection(db, 'users'), userData);
      login(userData);
      navigate('/payment');
    } catch (error) {
      console.error('Error saving user:', error);
    }
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 5 }}>
      <Paper
        elevation={6}
        sx={{
          backdropFilter: 'blur(8px)',
          borderRadius: 4,
          p: 4,
          background: 'linear-gradient(135deg, #fdfbfb 0%, #ebedee 100%)',
          boxShadow: '0 8px 24px rgba(0,0,0,0.1)',
        }}
      >
        <Typography variant="h4" fontWeight="bold" align="center" gutterBottom>
          Join Us
        </Typography>
        <Typography
          variant="subtitle1"
          align="center"
          sx={{ mb: 3, color: 'gray' }}
        >
          Create an account to unlock premium access
        </Typography>
        <Box
          component="form"
          onSubmit={handleSubmit}
          sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}
        >
          <TextField
            label="First Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            fullWidth
            error={!!errors.name}
            helperText={errors.name}
          />
          <TextField
            label="Last Name"
            value={surName}
            onChange={(e) => setSurName(e.target.value)}
            fullWidth
            error={!!errors.surName}
            helperText={errors.surName}
          />
          <TextField
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            fullWidth
            error={!!errors.email}
            helperText={errors.email}
            InputProps={{
              endAdornment: (
                <Fade in={emailVerified}>
                  <InputAdornment position="end">
                    <CheckCircleIcon color="success" />
                  </InputAdornment>
                </Fade>
              ),
            }}
          />
          <TextField
            label="Mobile Number"
            value={mobileNumber}
            onChange={(e) => setMobileNumber(e.target.value)}
            fullWidth
            error={!!errors.mobileNumber}
            helperText={errors.mobileNumber}
          />
          <TextField
            label="Pincode"
            value={pincode}
            onChange={(e) => setPincode(e.target.value)}
            fullWidth
            error={!!errors.pincode}
            helperText={errors.pincode}
          />
          <TextField
            label="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            fullWidth
            multiline
            rows={2}
            error={!!errors.address}
            helperText={errors.address}
          />
          <TextField
            select
            label="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
            fullWidth
            error={!!errors.state}
            helperText={errors.state}
          >
            {stateList.map((s) => (
              <MenuItem key={s} value={s}>
                {s}
              </MenuItem>
            ))}
          </TextField>
          <TextField
            select
            label="District"
            value={district}
            onChange={(e) => setDistrict(e.target.value)}
            fullWidth
            disabled={!state}
            error={!!errors.district}
            helperText={errors.district}
          >
            {districtList.map((d) => (
              <MenuItem key={d} value={d}>
                {d}
              </MenuItem>
            ))}
          </TextField>
          <Button
            variant="contained"
            type="submit"
            fullWidth
            sx={{
              mt: 2,
              py: 1.5,
              fontWeight: 'bold',
              background: 'linear-gradient(90deg, #4e54c8, #8f94fb)',
              '&:hover': {
                background: 'linear-gradient(90deg, #4348b1, #7e83e7)',
              },
            }}
          >
            Create Account
          </Button>
        </Box>
      </Paper>
    </Container>
  );
}

export default Signup;
