// react components
import React, { useEffect, useState } from 'react';

// material ui comppnents
import { Box, CssBaseline, Container, Typography } from '@mui/material';

// user components
import Sidebar from '../components/Clients/Sidebar';
import Main from '../components/Clients/Main';
import ClientInfo from '../components/Clients/ClientInfo';
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

  // store
  const [clientId, setclientId] = useState(null);
  const [isChange, setIsChange] = useState(false);

  // Call back to set clientID and to determine changes
  const callBackFucntion = (id) => {
    setclientId(id);
    setIsChange(!isChange);
  }

  return (
    <Box sx={rootBox} disableGutters>
      <CssBaseline />
      <PageHeader title="Clients" />
      <Box sx={innerBox}>
        {/* -------- sidebar components--------- */}
        <Sidebar setclientId={callBackFucntion} change = {isChange} />
        {/* ----------------------------
          Right side component with full information
          -----------------------------------*/}
        {clientId ? (
          <Container sx={{ width: '70%', paddingX: 2 }} disableGutters>
            {/*  ----------------------------------------------------------
              to display client Information 
            ------------------------------------------------------------- */}
            <ClientInfo clientId={clientId} setClientId={callBackFucntion}/>
            <Main clientId={clientId} />
          </Container>
        ) : (
          <Container
            sx={{ width: '70%', padding: 'auto', display: 'flex', justifyContent: 'center', alignItems: 'center'}}
            disableGutters
          >
            <Typography sx={{ marginTop: 2, fontWeight: 'bold' }} variant="h3">
              NO CLIENT SELECTED
            </Typography>
          </Container>
        )}
      </Box>
    </Box>
  );
}
