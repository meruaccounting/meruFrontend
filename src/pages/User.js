// react components
import React, { useState } from 'react';

// material ui comppnents
import { Box, CssBaseline } from '@mui/material';

// user components
import Sidebar from '../components/Clients/Sidebar';
import Main from '../components/Clients/Main';
import PageHeader from '../components/Projects/PageHeader';

// -------------------------------------------------------------------------------------------------------

// styles
const rootBox = {
  width: '95%',
  margin: 'auto',
  height: '70vh',
};
const innerBox = {
  height: '78vh',
  width: '100%',
  display: 'flex',
  backgroundColor: '#fdfdff',
  // backgroundColor: 'red',
};

export default function User() {
  const [clientId, setclientId] = useState(null);

  return (
    <Box sx={rootBox} disableGutters>
      <CssBaseline />
      <PageHeader title="Clients" />
      <Box sx={innerBox}>
        {/* -------- sidebar components--------- */}
        <Sidebar setclientId={(id) => setclientId(id)}/>
        {/* ----------------------------
          Right side component with full information
          -----------------------------------*/}
        <Main clientId={clientId} />
      </Box>
    </Box>
  );
}
