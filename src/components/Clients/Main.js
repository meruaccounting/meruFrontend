// react components
import React, { useEffect, useState } from 'react';

// material ui components
import { Container, Box } from '@mui/system';
import { Button, Paper, Tooltip } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import DeleteIcon from '@mui/icons-material/Delete';

// OWN components
import Search from '../Search';
import ClientInfo from './ClientInfo';
import { getClientByIdApi } from './apiCalls';

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
  },
];

// end of data

export default function Main({ clientId }) {
  // store
  const [displayDeleteIcon, setDisplayDeleteIcon] = useState(false);
  const [row, setRow] = useState([]);
  const [orginalRow, setOrginalRow] = useState([]);
  const [deleteRowIds, setDeleteRowIds] = useState([]);
  const [clientInfo, setClientInfo] = useState({});

  // to fill data in datagrid and set clientName and other things
  const setClientProjects = async (Id) => {
    if (Id)
      try {
        const clientProjects = await getClientByIdApi(Id);
        if (typeof clientProjects === 'object') {
          setClientInfo({
            id: clientProjects._id,
            name: clientProjects.name,
            createdAt: clientProjects.createdAt,
            createdBy: clientProjects.createdBy,
          });
        }
        console.log(clientProjects);
      } catch (error) {
        console.log(error);
      }
  };

  useEffect(() => {
    setClientProjects(clientId);
    // const example = [
    //   { id: 'Project1', ProjectHours: '20hrs', InternalHours: '10hrs', ProjectMembers: 10, TotalHours: '10hrs' },
    //   { id: 'Project2', ProjectHours: '20hrs', InternalHours: '10hrs', ProjectMembers: 10, TotalHours: '10hrs' },
    //   { id: 'Project3', ProjectHours: '20hrs', InternalHours: '10hrs', ProjectMembers: 10, TotalHours: '10hrs' },
    //   { id: 'Project4', ProjectHours: '20hrs', InternalHours: '10hrs', ProjectMembers: 10, TotalHours: '10hrs' },
    //   { id: 'Project5', ProjectHours: '20hrs', InternalHours: '10hrs', ProjectMembers: 10, TotalHours: '10hrs' },
    // ];
    // setOrginalRow([...example]);
    // setRow([...example]);
  }, [clientId]);

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

  return (
    <Container sx={{ width: '70%', paddingX: 2 }} disableGutters>
      {/*  ----------------------------------------------------------
    to display client Information 
   ------------------------------------------------------------- */}
      <ClientInfo clientInfo={clientInfo} />

      {/* ------------------------------------------------- Project list ------------------------------------------------------ */}
      <Box sx={{ marginTop: 4 }}>
        <Search labelName={'Search Project'} sendDataToParent={filterProject} frequent />
        {/* --------------------------------------------------------------------------
        Delete icon is here
      -----------------------------------------------------------------------------*/}
        {displayDeleteIcon && (
          <Box
            sx={{
              display: 'flex',
              justifyContent: 'flex-end',
              backgroundColor: 'rgba(32, 101, 209, 0.16)',
              marginTop: 1,
            }}
          >
            <Tooltip title="Delete Choosen Project">
              <Button onClick={deleteProjects}>
                <DeleteIcon color="action" />
              </Button>
            </Tooltip>
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
    </Container>
  );
}
