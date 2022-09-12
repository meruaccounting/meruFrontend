import React, { useState } from 'react';
import axios from 'axios';

// mui components
import { Box, TextField } from '@mui/material';
import { LoadingButton } from '@mui/lab';

// components

// store
import useStore from '../../store/store';

//-------------------------------------------------------------------------------------------------------------------

// store

export default function AddProject({ setfilteredData }) {
  // store
  // to call and set clients again when new added
  const setClients = useStore((state) => state.setClients);
  const [value, setvalue] = useState('');
  const [helperText, sethelperText] = useState('');
  const [error, seterror] = useState(false);
  const [loading, setloading] = useState(false);
  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTZkZDcyZWIzYmQ5MzIyN2RhMGI5YiIsImlhdCI6MTY2MjY2NTY4OCwiZXhwIjoxNjY1MjU3Njg4fQ.V6Wg6QsqTEsZ1OQOOAIdiWLFkuDwS-qnopef1i9MiUI`,
    },
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (value === '' || value === null || value === undefined) {
      sethelperText('Enter a Value');
      seterror(true);
    } else {
      setloading(true);
      // call api here
      try {
        axios.post(`http://localhost:8000/project`, { name: value }, config).then((res) => {
          setloading(false);
          setvalue('');
          if (res.status === 201) {
            axios.get(`http://localhost:8000/project/byClients`, config).then((res) => {
              setClients(res.data.data, false);
              setfilteredData(res.data.data);
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
        sethelperText('');
      }}
    >
      <TextField
        error={error}
        value={value}
        onChange={(e) => setvalue(e.target.value)}
        helperText={helperText}
        required
        fullWidth
        label="Add new project"
      />
      <LoadingButton
        fullWidth
        type="submit"
        loading={loading}
        variant="contained"
        sx={{ mt: 1 }}
        onClick={handleSubmit}
      >
        Add Project
      </LoadingButton>
    </Box>
  );
}
