import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import Container from '@mui/material/Container';
import Logo from './../images/logo.jpg'

const ResponsiveAppBar = () => {
  

  return (
    <AppBar position="static">
      <Container maxWidth="xl">
        <Toolbar disableGutters>

            <img src={Logo} style={{height:70, width:70}} alt='LOGO'></img>

         
          <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' } }}>

          </Box>

          <Box sx={{ flexGrow: 1 }}>
          <Typography
            
            variant="h4"
            component="div"
          >
            EzLogs
          </Typography>
            
            
          </Box>
        </Toolbar>
      </Container>
    </AppBar>
  );
};
export default ResponsiveAppBar;



// import React from "react";

// const Navbar = () => {
//   return (
    
//     <nav className="navbar">
//       <h2>Welcome to EzLogs</h2>
//     </nav>
  
  
  
//   );
// };

// export default Navbar;
