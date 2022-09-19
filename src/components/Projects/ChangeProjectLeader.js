import React, { useState, useEffect } from 'react';

// mui components
import { TextField, Autocomplete, InputAdornment, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

export default function ChangeClient({ project }) {
  const [projectLeader, setprojectLeader] = useState(null);

  // change the local pLeader state every time project changes
  useEffect(() => {
    setprojectLeader(() => (project.project.projectLeader._id ? project.project.projectLeader : null));
  }, [project]);

  // to set projectLeader to null, no need to call api again
  // because single state(managable locally)
  const handleDelete = () => {
    axios.patch(`project/${project.project._id}/pLeader`, { projectLeader: null }).then((res) => {
      if (res.status === 200) {
        setprojectLeader(null);
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
        label="Project Leader"
        value={projectLeader ? projectLeader.name : 'No Project Leader'}
        variant="standard"
      />
    </Box>
  );
}
