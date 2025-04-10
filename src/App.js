import * as React from 'react';
import { useContext } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Header from './components/Header'
import Login from './components/Login';
import Signup from './components/Signup'
import About from './components/About'
import Privacy from './components/Privacy'
import Profile from './components/Profile';
import Payment from './components/Payment';
import { UserProvider } from './context/UserContext';
import { ToastContainer } from 'react-toastify';
import PaymentFailure from './components/PaymentFailure';
import PaymentSuccess from './components/PaymentSuccess';
import { UserContext } from './context/UserContext';
import Home from './components/Home';

function App() {
  return (
    <UserProvider>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Navigate to="/home" />} />
          <Route path="/home" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/about" element={<About />} />
          <Route path="/privacy" element={<Privacy />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/payment" element={<Payment />} />
          <Route path="/success" element={<PaymentSuccess />} />
          <Route path="/failure" element={<PaymentFailure />} />
        </Routes>
      </Router>
      <ToastContainer />
    </UserProvider>
  );
}

export default App;
