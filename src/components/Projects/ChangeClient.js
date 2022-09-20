import React, { useState, useEffect } from 'react';
import axios from 'axios';

// mui components
import { TextField, Autocomplete, InputAdornment, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// store
import useStore from '../../store/store';

export default function ChangeClient({ project }) {
  // for changing options
  const clients = useStore((state) => state.clients);
  const setClients = useStore((state) => state.setClients);
  const [client, setclient] = useState(null);

  // change the local client state every time project changes
  useEffect(() => {
    setclient(() => (project.project.client ? project.project.client : null));
  }, [project]);

  const handleDelete = () => {
    axios.patch(`project/${project.project._id}/client`, { client: null }).then((res) => {
      if (res.status === 200) {
        setclient(null);
        axios.get(`/project/byClients`).then((res) => {
          setClients(res.data.data, false);
        });
      }
    });
  };

  return (
    <Box>
      <TextField
        InputProps={{
          endAdornment: (
            <>
              <EditIcon sx={{ cursor: 'pointer' }} />
              <DeleteIcon onClick={handleDelete} sx={{ cursor: 'pointer', ml: 1 }} />
            </>
          ),
          startAdornment: (
            <InputAdornment position="start">
              <AccountCircle />
            </InputAdornment>
          ),
        }}
        sx={{ m: 1 }}
        disabled
        id="standard-required"
        label="Client"
        value={client ? client.name : 'No Client'}
        variant="standard"
      />
    </Box>
  );
}
