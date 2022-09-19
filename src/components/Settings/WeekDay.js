// react and other popular library
import React, { useState, useEffect } from 'react';

// mui component
import { Box } from '@mui/system';
import { InputLabel, FormControl, MenuItem, Select, Switch, Container, Typography } from '@mui/material';

const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

const WeekDay = ({userDetail}) => {
  //   store
  const [weekDays, setWeekDays] = useState('');
  const [formVisible, setFormVisible] = useState(false)

  useEffect(() => {
    const date = Date.now();
    const d = new Date(date);
    setWeekDays(days[d.getDay()]);
  }, []);

  const handleChange = (event) => {
    setWeekDays(event.target.value);
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
     {formVisible&& <FormControl fullWidth>
        <InputLabel id="demo-simple-select-label">Age</InputLabel>
        <Select labelId="Weeks-day" id="Weeks-day" value={weekDays} label="Day" onChange={handleChange}>
          {days.map((day) => (
            <MenuItem value={day} key={day}>
              {day}
            </MenuItem>
          ))}
        </Select>
      </FormControl>}
    </Box>
  );
};

export default WeekDay;
