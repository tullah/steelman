import React from 'react';
import { AppBar, Toolbar, Button, Container, Avatar, Box, Typography } from '@mui/material';
import { Link } from 'react-router-dom';

const NavBar = () => {
  return (
    <AppBar position="static">
      <Container>
        <Toolbar disableGutters>
          <Box display="flex" alignItems="center">
            <Avatar alt="Steelman Logo" src="/static/images/avatar/1.jpg" />
            <Button color="inherit" component={Link} to="/" sx={{ ml: 2 }}>
              Home
            </Button>
          </Box>
          <Box display="flex" alignItems="center" sx={{ marginLeft: 'auto' }}>
            <Typography variant="body1" sx={{ mr: 2 }}>
              User Name
            </Typography>
            <Avatar alt="User Profile" src="/static/images/avatar/2.jpg" />
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};

export default NavBar;
