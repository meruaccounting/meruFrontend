// react and other popular library
import React from 'react'

// mui library
import {Box, Container, CssBaseline} from "@mui/material"

// own components
import Sidebar from '../components/Settings/Sidebar'
import PageHeader from '../components/Projects/PageHeader';
import Info from '../components/Settings/Info';

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
  // backgroundColor: '#fdfdff',
  backgroundColor: 'red',
};


const Setting = () => {
  return (
    <Box sx={rootBox} disableGutters>
      <CssBaseline />
      <PageHeader title="Settings" />
      <Box sx={innerBox}>
      <Sidebar/>
      <Container sx={{ width: '70%', paddingX: 2 }} disableGutters>
        <Info/>
        </Container>
      </Box>
    </Box>
  )
}

export default Setting