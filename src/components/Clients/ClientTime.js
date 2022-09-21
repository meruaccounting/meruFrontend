import React, { useState, useEffect } from 'react';
import axios from 'axios';

// mui components
import { Paper, Box, TextField } from '@mui/material';
import { DataGrid } from '@mui/x-data-grid';
import SearchIcon from '@mui/icons-material/Search';

// OWN components
import Search from '../Search';

//-------------------------------------------------------------------------------------------------------------------

const columns = [
  {
    field: 'name',
    headerName: 'Project',
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

export default function ClientTime({ clientId }) {
  const [rows, setrows] = useState([]);
  const [filteredRows, setfilteredRows] = useState([]);

  useEffect(() => {
    axios.get(`/client/getTime/${clientId}`).then((res) => {
      console.log(res.data.data);
      setrows(res.data.data.projectTime);
      setfilteredRows(res.data.data.projectTime);
    });
  }, [clientId]);

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
      <Box sx={{ m: 1 }}>
        <TextField
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
        />
      </Paper>
    </Box>
  );
}
