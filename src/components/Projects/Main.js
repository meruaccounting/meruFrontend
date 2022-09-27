import React, { useState, useEffect } from 'react';
import axios from 'axios';

// mui components
import { TextField, Divider, Container, CircularProgress, Paper, Box } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// components
import NoProjectSelected from './NoProjectSelected';
import ChangeClient from './ChangeClient';
import ChangeProjectLeader from './ChangeProjectLeader';
import ChangeBudget from './ChangeBudget';
import ProjectTime from './ProjectTime';

//---------------------------------------------------------------

// style
// const input = {
//   color: '#000',
//   width: 'fit-content',
//   maxWidth: '50%',
//   wordWrap: 'break-word',
//   height: '30px',
//   fontSize: '30px',
//   fontWeight: 'bold',
//   border: 'none',
//   background: '#fff',
//   transition: 'width 0.4s ease-in-out',
//   '& :focus': { width: '100%' },
// };
const mainLoader = {
  height: '100%',
  margin: 'auto',
  display: 'flex',
  flexGrow: '1',
  alignItems: 'center',
  justifyContent: 'center',
};
const rootPaper = {
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};

export default function Main({ projectId }) {
  const [project, setproject] = useState({ project: {}, loader: true });

  // fetch the data
  useEffect(() => {
    if (!projectId) return;
    axios.get(`project/${projectId}`).then((res) => {
      setproject({ project: res.data.data, loader: false });
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  if (!projectId) return <NoProjectSelected />;

  return (
    <>
      <Container sx={{ width: '70%', m: 1, ml: 0.5 }} disableGutters>
        <Paper component="div" elevation={3} sx={rootPaper}>
          {project.loader ? (
            <Box sx={mainLoader}>
              <CircularProgress />
            </Box>
          ) : (
            <Box sx={{ m: 1 }}>
              {/* Name compoent ///////////////////////// */}
              <TextField
                fullWidth
                label="Name"
                value={project.project.name}
                InputProps={{
                  endAdornment: (
                    <>
                      <EditIcon sx={{ cursor: 'pointer' }} />
                      <DeleteIcon sx={{ cursor: 'pointer' }} />
                    </>
                  ),
                }}
              />
              <Divider sx={{ mt: 0.5 }} />

              {/* change client and project Leader and Budget///////////////// */}
              <Container disableGutters sx={{ flexDirection: 'row', justifyContent: 'space-between' }}>
                <ChangeClient project={project} />
                <ChangeProjectLeader project={project} />
                <ChangeBudget project={project} />
                <ProjectTime projectId={projectId} />
              </Container>
            </Box>
          )}
        </Paper>
      </Container>
    </>
  );
}
