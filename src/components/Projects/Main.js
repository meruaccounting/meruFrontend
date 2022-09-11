import React, { useContext, useState, useRef, useEffect } from 'react';

// mui components
import {
  TextField,
  Paper,
  Typography,
  Link,
  IconButton,
  Modal,
  FormControl,
  InputLabel,
  Divider,
  Button,
  MenuItem,
  Select,
  Box,
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import EditIcon from '@mui/icons-material/Edit';
import DeleteIcon from '@mui/icons-material/Delete';

// components

// api
import axios from 'axios';

//---------------------------------------------------------------

// style
const input = {
  color: '#000',
  width: 'fit-content',
  maxWidth: '50%',
  wordWrap: 'break-word',
  height: '30px',
  fontSize: '30px',
  fontWeight: 'bold',
  border: 'none',
  background: '#fff',
  transition: 'width 0.4s ease-in-out',
  '& :focus': { width: '100%' },
};

const style = {
  position: 'absolute',
  top: '50%',
  left: '50%',
  transform: 'translate(-50%, -50%)',
  minWidth: 600,
  bgcolor: '#fff',
  borderRadius: 2,
  border: 'none',
  display: 'flex',
  flexDirection: 'column',
  overflow: 'hidden',
  '@media (max-width: 600px)': {
    maxWidth: '80%',
  },
};

export default function Main({ projectId }) {
  const [project, setproject] = useState({ project: {}, loader: true });
  const config = {
    headers: {
      Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjYxZTZkZDcyZWIzYmQ5MzIyN2RhMGI5YiIsImlhdCI6MTY2MjY2NTY4OCwiZXhwIjoxNjY1MjU3Njg4fQ.V6Wg6QsqTEsZ1OQOOAIdiWLFkuDwS-qnopef1i9MiUI`,
    },
  };

  // fetch the data
  useEffect(() => {
    if (!projectId) return;
    axios
      .get(`http://localhost:8000/project/${projectId}`, config)
      .then((res) => setproject({ project: res.data.data, loader: false }));
    console.log(project);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [projectId]);

  const handleSearch = async () => {};
  const handleEditSubmit = async (e) => {};
  const handleProjectDelete = async (e) => {};
  const handleSave = async (v) => {};

  // confirmation modal
  const [ConfirmModal, setConfirmModal] = React.useState(false);

  // handle modal open
  const handleOpen = () => {
    setConfirmModal(true);
  };

  // handle modal close
  const handleClose = () => {
    setConfirmModal(false);
  };

  return !projectId ? (
    // No project selected///////////////////////////////////////////////
    <Box
      component="div"
      sx={{
        width: '70%',
        flexGrow: '1',
        overflowX: 'auto',
        overflowY: 'auto',
        margin: '10px 10px 10px 0',
      }}
    >
      <Paper
        component="div"
        elevation={3}
        sx={{
          display: 'flex',
          flexGrow: 1,
          justifyContent: 'center',
          alignItems: 'center',
          ml: 1,
          overflow: 'visible',
          height: '100%',
        }}
      >
        <Box component="img" src="/svgs/project.svg" sx={{ width: 100, height: 70, backgroundColor: 'white' }} />
        <Typography variant="h5">No Project Selected</Typography>
      </Paper>
    </Box>
  ) : (
    <>
      {
        project.loader ? (
          'loader'
        ) : (
          <Box
            component="div"
            sx={{
              width: '70%',
              flexGrow: '1',
              overflowX: 'hidden',
              overflowY: 'auto',
              m: 1,
            }}
          >
            {/* grid container 30 70 */}
            <Paper
              component="div"
              elevation={3}
              sx={{
                overflow: 'visible',
                height: '100%',
                position: 'relative',
                display: 'grid',
                gridTemplateRows: '30% 70%',
              }}
            >
              {/* Name///////////////////////// */}
              <Box sx={{ m: 1 }}>
                <TextField
                  sx={{ m: 1 }}
                  id="outlined-read-only-input"
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
                <hr />
                <div
                  style={{
                    // width: "100%",
                    // height: "4rem",
                    // float: "left",
                    // paddingTop: "20px",
                    display: 'gird',
                    // flexDirection: "column",
                    gridTemplateColumns: '60% 40%',

                    // justifyContent: "left",
                    // marginLeft: "2px",
                  }}
                >
                  <TextField
                    sx={{ m: 1 }}
                    disabled
                    id="standard-required"
                    label="Project Leader"
                    defaultValue={project.project.projectLeader ? project.project.projectLeader : 'No Project Leader'}
                    variant="standard"
                  />

                  <Modal
                    aria-labelledby="modal-modal-title"
                    aria-describedby="modal-modal-description"
                    sx={{
                      border: 'none',
                    }}
                  >
                    <Box sx={style}>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'space-between',
                          bgcolor: 'primary.lighter',
                          p: 2,
                        }}
                      >
                        <Typography variant="h4" color="primary">
                          Assign Project Leader
                        </Typography>
                        <IconButton>
                          <CloseIcon />
                        </IconButton>
                      </Box>
                      <Divider />
                      <Box
                        sx={{
                          px: 2,
                          py: 1,
                        }}
                      >
                        <Box
                          sx={{
                            display: 'flex',
                            alignItems: 'center',
                            mt: 1,
                          }}
                        >
                          <FormControl variant="filled" sx={{ m: 1 }} fullWidth>
                            <InputLabel id="demo-simple-select-filled-label">Select employee</InputLabel>
                            {true ? (
                              <Select
                                labelId="demo-simple-select-filled-label"
                                id="..demo-simple-select-filled"
                                onChange={handleSearch}
                              >
                                {[].map((member) => {
                                  return <MenuItem value={member._id}>{member}</MenuItem>;
                                })}
                              </Select>
                            ) : (
                              <Box>
                                <Typography>No employees in this project</Typography>
                                <Typography>Project leader role can only be assigned to employees.</Typography>
                              </Box>
                            )}
                          </FormControl>
                        </Box>
                      </Box>
                      <Box
                        sx={{
                          display: 'flex',
                          alignItems: 'center',
                          justifyContent: 'end',
                          bgcolor: 'grey.200',
                          p: 2,
                        }}
                      >
                        <Button
                          variant="contained"
                          color="success"
                          sx={{
                            mr: 2,
                          }}
                        >
                          Done
                        </Button>
                        <Button variant="outlined" color="primary">
                          Cancel
                        </Button>
                      </Box>
                    </Box>
                  </Modal>
                </div>
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'space-between',
                    marginTop: '2rem',
                  }}
                >
                  <Paper sx={{ pt: 1 }}>
                    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
                      <Typography variant="h6" sx={{ ml: 1, display: 'flex', alignItems: 'center' }}>
                        Total Project Hours :
                      </Typography>
                      <Typography sx={{ ml: 1 }}>
                        {1 <= 2 ? <Typography sx={{ pr: 8 }}>{} hr</Typography> : ''}
                      </Typography>
                    </Box>
                    <Box
                      sx={{
                        display: 'flex',
                        justifyContent: 'space-between',
                      }}
                    >
                      <Typography variant="h6" sx={{ pt: 1, ml: 1 }}>
                        Total Internal Hours :
                      </Typography>
                      <Typography sx={{ display: 'flex', alignItems: 'center', mr: 6, pt: 1 }}>
                        "internal hours" hr
                      </Typography>
                    </Box>
                  </Paper>
                  <Paper>
                    <Typography
                      variant="h6"
                      sx={{
                        display: 'flex',
                        flexDirection: 'row',
                        alignItems: 'center',
                        textAlign: 'center',
                        alignContent: 'center',
                        justifyItems: 'center',
                        justifyContent: 'center',
                        alignSelf: 'center',
                        pt: 3,
                      }}
                    >
                      <Typography
                        variant="h6"
                        style={{
                          display: 'inherit',
                          alignItems: 'center',
                        }}
                      >
                        BudgetHours :{' '}
                      </Typography>
                      <Typography sx={{ ml: 1 }}>
                        {1 <= 2 ? (
                          'nothing'
                        ) : (
                          <Typography
                            sx={{
                              display: 'flex',
                              flexDirection: 'row',
                              alignItems: 'center',
                              textAlign: 'center',
                              alignContent: 'center',
                              justifyItems: 'center',
                              justifyContent: 'center',
                              alignSelf: 'center',
                              pl: 1,
                            }}
                          >
                            {5} hr
                          </Typography>
                        )}
                      </Typography>
                    </Typography>
                  </Paper>
                </div>

                <Paper elevation={2} sx={{ pt: 1 }}>
                  <hr />

                  {/* <EnhancedTable
                clientsList={clientsList}
                currentProject={currentProject}
                currentClient={currentClient}
                outerref={outerref}
            /> */}
                </Paper>
              </Box>
            </Paper>
          </Box>
        )
        //   {/* <Confirmation
        //     open={ConfirmModal}
        //     handleClose={handleClose}
        //     onConfirm={handleProjectDelete}
        //     detail={{ type: 'Project', name: currentProject?.name }}
        // /> */}
      }
    </>
  );
}
