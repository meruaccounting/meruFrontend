import React, { useState, useEffect } from 'react';
import axios from 'axios';

// mui components
import { Paper, Box, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';
import AddMember from './AddMember';

// -------------------------------------------------------------

const columns = [
  {
    field: 'name',
    headerName: 'Employee',
    width: 150,
  },
  {
    field: 'internalTime',
    headerName: 'Internal Time',
    width: 130,
  },
  {
    field: 'externalTime',
    headerName: 'External Time',
    width: 130,
  },
  {
    field: 'totalTime',
    headerName: 'Total Time',
    width: 130,
  },
];

export default function ProjectTime({ projectId }) {
  const [rows, setrows] = useState([]);
  const [filteredRows, setfilteredRows] = useState([]);

  // useEffect(() => {
  //   axios.get(`/project/getTime/${projectId}`).then((res) => {
  //     console.log(res.data.data);
  //     setrows(res.data.data.employeeTime);
  //     setfilteredRows(res.data.data.employeeTIme);
  //   });
  // }, [projectId]);

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
    <Box sx={{ mt: 4 }}>
      <Box sx={{ m: 1, display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <AddMember />
        {/* search box */}
        <TextField
          sx={{ ml: 2, width: 400 }}
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
  );
}
