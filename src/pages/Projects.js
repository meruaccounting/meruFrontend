import React from 'react';
import { CssBaseline, Box } from '@mui/material';
// import { makeStyles } from "@mui/styles";

// components
import Sidebar from '../components/Projects/Sidebar';
import PageHeader from '../components/Projects/PageHeader';

// const useStyles = makeStyles((theme) => ({
//   root: {
//     maxHeight: '70vh',
//     height: '70vh',
//     width: '100%',
//     margin: 'auto',
//     display: 'flex',
//     gridTemplateColumns: '30% 70%',
//     justifyContent: 'space-around',
//     backgroundColor: '#fdfdff',
//   },
// }));
// lg: '70%', md: '90%'

export default function Projects() {
  // styles
  const rootBox = {
    width: '95%',
    margin: 'auto',
    // maxHeight: '70h',
    height: '70vh',
  };
  const innerBox = {
    // maxHeight: '70vh',
    height: '78vh',
    width: '100%',
    margin: 'auto',
    display: 'flex',
    // // gridTemplateColumns: '30% 70%',
    justifyContent: 'space-around',
    // backgroundColor: '#fdfdff',
    backgroundColor: 'red',
  };

  return (
    <Box component="div" sx={rootBox}>
      <CssBaseline />
      <PageHeader title="Projects" />
      <Box sx={innerBox}>
        <Sidebar />
      </Box>
    </Box>
  );
}
