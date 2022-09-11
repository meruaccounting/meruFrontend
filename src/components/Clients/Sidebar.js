// react components
import React, { useState } from 'react';

// material ui
import {
  Container,
  Box,
  List,
  ListItemText,
  ListSubheader,
  ListItem,
  Paper,
  Divider,
  ListItemButton,
  TextField,
  Button,
} from '@mui/material';

// Own components
import Search from '../Search';

const Sidebar = () => {
  
  
    // store
  const [OriginalList, setOriginalList] = useState([
    'Prashant',
    'Ravi',
    'Kamal',
    'Rohit',
    'vipin',
    'ajay',
    'sanjay',
    'xyz',
    'hdd',
    'dfjd',
  ]);
  const [clientNames, setClientNames] = useState([
    'Prashant',
    'Ravi',
    'Kamal',
    'Rohit',
    'vipin',
    'ajay',
    'sanjay',
    'xyz',
    'hdd',
    'dfjd',
  ]);
  const [selectListIndex, setSelectListIndex] = useState(0);
  const [projectName, setProjectName] = useState('');

  // to filter data in clientName as per user search
  const filterClients = (clientName) => {
    if (clientName === '') {
      setClientNames([...OriginalList]);
    } else {
      const filteredClients = clientNames.filter((client) => {
        const filterExpression = new RegExp(clientName, 'i');
        if (client.search(filterExpression) === -1) return false;
        return true;
      });
      setClientNames([...filteredClients]);
    }
  };

  //   to get the data from search components
  const getDataFromSearch = (valueSearched) => {
    // callse filterclient arrow funtion
    filterClients(valueSearched);
  };
  //   to set selectListindex to current selected element in index
  const handleSelectedIndex = (number) => {
    setSelectListIndex(number);
  };
  //   to assign project name if new project selected
  const handleProjectName = (event) => {
    setProjectName(event.target.value);
  };

  // to send request to backend for new data
  const sendNewProjectRequest = () => {};

  return (
    <Container sx={{ width: '30%' }} disableGutters>
      {/* search component */}
      <Search sendDataToParent={getDataFromSearch} frequent labelName={"Search Client"} fullWidth />
      {/* -------------------------------------------------------------List component -------------------------------------------------------------------------------- */}
      <Paper style={{ maxHeight: '50vh', overflow: 'auto' }}>
        <List component="nav" aria-label="Client List">
          {clientNames.map((ele, index) => (
            <ListItemButton selected={selectListIndex === index} onClick={() => handleSelectedIndex(index)}>
              <ListItemText primary={ele} />
            </ListItemButton>
          ))}
        </List>
      </Paper>

      {/* -------------------------------------------------------------------------------------------New project add components------------------------------------------------------ */}
      <Box sx={{ marginTop: 3, margin: 'auto' }}>
        <TextField label="Client Name" value={projectName} onChange={handleProjectName} fullWidth/>
        <Button variant="contained" sx={{ width: '90%', marginTop: 1 }}>
          Add New Client
        </Button>
      </Box>
    </Container>
  );
};

export default Sidebar;
