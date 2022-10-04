import React, { useState, useEffect } from 'react';
import axios from 'axios';

// mui components
import { TextField, Modal, Autocomplete, Typography, InputAdornment, Box } from '@mui/material';
import AccountCircle from '@mui/icons-material/AccountCircle';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// store
import useStore from '../../store/projectStore';

// ---------------------------------------------------------

const modalStyle = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  width: 400,
  bgcolor: 'background.paper',
  border: '2px solid #000',
  boxShadow: 24,
  p: 4,
};

export default function ChangeClient({ project }) {
  // for changing options
  const setClients = useStore((state) => state.setClients);
  const [clientOptions, setclientOptions] = useState([]);
  const [client, setclient] = useState(null);
  const [open, setopen] = useState(false);

  // change the local client state every time project changes
  useEffect(() => {
    setclient(() => (project.project.client ? project.project.client : null));
  }, [project]);

  // everytime modal opens fetch the list
  useEffect(() => {
    axios.get(`/client`).then((res) => {
      if (res.status === 200) {
        setclientOptions(res.data.data);
      }
    });
  }, [open]);

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

  // edit client
  const handleChange = (e, value) => {
    axios.patch(`project/${project.project._id}/client`, { client: value._id }).then((res) => {
      if (res.status === 200) {
        setclient(value);
        axios.get(`/project/byClients`).then((res) => {
          setClients(res.data.data, false);
        });
      }
    });
    setopen(false);
  };

  return (
    <Box>
      <TextField
        InputProps={{
          endAdornment: (
            <>
              <EditIcon sx={{ cursor: 'pointer' }} onClick={() => setopen(true)} />
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

      {/* modal */}
      <Modal
        open={open}
        onClose={() => setopen(false)}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={modalStyle}>
          <Typography variant="h6" component="h2">
            Change Client
          </Typography>
          <Autocomplete
            disablePortal
            options={clientOptions}
            getOptionLabel={(option) => option.name}
            onChange={(e, value) => handleChange(e, value)}
            sx={{ width: 300, mt: 1 }}
            renderInput={(params) => <TextField {...params} label="Clients" />}
          />
        </Box>
      </Modal>
    </Box>
  );
}
