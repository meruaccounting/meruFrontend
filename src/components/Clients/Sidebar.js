// react components
import React, { useEffect, useState } from 'react';

// material ui
import { Container, List, ListItemText, Paper, ListItemButton, CircularProgress } from '@mui/material';

// Own components
import Search from '../Search';
import AddClient from './AddClient';
import { getClientApi } from './apiCalls';
// styles
const rootPaper = {
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};
// const listBoxLoader = {
//   margin: 'auto',
//   display: 'flex',
//   flexGrow: '1',
//   alignItems: 'center',
//   justifyContent: 'center',
// };

export default function Sidebar({ setclientId }) {
  // store
  const [originalClientNames, setOriginalClientNames] = useState([]);
  const [clientNames, setClientNames] = useState([]);
  const [selectListIndex, setSelectListIndex] = useState(0);
  const [isLoadingData, setIsLoadingData] = useState(true);

  // to set data in clientNames and ori
  const makeClientList = async () => {
    try {
      const clientData = await getClientApi();
      if (Array.isArray(clientData)) {
        const clientArr = clientData.map((ele) => ({ name: ele.name, Id: ele._id }));
        // setting data as {name, Id} for client
        setClientNames([...clientArr]);
        setOriginalClientNames([...clientArr]);
        setIsLoadingData(false);
      } else {
        console.log('IF error is not returned');
      }
    } catch (error) {
      console.log('Need to do something with error');
    }
  };
  useEffect(() => {
    makeClientList();
  }, []);

  // to filter data in clientName as per user search
  const filterClients = (clientName) => {
    if (clientName === '') {
      setClientNames([...originalClientNames]);
    } else {
      const filteredClients = clientNames.filter((client) => {
        const filterExpression = new RegExp(clientName, 'i');
        if (client.name.search(filterExpression) === -1) return false;
        return true;
      });
      setClientNames([...filteredClients]);
    }
  };

  //   to get the data from search components
  const getDataFromSearch = (valueSearched) => {
    // callto filterclient arrow funtion
    console.log("here")
    filterClients(valueSearched);
  };

  //   to set selectListindex to current selected element in index
  // this function will also call callback as selction changes
  const handleSelectedIndex = (number) => {
    setSelectListIndex(number);
    // callback call
    setclientId(clientNames[number].Id);
  };

  return (
    <Container sx={{ width: '30%', m: 1, mr: 0.5 }} disableGutters>
      <Paper component="div" elevation={3} sx={rootPaper}>
        {/* search component */}
        <Search sendDataToParent={getDataFromSearch} frequent labelName={'Search Client'} fullWidth />
        {/* -------------------------------------------------------------List component -------------------------------------------------------------------------------- */}
        {isLoadingData ? (
           <Paper style={{ flexGrow: 1, overflow: 'auto', justifyContent:"center", display:"flex", alignItems:"center"}}>
          <CircularProgress />
          </Paper>
        ) : (
          <Paper style={{ flexGrow: 1, overflow: 'auto' }}>
            <List component="nav" aria-label="Client List">
              {clientNames.map((ele, index) => (
                <ListItemButton
                  selected={selectListIndex === index}
                  onClick={() => handleSelectedIndex(index)}
                  key={index}
                >
                  <ListItemText primary={ele.name} />
                </ListItemButton>
              ))}
            </List>
          </Paper>
        )}

        {/* -------------------------------------------------------------------------------------------New project add components------------------------------------------------------ */}
        <AddClient />
      </Paper>
    </Container>
  );
}

// 'Prashant',
// 'Ravi',
// 'Kamal',
// 'Rohit',
// 'vipin',
// 'ajay',
// 'sanjay',
// 'xyz',
// 'hdd',
// 'dfjd',
