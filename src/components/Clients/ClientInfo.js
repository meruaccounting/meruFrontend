// react components
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';

// mui library
import { Box } from '@mui/system';
import { TextField, Paper, Typography, Tooltip, Button, Alert, Collapse, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import CloseIcon from '@mui/icons-material/Close';

// own components
import AlertDialog from './AlertDialog';
import { getClientByIdApi, updateClientName } from './apiCalls';

const ClientInfo = ({ clientId, setClientId }) => {
  // store
  const [warning, setWarning] = useState(false);
  const [warningMessage, setWarningMessage] = useState('');
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

  // to get data from backed
  const setClientInfo = async (Id) => {
    if (Id)
      try {
        const clientProjects = await getClientByIdApi(Id);
        if (typeof clientProjects === 'object') {
          setName(clientProjects.name);
          setProjectDate(formatDate(clientProjects.createdAt));
          setCreatedBy(clientProjects.createdBy);
          setNameTextField(clientProjects.name);
        }
        console.log(clientProjects);
      } catch (error) {
        console.log(error);
      }
  };

  // To rerender whenever id changes i.e. when user switche client
  useEffect(() => {
    setClientInfo(clientId);
  }, [clientId]);

  const sendNewName = async (name) => {
    const newNameRes = await updateClientName(clientId, name);
    if (typeof newNameRes === 'object') {
      setName(nameTextField);
      setClientId(clientId);
    } else {
      setWarning(true);
      setWarningMessage(newNameRes);
    }
  };

  // Edit client Name
  const handleUserName = () => {
    setEditName(false);
    if (name !== nameTextField) {
      sendNewName(nameTextField);
    }
  };

  // handleResponse From dialog to delete project or not
  const handleResponseFromDialog = (res) => {
    setOpenDialog(false);
  };
  return (
    <Paper sx={{mt:1}}>
      {/* alert for warning message */}
      <Collapse in={warning}>
        <Alert
         severity="error"
          action={
            <IconButton
              aria-label="warning"
              size="small"
              onClick={() => {
                setWarning(false);
              }}
            >
              <CloseIcon fontSize="inherit" />
            </IconButton>
          }
          sx={{ mb: 2 }}
        >
          {warningMessage}
        </Alert>
      </Collapse>

      {/* ---------------------------------------------------------
      Assign Project Heading
    ------------------------------------------------------------*/}
      <Box>
        {editName ? (
          <Box>
            {/* ----------------------------------------------------------------------
            User Name change Components
           ------------------------------------------------------------------------- */}
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
            {/* -----------------------------------------------------------------------------------
          Client Name components
      --------------------------------------------------------------------------------- */}
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
