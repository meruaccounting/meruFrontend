// react components
import React, { useEffect, useState } from 'react';

// material ui components
import { Container, Box } from '@mui/system';
import { Button, Typography, Paper, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';

// OWN components
import Search from '../Search';
import AlertDialog from './AlertDialog';

// Columns name for table header
const columns = [
  { field: 'id', headerName: 'Project', width: 150 },
  { field: 'ProjectHours', headerName: 'Project Hours', width: 130 },
  { field: 'InternalHours', headerName: 'Internal Hours', width: 130 },
  {
    field: 'ProjectMembers',
    align: 'center',
    type: 'number',
    headerName: 'Project Memebers',
    width: 130,
  },
  {
    field: 'TotalHours',
    headerName: 'Total Hours',
    width: 130,
    // valueGetter: (params) =>
    //   `${params.row.firstName || ''} ${params.row.lastName || ''}`,
  },
];

// end of data

const Main = () => {
  // store
  const [displayDeleteIcon, setDisplayDeleteIcon] = useState(false);
  const [row, setRow] = useState([]);
  const [orginalRow, setOrginalRow] = useState([]);
  const [deleteRowIds, setDeleteRowIds] = useState([]);
  const [clientName, setClientName] = useState('Client Name');
  const [editClientName, setEditClientName] = useState(false);
  const [openDialog, setOpenDialog] = useState(false);

  useEffect(() => {
    const example = [
      { id: 'Project1', ProjectHours: '20hrs', InternalHours: '10hrs', ProjectMembers: 10, TotalHours: '10hrs' },
      { id: 'Project2', ProjectHours: '20hrs', InternalHours: '10hrs', ProjectMembers: 10, TotalHours: '10hrs' },
      { id: 'Project3', ProjectHours: '20hrs', InternalHours: '10hrs', ProjectMembers: 10, TotalHours: '10hrs' },
      { id: 'Project4', ProjectHours: '20hrs', InternalHours: '10hrs', ProjectMembers: 10, TotalHours: '10hrs' },
      { id: 'Project5', ProjectHours: '20hrs', InternalHours: '10hrs', ProjectMembers: 10, TotalHours: '10hrs' },
    ];
    setOrginalRow([...example]);
    setRow([...example]);
  }, []);

  // filter project as per user search
  const filterProject = (projectName) => {
    if (projectName === '') {
      setRow([...orginalRow]);
    } else {
      const filteredProjects = row.filter((projectInfo) => {
        const filterExpression = new RegExp(projectName, 'i');
        if (projectInfo.id.search(filterExpression) === -1) return false;
        return true;
      });
      setRow([...filteredProjects]);
    }
  };

  // To insert Rows that user has selected
  const filterRows = (ids) => {
    if (ids.length === 0) setDisplayDeleteIcon(false);
    else setDisplayDeleteIcon(true);
    setDeleteRowIds([...ids]);
  };

  // when user want to delete a or multiple row
  const deleteProjects = () => {
    const newRow = row.filter((ele) => !deleteRowIds.includes(ele.id));
    setRow([...newRow]);
  };

  // handleResponse From dialog to delete project or not
  const handleResponseFromDialog = (res) => {
    setOpenDialog(false);
    console.log(res);
  };

  return (
    <Container sx={{ width: '70%', paddingX: 2 }} disableGutters>
      {/* ------------------------------ heading and delete tags ------------------------------------------------------------------------*/}
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between' }}>
        {/* -----------------------------------------------------------------------------------
        Client Name components
        --------------------------------------------------------------------------------- */}
        <Box>
          {editClientName ? (
            <TextField
              id="client-Name"
              label="Client Name"
              variant="outlined"
              value={clientName}
              onChange={(event) => setClientName(event.target.value)}
              onBlur={() => setEditClientName(false)}
              onKeyDown={(event) => {
                if (event.key === 'Enter') setEditClientName(false);
              }}
            />
          ) : (
            <Typography variant="h3">{clientName}</Typography>
          )}
        </Box>
        <Box>
          <Button onClick={() => setEditClientName(true)}>
            <EditIcon color="action" />
          </Button>
          <Button onClick={() => setOpenDialog(true)}>
            <DeleteIcon color="action" />
          </Button>
        </Box>
      </Box>

      {/* ---------------------------------------------------------
      Assign Project Heading
      ------------------------------------------------------------*/}
      <Typography sx={{ color: 'green', marginTop: 2, fontWeight: 'bold' }}>Assign Projects</Typography>

      {/* ----------------------------------------------- Create date and creator name -------------------------------------------------------- */}
      <Box sx={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginTop: 2 }}>
        <Box>
          <Typography variant="h6">Created On: {'03/02/2000'}</Typography>
        </Box>
        <Box>
          <Typography variant="h6">Created By: {'QWERTY'}</Typography>
        </Box>
      </Box>

      {/* ------------------------------------------------- Project list ------------------------------------------------------ */}
      <Box sx={{ marginTop: 4 }}>
        <Search labelName={'Search Project'} sendDataToParent={filterProject} frequent />
        {/* --------------------------------------------------------------------------
        Delete icon is here
      -----------------------------------------------------------------------------*/}
        {displayDeleteIcon && (
          <Box sx={{ display: 'flex', justifyContent: 'flex-end', backgroundColor: 'rgba(32, 101, 209, 0.16)' }}>
            <Button onClick={deleteProjects}>
              <DeleteIcon color="action" />
            </Button>
          </Box>
        )}
        <Paper style={{ maxHeight: '40vh', overflow: 'auto', marginTop: 2 }}>
          <div style={{ height: 400, width: '100%' }}>
            <DataGrid
              rows={row}
              columns={columns}
              pageSize={5}
              rowsPerPageOptions={[5]}
              checkboxSelection
              onSelectionModelChange={filterRows}
            />
          </div>
        </Paper>
      </Box>

      {/* Dialog box components */}
      <AlertDialog sendToParent={handleResponseFromDialog} dialogStatus={openDialog} />
    </Container>
  );
};

export default Main;
