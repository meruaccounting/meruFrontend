import React, { useState } from 'react';
/* eslint-disable consistent-return */
// import axios from 'axios';

// mui components
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components
import { addNewClient } from './apiCalls';

// store
// import useStore from '../../store/store';

//-------------------------------------------------------------------------------------------------------------------

// store

export default function AddClient() {
  const [value, setvalue] = useState('');
  const [helperText, sethelperText] = useState('');
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (value === '' || value === null || value === undefined) {
      sethelperText('Enter a Value');
      seterror(true);
    } else {
      try {
        setloading(true);
        const res = await addNewClient(value);
        if(res){
          console.log(res);
          setloading(false);
        }
      } catch (error) {
        console.log(error)
      }
    }
  };

  return (
    <Box
      sx={{ m: 1 }}
      onBlur={() => {
        seterror(false);
        console.log('error');
      }}
    >
      <TextField
        error={error}
        value={value}
        onChange={(e) => setvalue(e.target.value)}
        helperText={helperText}
        required
        fullWidth
        label="Add new client"
      />
      <LoadingButton
        fullWidth
        type="submit"
        loading={loading}
        loadingPosition="end"
        variant="contained"
        sx={{ mt: 1 }}
        onClick={handleSubmit}
      >
        Add Client
      </LoadingButton>
    </Box>
  );
}
