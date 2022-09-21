import React, { useState} from 'react';

// mui components
import { Paper, Box, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import AddMemeber from './AddMemeber';


const columns = [
    {
      field: 'id',
      headerName: 'Sno.',
      width: 150,
    },
    {
      field: 'name',
      headerName: 'Name',
      width: 150,
    },
    {
      field: 'projectHours',
      headerName: 'Project Hours',
      width: 130,
    },
    {
      field: 'internalHours',
      headerName: 'Internal Hours',
      width: 130,
    },
    {
      field: 'budgetHours',
      headerName: 'Budget Hours',
      width: 130,
    },
  ];

const ProjectData = () => {

    const [rows, setrows] = useState([{id:1,name:"Prashant", projectHours: 10, internalHours: 10 , budgetHours:10}]);
    const [filteredRows, setfilteredRows] = useState([{id:1,name:"Prashant", projectHours: 10, internalHours: 10 , budgetHours:10}]);

    // filter project as per user search
    const handleSearch = (e) => {
        // convert input text to lower case
        const lowerCase = e.target.value.toLowerCase();
        const data = rows.filter((row) => {
          // if no input the return the original
          if (lowerCase === '') {
            setfilteredRows(row);
            return row;
          }
          // return the item which contains the user input
          return row.name.toLowerCase().includes(lowerCase);
        });
        setfilteredRows(data);
      };

  return (
    <Box sx={{ mt: 2 }}>
        <Box sx={{ display:"flex", alignItems:"center", justifyContent:"space-between" }}>
            <AddMemeber/>
          <TextField
          sx={{ml: 2}}
            InputProps={{
              endAdornment: <SearchIcon />,
            }}
            onChange={handleSearch}
            label="Search"
          />
        </Box>
  
        <Paper sx={{ overflow: 'auto' }}>
          <DataGrid
            disableSelectionOnClick
            sx={{ height: 480 }}
            rows={filteredRows}
            columns={columns}
            pageSize={5}
            rowsPerPageOptions={[5]}
            getRowId={columns.name}
            checkboxSelection
          />
        </Paper>
      </Box>
  )
}

export default ProjectData