/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// mui components
import { Paper, Typography, CircularProgress, Box, TextField } from '@mui/material';
import { TreeItem, TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import { Container } from '@mui/system';

// components
import AddProject from './AddProject';

// store
import useStore from '../../store/projectStore';

//-------------------------------------------------------------------------------------------------------------------

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

export default function Sidebar({ setprojectId }) {
  // store
  // original clients from the store and its set fn
  const clients = useStore((state) => state.clients);
  const setClients = useStore((state) => state.setClients);
  // filtered after handlesearch
  const [filteredData, setfilteredData] = useState([]);

  // fetch the data
  useEffect(() => {
    axios.get(`/project/byClients`).then((res) => {
      if (res.status === 200) {
        setClients(res.data.data, false);
        setfilteredData(res.data.data);
      }
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // setfiltereddata every time clients changes
  useEffect(() => {
    setfilteredData(clients.clients);
    console.log(clients.clients.filter((client) => client._id === null));
  }, [clients]);

  const handleSearch = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    const data = clients.clients.filter((client) => {
      // if no input the return the original
      if (lowerCase === '') {
        setfilteredData(client);
        return client;
      }
      // return the item which contains the user input
      return (
        (client.name ? client.name.toLowerCase().includes(lowerCase) : client.name) ||
        client.projects.some((project) => project.name.toLowerCase().includes(lowerCase))
      );
    });
    setfilteredData(data);
  };

  return (
    <>
      <Container sx={{ width: '30%', m: 1, mr: 0.5 }} disableGutters>
        <Paper component="div" elevation={3} sx={rootPaper}>
          {/* search component */}
          <Box sx={{ m: 1 }}>
            <TextField
              InputProps={{
                endAdornment: <SearchIcon />,
              }}
              onChange={handleSearch}
              label="Search"
              fullWidth
            />
          </Box>

          {/* -------------------------------------------------------------TreeView component -------------------------------------------------------------------------------- */}
          {clients.loader ? (
            <CircularProgress sx={listBoxLoader} />
          ) : (
            <Box
              component="div"
              sx={{
                display: 'flex',
                flexDirection: 'column',
                flexGrow: '1',
                alignItems: 'flex-start',
                overflowY: 'auto',
              }}
            >
              <TreeView
                aria-label="Clients Treeview"
                defaultCollapseIcon={<ExpandMoreIcon />}
                defaultExpandIcon={<ChevronRightIcon />}
                sx={{
                  flexGrow: 1,
                  overflowY: 'auto',
                  width: '100%',
                }}
              >
                {/* No clients */}
                {filteredData.filter((client) => client._id === null).length ? (
                  <TreeItem
                    nodeId={(1).toString()}
                    label={
                      <Typography
                        sx={{
                          color: '#637381',
                          fontSize: '1.5rem',
                          fontWeight: '700',
                        }}
                      >
                        {'No Client'}
                      </Typography>
                    }
                    key={1}
                  >
                    {filteredData
                      .filter((client) => client._id === null)[0]
                      .projects.map((project) => (
                        <TreeItem
                          nodeId={(project._id + 1).toString()}
                          key={project._id}
                          label={
                            <Typography
                              sx={{
                                color: '#2a3641',
                                fontSize: '1.2rem',
                                fontWeight: '700',
                              }}
                              onClick={() => setprojectId(project._id)}
                            >
                              {project.name}
                            </Typography>
                          }
                        />
                      ))}
                  </TreeItem>
                ) : (
                  ''
                )}

                {/* with clients */}
                {filteredData.filter((client) => client._id !== null).length
                  ? filteredData
                      .filter((client) => client._id !== null)
                      .map((client) => (
                        <TreeItem
                          nodeId={(client._id ? client._id : 1).toString()}
                          label={
                            <Typography
                              sx={{
                                color: '#637381',
                                fontSize: '1.5rem',
                                fontWeight: '700',
                              }}
                            >
                              {client._id ? client.name : 'No Client'}
                            </Typography>
                          }
                          key={client._id}
                        >
                          {client.projects.map((project) => (
                            <TreeItem
                              nodeId={(project._id + (client._id ? client._id : 1)).toString()}
                              key={project._id}
                              label={
                                <Typography
                                  sx={{
                                    color: '#2a3641',
                                    fontSize: '1.2rem',
                                    fontWeight: '700',
                                  }}
                                  onClick={() => setprojectId(project._id)}
                                >
                                  {project.name}
                                </Typography>
                              }
                            />
                          ))}
                        </TreeItem>
                      ))
                  : ''}
                {!filteredData.length ? (
                  <Typography sx={{ mt: '25vh', textAlign: 'center' }}>No Projects</Typography>
                ) : (
                  ''
                )}
              </TreeView>
            </Box>
          )}

          {/* -------------------------------------------------------------------------------------------New project add components------------------------------------------------------ */}
          <AddProject />
        </Paper>
      </Container>
    </>
  );
}
