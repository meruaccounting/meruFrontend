import React, { useState, useEffect } from 'react';
import { Link, useSearchParams } from 'react-router-dom';

import { Box } from '@mui/system';
import { TextField, Paper, Typography, Tooltip, Button } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

import AlertDialog from './AlertDialog';

const ClientInfo = ({ clientInfo }) => {
  const [name, setName] = useState('No Clients');
  const [nameTextField, setNameTextField] = useState('No Clients');
  const [editName, setEditName] = useState(false);
  const [createdBy, setCreatedBy] = useState('creatorName');
  const [projectDate, setProjectDate] = useState('dd/mm/yyyy');
  const [openDialog, setOpenDialog] = useState(false);

  // for fomating date as per need
  const formatDate = (time) => {
    const date = new Date(time);
    let day = date.getDate();
    if (day <= 9) day = `0${day}`;
    let month = date.getMonth() + 1;
    if (month <= 9) month = `0${month}`;
    const year = date.getFullYear();
    return `${day}/${month}/${year}`;
  };

  useEffect(() => {
    if (clientInfo.createdAt) {
      setName(clientInfo.name);
      setNameTextField(clientInfo.name);
      setProjectDate(formatDate(clientInfo.createdAt));
    //   setCreatedBy(clientInfo.createdBy);
    }
  }, [clientInfo]);

  // Edit client Name
  const handleUserName = () => {
    setEditName(false);
    setName(nameTextField);
  };

  // handleResponse From dialog to delete project or not
  const handleResponseFromDialog = (res) => {
    setOpenDialog(false);
    console.log(res);
  };
  return (
    <Paper>
      {/* ---------------------------------------------------------
      Assign Project Heading
    ------------------------------------------------------------*/}
      <Box>
        {/* -----------------------------------------------------------------------------------
        Client Name components
    --------------------------------------------------------------------------------- */}
        {editName ? (
          <Box>
            <TextField
              id="client-Name"
              label="Client Name"
              variant="outlined"
              fullWidth
              value={nameTextField}
              onChange={(event) => setNameTextField(event.target.value)}
              onBlur={handleUserName}
              onKeyDown={(event) => {
                if (event.key === 'Enter') handleUserName();
              }}
            />
          </Box>
        ) : (
          <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
            <Box>
              <Typography variant="h3">{name}</Typography>
            </Box>
            <Box>
              <Tooltip title="Edit Client">
                <Button onClick={() => setEditName(true)}>
                  <EditIcon color="action" />
                </Button>
              </Tooltip>
              <Tooltip title="Delete Client">
                <Button onClick={() => setOpenDialog(true)}>
                  <DeleteIcon color="action" />
                </Button>
              </Tooltip>
            </Box>
          </Box>
        )}
      </Box>
      {/* ------------------------------ heading and delete tags ------------------------------------------------------------------------*/}
      <Typography sx={{ marginTop: 2, fontWeight: 'bold' }}>
        <Link to="/dashboard/projects" style={{ textDecoration: 'none', color: 'green' }}>
          Assign Projects
        </Link>
      </Typography>

      {/* ----------------------------------------------- Create date and creator name -------------------------------------------------------- */}
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 }}>
        <Box>
          <Typography variant="h6">Created On: {projectDate}</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Created By: {createdBy}</Typography>
        </Box>
      </Box>
      {/* Dialog box components */}
      <AlertDialog sendToParent={handleResponseFromDialog} dialogStatus={openDialog} />
    </Paper>
  );
};

export default ClientInfo;
