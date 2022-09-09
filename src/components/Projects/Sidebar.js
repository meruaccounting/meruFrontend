/* eslint-disable consistent-return */
import React, { useState, useEffect } from 'react';
import { Paper, Typography, CircularProgress, Box, TextField, Autocomplete } from '@mui/material';
import axios from 'axios';

// components
import { LoadingButton, TreeItem, TreeView } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';

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
  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTZkZDcyZWIzYmQ5MzIyN2RhMGI5YiIsImlhdCI6MTY2MjY2NTY4OCwiZXhwIjoxNjY1MjU3Njg4fQ.V6Wg6QsqTEsZ1OQOOAIdiWLFkuDwS-qnopef1i9MiUI`,
    },
  };
  const [clients, setclients] = useState({ clients: [], loader: true });

  // fetch the data
  useEffect(() => {
    axios
      .get(`http://localhost:8000/client/`, config)
      .then((res) => setclients({ clients: res.data.data, loader: false }));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // use ref to get the prev value of clients
  const handlesearch = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    const filteredData = clients.clients.filter((client) => {
      // if no input the return the original
      if (lowerCase === '') {
        return client;
      }
      // return the item which contains the user input
      return (
        client.name.toLowerCase().includes(lowerCase) ||
        client.projects.some((project) => project.name.toLowerCase().includes(lowerCase))
      );
    });
    setclients({ clients: filteredData, loader: false });
  };

  const handleClick = (e) => {
    console.log(e);
  };
  const handleProjectClick = (e) => {
    console.log(e);
  };
  const handleSubmit = async (e) => {
    console.log(e);
  };

  return (
    <Box component="div" sx={rootBox}>
      <Paper component="div" elevation={3} sx={rootPaper}>
        {/* search box ///////////////////////////////////////////////////////////////////// */}
        <Box sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center' }}>
          <Box
            sx={{
              maxWidth: '95%',
              width: 'auto',
              flexGrow: '1',
              '& .MuiTextField-root': { m: 1, mb: 2 },
            }}
            noValidate
            autoComplete="off"
          >
            <div>
              <Autocomplete
                options={[]}
                disablePortal
                id="combo-box-demo"
                renderInput={(params) => (
                  <TextField
                    onChange={handlesearch}
                    // ref={inputref}
                    // inputRef={props.inputRef}
                    {...params}
                    fullWidth
                  />
                )}
              />
            </div>
          </Box>
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
                // maxWidth: 400,
                overflowY: 'auto',
                width: '100%',
              }}
              // className={classes.root}
              // expanded={expanded}
              // selected={selected}
              // onNodeToggle={handleToggle}
              // onNodeSelect={handleSelect}
            >
              {clients.clients.length > 0
                ? clients.clients.map((client) => (
                    <TreeItem
                      nodeId={client._id.toString()}
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
                      onClick={handleClick}
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
                              onClick={handleProjectClick}
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
        <Box
          sx={{
            boxSizing: 'border-box',
            width: '95%',
            '& > :not(style)': { m: 1 },
          }}
        >
          {true && true && (
            <form onSubmit={handleSubmit} noValidate autoComplete="off" style={{ width: '100%' }}>
              <TextField required fullWidth label="Add new project" sx={{}} />

              <LoadingButton
                fullWidth
                type="submit"
                // loading={false}
                // loadingPosition="end"
                // endIcon = {}
                variant="contained"
                sx={{ mt: 1 }}
              >
                Add Project
              </LoadingButton>
            </form>
          )}
        </Box>
      </Paper>
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
