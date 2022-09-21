// react and other popular lib
import React from 'react';

// mui components
import { Container } from '@mui/system';
import { Typography } from '@mui/material';

const IndividaulInfo = () => 
    <Container disableGutters>
      <Typography variant="h6">Individual Settings</Typography>
      <Typography>If enabled, individual settings will be used instead of the team Settings</Typography>
    </Container>

export default IndividaulInfo;
