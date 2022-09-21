import React, { useState } from 'react';

import { Autocomplete, TextField } from '@mui/material';


const names = [
  'Oliver Hansen',
  'Van Henry',
  'April Tucker',
  'Ralph Hubbard',
  'Omar Alexander',
  'Carlos Abbott',
  'Miriam Wagner',
  'Bradley Wilkerson',
  'Virginia Andrews',
  'Kelly Snyder',
];


export default function SearchField({callback}) {
  const [userName, setUserName] = useState([...names]);

  const handleChange = (event, newValue) => {
    console.log(newValue)
    callback(newValue)
  };

  return (
      <Autocomplete
      multiple
      limitTags={3}
      id="multiple-limit-tags"
      onChange={handleChange} 
      options={userName}
      getOptionLabel={(option) => option}
      renderInput={(params) => (
        <TextField {...params} label="Users" placeholder="Users"/>
      )}
      sx={{my:2}}
    />
  );
}
