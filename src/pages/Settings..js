// react and other popular library
import React, { useState } from 'react';

// mui library
import { Box, Container, CssBaseline } from '@mui/material';

// own components
import Sidebar from '../components/Settings/Sidebar';
import PageHeader from '../components/Projects/PageHeader';

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

export default function Settings() {
  // store
  return (
    <Box sx={rootBox}>
      <CssBaseline />
      <PageHeader title="Settings" />
      <Box sx={innerBox}>
        {/* -----------------------------------------------------------------
        SIDE BAR
        ---------------------------------------------------------------------- */}
        <Sidebar />
      </Box>
    </Box>
  );
}
