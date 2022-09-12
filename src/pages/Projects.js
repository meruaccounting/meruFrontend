import React, { useState } from 'react';
import { CssBaseline, Box } from '@mui/material';
// import { makeStyles } from "@mui/styles";

// components
import Sidebar from '../components/Projects/Sidebar';
import Main from '../components/Projects/Main';
import PageHeader from '../components/Projects/PageHeader';

// styles
const rootBox = {
  width: '95%',
  margin: 'auto',
};
const innerBox = {
  height: '78vh',
  width: '100%',
  display: 'flex',
  // backgroundColor: '#fdfdff',
  backgroundColor: 'red',
};
export default function Projects() {
  const [projectId, setprojectId] = useState(null);

  return (
    <Box component="div" sx={rootBox}>
      <CssBaseline />
      <PageHeader title="Projects" />
      <Box sx={innerBox}>
        <Sidebar setprojectId={(id) => setprojectId(id)} />
        <Main projectId={projectId} />
      </Box>
    </Box>
  );
}
