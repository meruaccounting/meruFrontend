import React, { useState } from 'react';

// mui components
import { TextField, Autocomplete, InputAdornment, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// store
import useStore from '../../store/store';

export default function ChangeClient({ project }) {
  const clients = useStore((state) => state.clients);
  const [edit, setedit] = useState(false);
  return (
    <Box>
      {edit ? (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          sx={{ width: '270px' }}
          onBlur={() => setedit(false)}
          getOptionLabel={(option) => (option.name ? option.name : 'No Client')}
          onChange={() => {
            setedit(false);
            // call api to set client
          }}
          options={clients.clients}
          renderInput={(params) => (
            <TextField {...params} onChange={(e) => console.log(e.target.value)} label="Select Client" />
          )}
        />
      ) : (
        <TextField
          InputProps={{
            endAdornment: (
              <>
                <EditIcon sx={{ cursor: 'pointer' }} onClick={() => setedit(true)} />
                <DeleteIcon sx={{ cursor: 'pointer' }} />
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
          value={project.project.client ? project.project.client : 'No Client'}
          variant="standard"
        />
      )}
    </Box>
  );
}
