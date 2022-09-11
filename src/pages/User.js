// react components
import React from 'react';

// material ui comppnents
import { Container, Box, Typography } from '@mui/material';

// user components
import Sidebar from '../components/Clients/Sidebar';
import Main from '../components/Clients/Main';

// -------------------------------------------------------------------------------------------------------

// styles

const User = () => {
  return (
    <Container sx={{}} disableGutters>
      <Typography
        variant="h3"
        sx={{
          color: '#637381',
          fontSize: '1.5rem',
          fontWeight: '700',
        }}
      >
        CLIENTS
      </Typography>
      <Container sx={{ marginTop: 3 }} disableGutters>
        <Box sx={{ display: 'flex', padding: 0, margin: 0 }}>
          {/* -------- sidebar components--------- */}
          
          <Sidebar />
          {/* ----------------------------
          Right side component with full information
          -----------------------------------*/}
          <Main />
        </Box>
      </Container>
    </Container>
  );
};

export default User;
