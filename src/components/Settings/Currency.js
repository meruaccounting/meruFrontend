// react and other popular libraries
import React, { useState } from 'react';

// mui components
import { Box } from '@mui/system';
import { Typography, TextField } from '@mui/material';

const Currency = () => {
  const [amount, setAmount] = useState('');
  return (
    <Box sx={{ my: 2 }}>
      <TextField label="Currency" value={amount} onChange={(event) => setAmount(event.target.value)} placeholder="Rs" />
      <Typography sx={{ color: 'red', fontWeight: 'bold' }}>*This settings Can only be changed By Admin.</Typography>
      <Typography sx={{fontWeight:"bold", mt:4}}>Individual Settings</Typography>
      <Typography>There can be only one setting for all users in your company.</Typography>
    </Box>
  );
};

export default Currency;
