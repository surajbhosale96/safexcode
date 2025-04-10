import * as React from 'react';
import { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import AppBar from '@mui/material/AppBar';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import Box from '@mui/material/Box';
import Drawer from '@mui/material/Drawer';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogActions from '@mui/material/DialogActions';
import { UserContext } from '../context/UserContext';
import Logoimage from '../assets/logo-color01.png';

function Header() {
  const [mobileOpen, setMobileOpen] = useState(false);
  const [logoutDialogOpen, setLogoutDialogOpen] = useState(false);
  const { user, logout } = useContext(UserContext);
  const navigate = useNavigate();

  const handleDrawerToggle = () => {
    setMobileOpen(!mobileOpen);
  };

  const confirmLogout = () => {
    setLogoutDialogOpen(true);
  };

  const handleLogout = () => {
    logout();
    navigate('/login');
    setLogoutDialogOpen(false);
  };

  const cancelLogout = () => {
    setLogoutDialogOpen(false);
  };

  const signedInNavItems = [
    { text: 'Home', href: '/home' },
    { text: 'Profile', href: '/profile' },
    { text: 'About', href: '/about' },
    { text: 'Privacy', href: '/privacy' }
  ];

  const guestNavItems = [
    { text: 'Home', href: '/home' },
    { text: 'Sign In', href: '/login' },
    { text: 'About', href: '/about' },
    { text: 'Privacy', href: '/privacy' }
  ];

  const drawer = (
    <Box onClick={handleDrawerToggle} sx={{ textAlign: 'center' }}>
      <Box
        component="img"
        src={Logoimage}
        alt="Responsive Image"
        sx={{ width: '60%', maxHeight: 40, objectFit: 'cover' }}
      />
      {user && (
        <Typography variant="subtitle1" sx={{ mt: 1 }}>
          Hi, {user.name} 👋
        </Typography>
      )}
      <List>
        {(user ? signedInNavItems : guestNavItems).map((item) => (
          <ListItem button key={item.text} onClick={() => navigate(item.href)}>
            <ListItemText primary={item.text} />
          </ListItem>
        ))}
        {user && (
          <ListItem button onClick={confirmLogout}>
            <ListItemText primary="Logout" />
          </ListItem>
        )}
      </List>
    </Box>
  );

  return (
    <Box sx={{ flexGrow: 1 }}>
      <AppBar position="static" sx={{ backgroundColor: '#ffffff', boxShadow: 'none', borderBottom: '1px solid #eee' }}>
        <Toolbar>
          <IconButton
            color="inherit"
            aria-label="open drawer"
            edge="start"
            onClick={handleDrawerToggle}
            sx={{ mr: 2, display: { sm: 'none' }, color: '#000' }}
          >
            <MenuIcon />
          </IconButton>

          <Box sx={{ flexGrow: 1, display: 'flex', alignItems: 'center' }}>
            <Box sx={{ display: { xs: 'none', sm: 'flex' }, alignItems: 'center' }}>
              <Box
                component="img"
                src={Logoimage}
                alt="Responsive Image"
                sx={{ width: '60%', maxHeight: 40, objectFit: 'cover' }}
              />
              {user && (
                <Typography variant="subtitle1" sx={{ ml: 2, color: '#000' }}>
                  Hi, {user.name} 👋
                </Typography>
              )}
            </Box>
          </Box>

          <Box sx={{ display: { xs: 'flex', sm: 'none' }, ml: 'auto' }}>
            <Box
              component="img"
              src={Logoimage}
              alt="Responsive Image"
              sx={{ width: '100%', maxHeight: 40, objectFit: 'cover' }}
            />
          </Box>

          <Box sx={{ display: { xs: 'none', sm: 'block' } }}>
            {(user ? signedInNavItems : guestNavItems).map((item) => (
              <Button
                key={item.text}
                color="inherit"
                onClick={() => navigate(item.href)}
                sx={{ mx: 1, color: '#000000', fontWeight: 500 }}
              >
                {item.text}
              </Button>
            ))}
            {user && (
              <Button onClick={confirmLogout} color="inherit" sx={{ mx: 1, color: '#000000', fontWeight: 500 }}>
                Logout
              </Button>
            )}
          </Box>
        </Toolbar>
      </AppBar>

      <Drawer
        variant="temporary"
        open={mobileOpen}
        onClose={handleDrawerToggle}
        ModalProps={{ keepMounted: true }}
        sx={{
          display: { xs: 'block', sm: 'none' },
          '& .MuiDrawer-paper': { boxSizing: 'border-box', width: 240 },
        }}
      >
        {drawer}
      </Drawer>

      {/* Logout Confirmation Dialog */}
      <Dialog open={logoutDialogOpen} onClose={cancelLogout}>
        <DialogTitle>Are you sure you want to log out?</DialogTitle>
        <DialogActions>
          <Button onClick={cancelLogout} color="primary">
            No
          </Button>
          <Button onClick={handleLogout} color="error" autoFocus>
            Yes
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}

export default Header;
