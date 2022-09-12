// react components
import React, { useState } from 'react';

// material ui
import { Container, Box, List, ListItemText, Paper, ListItemButton, TextField, Button } from '@mui/material';

// Own components
import Search from '../Search';
import AddClient from './AddClient';

// styles
const rootPaper = {
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};
const listBoxLoader = {
  margin: 'auto',
  display: 'flex',
  flexGrow: '1',
  alignItems: 'center',
  justifyContent: 'center',
};

export default function Sidebar() {
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
    <Container sx={{ width: '30%', m: 1, mr: 0.5 }} disableGutters>
      <Paper component="div" elevation={3} sx={rootPaper}>
        {/* search component */}
        <Search sendDataToParent={getDataFromSearch} frequent labelName={'Search Client'} fullWidth />
        {/* -------------------------------------------------------------List component -------------------------------------------------------------------------------- */}
        <Paper style={{ flexGrow: 1, overflow: 'auto' }}>
          <List component="nav" aria-label="Client List">
            {clientNames.map((ele, index) => (
              <ListItemButton selected={selectListIndex === index} onClick={() => handleSelectedIndex(index)}>
                <ListItemText primary={ele} />
              </ListItemButton>
            ))}
          </List>
        </Paper>

        {/* -------------------------------------------------------------------------------------------New project add components------------------------------------------------------ */}
        <AddClient />
      </Paper>
    </Container>
  );
}
