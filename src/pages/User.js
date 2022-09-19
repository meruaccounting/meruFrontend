// react components
import React, { useState } from 'react';

// material ui comppnents
import { Box, CssBaseline, Container } from '@mui/material';

// user components
import Sidebar from '../components/Clients/Sidebar';
import Main from '../components/Clients/Main';
import ClientInfo from '../components/Clients/ClientInfo';
import PageHeader from '../components/Projects/PageHeader';
import NoClientSelected from '../components/Clients/NoClientSelected';

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
  // store
  const [clientId, setclientId] = useState(null);
  const [isChange, setIsChange] = useState(false);

  // Call back to set clientID and to determine changes
  const callBackFucntion = (id) => {
    setclientId(id);
    setIsChange(!isChange);
  };

  return (
    <Box sx={rootBox} disableGutters>
      <CssBaseline />
      <PageHeader title="Clients" />
      <Box sx={innerBox}>
        {/* -------- sidebar components--------- */}
        <Sidebar setclientId={callBackFucntion} change={isChange} />
        {/* ----------------------------
          Right side component with full information
          -----------------------------------*/}
        {clientId ? (
          <Container sx={{ width: '70%', paddingX: 2 }} disableGutters>
            {/*  ----------------------------------------------------------
              to display client Information 
            ------------------------------------------------------------- */}
            <ClientInfo clientId={clientId} setClientId={callBackFucntion} />
            <Main clientId={clientId} />
          </Container>
        ) : (
          <NoClientSelected />
        )}
      </Box>
    </Box>
  );
}
