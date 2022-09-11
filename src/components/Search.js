// React components
import React, { useState } from 'react';

// MaterialUi Components
import { TextField } from '@mui/material';

const Search = ({ sendDataToParent, frequent, labelName, fullWidth }) => {
  // store
  const [data, setData] = useState('');
  
  // to store the data that user put in search bar
  const handleChange = (event) => {
    setData(event.target.value);
    if(frequent){
      sendDataToParent(event.target.value)
    }
  };

  // when user clicks Enter it send back data to calling coompnents
  const sendData = (event) => {
    if (event.key === 'Enter') {
      sendDataToParent(data);
      setData('');
    }
  };

  // components
  return (
    <TextField
      id="outlined-basic"
      label={labelName}
      variant="outlined"
      onChange={handleChange}
      onKeyDown={sendData}
      value={data}
      fullWidth = {fullWidth}
    />
  );
};

export default Search;
