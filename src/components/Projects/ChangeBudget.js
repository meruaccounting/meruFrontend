// react and other importanat library
import React, { useState, useEffect, useRef } from 'react';
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
  const [modalBudget, setmodalBudget] = useState({ timePeriod: 'Week', time: 0, money: 0 });
  const [open, setopen] = useState(false);

  // form ref
  const formRef = useRef();

  // change the local client state every time project changes
  useEffect(() => {
    setbudget((prev) => (project.project.budget ? project.project.budget : prev));
    setmodalBudget((prev) => (project.project.budget ? project.project.budget : prev));
  }, [project]);

  // edit budget
  const handleSubmit = (e) => {
    axios
      .patch(`project/${project.project._id}/budget`, { budget: modalBudget })
      .then((res) => {
        console.log(res);
        if (res.status === 200) {
          setbudget(modalBudget);
        }
      })
      .catch((error) => console.log(error));
    console.log(modalBudget);
    setopen(false);
  };

  return (
    <Box sx={{ mt: 1, display: 'flex' }}>
      <Typography variant="h5">Budget: </Typography>
      <Box sx={{ ml: 1, display: 'flex' }}>
        <Typography variant="h6">{`${budget.time}Hrs, ${budget.money}/${budget.timePeriod}`} </Typography>
        <IconButton onClick={() => setopen(true)} size="small">
          <EditIcon fontSize="small" />
        </IconButton>
      </Box>

      {/* modal */}
      <Modal open={open} onClose={() => setopen(false)}>
        <Box sx={modalStyle}>
          {/* heading */}
          <Typography variant="h6" component="h2">
            Change Budget
          </Typography>

          {/* Time */}

          <TextField
            id="time"
            sx={{ width: 100, mt: 1, mr: 1 }}
            label="Time"
            value={modalBudget.time}
            onChange={(e) => setmodalBudget((prev) => ({ ...prev, time: e.target.value }))}
          />

          {/* Money */}
          <TextField
            id="money"
            sx={{ width: 100, mt: 1, mr: 1 }}
            label="Money"
            onChange={(e) => setmodalBudget((prev) => ({ ...prev, money: e.target.value }))}
            value={modalBudget.money}
          />

          {/* Time period */}
          <Autocomplete
            id="timePeriod"
            disablePortal
            value={modalBudget.timePeriod ?? 'Week'}
            options={['Week', 'Month']}
            onChange={(e, value) => setmodalBudget((prev) => ({ ...prev, timePeriod: value }))}
            sx={{ width: 160, mt: 1, mr: 1 }}
            renderInput={(params) => <TextField {...params} label="Time Period" />}
          />
          <Button onClick={handleSubmit} type="submit" size="small" variant="contained" color="primary">
            Save
          </Button>
        </Box>
      </Modal>
    </Box>
  );
}
