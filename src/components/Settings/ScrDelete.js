// react and other popular libraries
import React, { useState } from 'react';

// mui components
import { Box } from '@mui/system';
import { Typography, TextField } from '@mui/material';


const ScrDelete = () => {
  const [time, setTime] = useState(0);
  return (
    <Box sx={{ my: 2 }}>
    <TextField label="Duration" value={time} onChange={(event) => setTime(event.target.value)} placeholder="Months" />
    <Typography sx={{ color: 'red', fontWeight: 'bold' }}>*This settings Can only be changed By Admin.</Typography>
    <Typography sx={{fontWeight:"bold", mt:4}}>Individual Settings</Typography>
    <Typography>There can be only one setting for all users in your company.</Typography>
  </Box>
  )
}

export default ScrDelete