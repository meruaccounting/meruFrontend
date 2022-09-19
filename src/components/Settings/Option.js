// react and other libraries
import React, { useState } from 'react';

// mui components
import { Container, Box } from '@mui/system';
import { Radio, Switch, Typography, TextField } from '@mui/material';

const Option = ({ radioLabel, inputLabel, callback, userDetail }) => {
  // store
  const [formVisible, setFormVisible] = useState(false);
  const [selectedValue, setSelectedValue] = useState('a');
  const [value, setValue] = useState(inputLabel.value);

  // to store and handle change in input
  const handleText = (event) => {
    setValue(event.target.value);
  };

  // to control radio option either true or false
  const handleChange = (event) => {
    setSelectedValue(event.target.value);
  };

  return (
    <Box sx={{ display: 'flex', justifyContent: 'start', flexDirection: 'row', my: 4 }}>
      {/* ------------------------------------------------------------------------------------
      
      to display user name and toggle buttons 

      --------------------------------------------------------------------------------- */}
      <Container disableGutters sx={{ display: 'flex', alignItems: 'center', width: formVisible ? '30%' : '100%' }}>
        <Switch
          checked={formVisible}
          onChange={() => {
            setFormVisible(!formVisible);
          }}
          inputProps={{ 'aria-label': 'controlled' }}
        />
        <Typography>{userDetail}</Typography>
      </Container>

      {/* --------------------------------------------------------------------------------------
      options and textfield  for userinput  
    --------------------------------------------------------------------------------------- */}
      {formVisible && (
        <Container sx={{ display: 'flex', alignItems: 'center' }} disableGutters>
          {radioLabel.visible &&<><Radio
            checked={selectedValue === 'a'}
            onChange={handleChange}
            value="a"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'A' }}
          />
          <span>{radioLabel.first}</span> </>}
          {/* -------------------------------------------------------------------
          if input is visible then it will be displayed on screen
          ------------------------------------------------------------------------- */}
          {inputLabel.visible && (
            <TextField
              id="outlined-basic"
              label={inputLabel.label}
              variant="outlined"
              sx={{ mx: 1 }}
              value={value}
              onChange={handleText}
            />
          )}

          {/* --------------------------------------------------------------------------------------
      options and textfield  for userinput  
    --------------------------------------------------------------------------------------- */}
        {radioLabel.visible && <>
          <Radio
            checked={selectedValue === 'b'}
            onChange={handleChange}
            value="b"
            name="radio-buttons"
            inputProps={{ 'aria-label': 'B' }}
          />
          <span>{radioLabel.second}</span>
          </>}
        </Container>
      )}
    </Box>
  );
};

export default Option;
