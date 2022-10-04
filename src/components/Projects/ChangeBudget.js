// react and other importanat library
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// mui components
import { Box, Modal, Autocomplete, Button, TextField, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
// ------------------------------------------------------------------------

const modalStyle = {
  display: 'flex',
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 500,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ChangeBudget({ project }) {
  // store
  const [budget, setbudget] = useState({ timePeriod: 'Week', time: 0, money: 0 });
  const [open, setopen] = useState(false);

  // change the local client state every time project changes
  useEffect(() => {
    setbudget((prev) => (project.project.budget ? project.project.budget : prev));
  }, [project]);

  // edit budget
  const handleChange = (e, value) => {
    axios.patch(`project/${project.project._id}/budget`, { budget: value }).then((res) => {
      if (res.status === 200) {
        setbudget(value);
      }
    });
    setopen(false);
  };

  return (
    <Box sx={{ display: 'flex' }}>
      <Typography variant="h5">Budget: </Typography>
      <Typography variant="h6">{`${budget.time}Hrs, ${budget.money} per ${budget.timePeriod}`} </Typography>
      <IconButton onClick={() => setopen(true)} size="small">
        <EditIcon />
      </IconButton>

      {/* modal */}
      <Modal open={open} onClose={() => setopen(false)}>
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Change Budget
          </Typography>
          <TextField sx={{ width: 100, mt: 1, mr: 1 }} label="Time" value={budget.time}>
            Budget
          </TextField>
          <TextField sx={{ width: 100, mt: 1, mr: 1 }} label="Money" value={budget.money}>
            Budget
          </TextField>
          <Autocomplete
            disablePortal
            options={['Week', 'Month']}
            sx={{ width: 160, mt: 1, mr: 1 }}
            renderInput={(params) => <TextField {...params} label="Time Period" />}
          />
          <Button onClick={handleChange} size="small" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
