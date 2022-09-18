// react and other popular library
import React, { useState } from 'react';

// mui library
import { Box, Container, CssBaseline } from '@mui/material';

// own components
import Sidebar from '../components/Settings/Sidebar';
import PageHeader from '../components/Projects/PageHeader';
import Info from '../components/Settings/Info';
import Main from '../components/Settings/Main';

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

const Setting = () => {
  // store
  const [settingMsg, setSettingMsg] = useState(0);
  return (
    <Box sx={rootBox}>
      <CssBaseline />
      <PageHeader title="Settings" />
      <Box sx={innerBox}>
        {/* -----------------------------------------------------------------
        SIDE BAR
        ---------------------------------------------------------------------- */}
        <Sidebar
          setMsg={(msg) => {
            setSettingMsg(msg);
          }}
        />
        <Container sx={{ width: '70%', paddingX: 2 }} disableGutters>
          {/* -------------------------------------------------------------------------
            Information Sections
            -------------------------------------------------------------------------------- */}
          <Info msg={settingMsg} />
          <Main selectedSettingNo={settingMsg.selectedIndex} />
        </Container>
      </Box>
    </Box>
  );
};

export default Setting;
