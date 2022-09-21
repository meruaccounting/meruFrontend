import React, { useState } from 'react';
import axios from 'axios';

// mui components
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// store
import useStore from '../../store/clientStore';

//-------------------------------------------------------------------------------------------------------------------

// store

export default function AddClient() {
  const setClients = useStore((state) => state.setClients);
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
      setloading(true);
      // call api here
      try {
        axios.post(`/client`, { name: value }).then((res) => {
          setloading(false);
          setvalue('');
          console.log(res);
          if (res.status === 200) {
            axios.get(`/client`).then((res) => {
              setClients(res.data.data, false);
            });
          }
        });
        setloading(false);
      } catch (error) {
        console.log(error);
      }
    }
  };

  return (
    <Box
      sx={{ m: 1 }}
      onBlur={() => {
        seterror(false);
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
        // loadingPosition="end"
        variant="contained"
        sx={{ mt: 1 }}
        onClick={handleSubmit}
      >
        Add Client
      </LoadingButton>
    </Box>
  );
}
