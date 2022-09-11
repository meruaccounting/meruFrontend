/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

// mui components
import { Paper, Typography, CircularProgress, Box, TextField } from '@mui/material';
import { LoadingButton, TreeItem, TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';

// components
import Main from './Main';

// store
import useStore from '../../store/store';

//-------------------------------------------------------------------------------------------------------------------

// styles
const rootBox = {
  margin: '15px',
  flexGrow: '1',
  display: 'flex',
  flexDirection: 'row',
  scrollbar: 'auto',
};
const rootPaper = {
  overflow: 'hidden',
  height: '100%',
  width: '28.5%',
  display: 'flex',
  flexDirection: 'column',
  // position: "relative",
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
  const clients = useStore((state) => state.clients);
  const setClients = useStore((state) => state.setClients);
  const [projectId, setprojectId] = useState(null);
  const [filteredData, setfilteredData] = useState([]);
  const [noClients, setnoClients] = useState([]);
  const [addProjectValue, setaddProjectValue] = useState('');
  const [addProjectHelperText, setaddProjectHelperText] = useState('');
  const [addProjectError, setaddProjectError] = useState(false);
  const [addProjectLoading, setaddProjectLoading] = useState(false);

  console.log(filteredData);
  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTZkZDcyZWIzYmQ5MzIyN2RhMGI5YiIsImlhdCI6MTY2MjY2NTY4OCwiZXhwIjoxNjY1MjU3Njg4fQ.V6Wg6QsqTEsZ1OQOOAIdiWLFkuDwS-qnopef1i9MiUI`,
    },
  };
  // store

  // fetch the data
  useEffect(() => {
    axios.get(`http://localhost:8000/client/`, config).then((res) => {
      setClients(res.data.data, false);
      setfilteredData(res.data.data);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // use ref to get the prev value of clients
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
        client.name.toLowerCase().includes(lowerCase) ||
        client.projects.some((project) => project.name.toLowerCase().includes(lowerCase))
      );
    });
    setfilteredData(data);
    console.log(data);
  };

  const handleAddProjectChange = (event) => {
    setaddProjectValue(event.target.value);
  };

  const handleSubmit = async (e) => {
    if (addProjectValue === '') {
      setaddProjectHelperText('Enter a Value');
      setaddProjectError(true);
    }

    console.log(e);
  };

  return (
    <Box component="div" sx={rootBox}>
      <Paper component="div" elevation={3} sx={rootPaper}>
        {/* search box ///////////////////////////////////////////////////////////////////// */}
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

        {/* if else for loader and list//////////////////////////////////////////////////////////////////// */}
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
              aria-label="file system navigator"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                height: 240,
                flexGrow: 1,
                overflowY: 'auto',
                width: '100%',
              }}
            >
              {/* No clients////////////////////////// */}
              <TreeItem
                nodeId={1}
                label={
                  <Typography
                    sx={{
                      color: 'black',
                      fontSize: '1.5rem',
                      fontWeight: '700',
                    }}
                  >
                    NO CLIENTS
                  </Typography>
                }
                key={0}
                id={0}
              >
                {noClients.map((project) => (
                  <TreeItem
                    id={1 + project._id}
                    nodeId={(project._id + 1).toString()}
                    key={project._id}
                    label={
                      <Typography
                        sx={{
                          color: '#2a3641',
                          fontSize: '1.2rem',
                          fontWeight: '700',
                        }}
                        data-client={null}
                        data-project={project.name}
                        onClick={() => setprojectId(project._id)}
                      >
                        {project.name}
                      </Typography>
                    }
                  />
                ))}
              </TreeItem>

              {/* projects with clients /////////////////////// */}
              {filteredData.length
                ? filteredData.map((client) => (
                    <TreeItem
                      nodeId={client._id}
                      label={
                        <Typography
                          sx={{
                            color: '#637381',
                            fontSize: '1.5rem',
                            fontWeight: '700',
                          }}
                        >
                          {client.name}
                        </Typography>
                      }
                      key={client._id}
                      // onClick={handleClick}
                      id={client._id}
                    >
                      {client.projects.map((project) => (
                        <TreeItem
                          id={client._id + project._id}
                          nodeId={(project._id + client._id).toString()}
                          key={project._id}
                          label={
                            <Typography
                              sx={{
                                color: '#2a3641',
                                fontSize: '1.2rem',
                                fontWeight: '700',
                              }}
                              data-client={client.name}
                              data-project={project.name}
                              onClick={() => setprojectId(project._id)}
                            >
                              {project.name}
                            </Typography>
                          }
                        />
                      ))}
                    </TreeItem>
                  ))
                : 'noclients'}
            </TreeView>
          </Box>
        )}

        {/* add new project //////////////////////////////////////////////////////////// */}
        <Box sx={{ m: 1 }}>
          <form onSubmit={handleSubmit} style={{ width: '100%' }}>
            <TextField
              error={addProjectError}
              value={addProjectValue}
              onChange={(e) => setaddProjectValue(e.target.value)}
              helperText={addProjectHelperText}
              // required
              required
              fullWidth
              label="Add new project"
            />
            <LoadingButton
              fullWidth
              type="submit"
              loading={addProjectLoading}
              loadingPosition="end"
              variant="contained"
              sx={{ mt: 1 }}
            >
              Add Project
            </LoadingButton>
          </form>
        </Box>
      </Paper>
      <Main projectId={projectId} />
    </Box>
    /* {open === true ? (
        <Snackbars
          sx={{ display: "none", position: "absolute", zIndex: -10000 }}
          message={"hello"}
          open={open}
          setOpen={(val) => {
            setOpen(val);
          }}
        />
      ) : (
        ""
      )} */
  );
}
