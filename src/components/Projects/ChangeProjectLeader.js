import React, { useState } from 'react';

// mui components
import { TextField, Autocomplete, InputAdornment, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

export default function ChangeClient({ project }) {
  const [edit, setedit] = useState(false);
  return (
    <Box>
      {edit ? (
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          sx={{ width: '270px' }}
          onBlur={() => setedit(false)}
          onChange={() => {
            setedit(false);
            // call api to set client
          }}
          options={[]}
          renderInput={(params) => (
            <TextField {...params} onChange={(e) => console.log(e.target.value)} label="Select Project Leader" />
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
          label="Project Leader"
          value={project.project.projectLeader ? project.project.projectLeader : 'No Project Leader'}
          variant="standard"
        />
      )}
    </Box>
  );
}
