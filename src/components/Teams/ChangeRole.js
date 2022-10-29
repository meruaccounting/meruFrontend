import * as React from 'react';
import { Radio, Box, Typography, TextField, Switch } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';

// -----------------------------------------------------------------

function ToggleSettings({ user }) {
  const [toggle, settoggle] = React.useState(false);
  const [take, settake] = React.useState(0);

  const handleTakeChange = (e) => {
    settake(e.target.value);
  };
  return (
    <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
      <Box sx={{ display: 'flex' }}>
        <Switch onClick={() => settoggle(!toggle)} checked={toggle} />
        <Typography variant="h5">{user.name}</Typography>
      </Box>
      {toggle && (
        <FormControl>
          <RadioGroup onChange={handleTakeChange} row name="takeScreenshots" value={take}>
            <FormControlLabel value={1} control={<Radio />} label="Track" />

            <FormControlLabel value={0} control={<Radio />} label="Do not track" />
          </RadioGroup>
        </FormControl>
      )}
    </Box>
  );
}

export default function ChangeRole({ user }) {
  const [value, setvalue] = React.useState(user.user.role);

  React.useEffect(() => {
    setvalue(user.user.role);
  }, [user]);

  const handleRadioChange = (event) => {
    // call api before local change
    axios.patch(`/employee/edit/${user.user._id}`, { role: event.target.value }).then((res) => {
      setvalue(event.target.value);
    });
    // local change
  };

  return (
    <Box sx={{ mt: 1 }} component="div">
      <FormControl>
        <FormLabel sx={{ typography: 'h5', mt: 2 }}>Role</FormLabel>
        <RadioGroup onChange={handleRadioChange} value={value} name="role">
          <FormControlLabel value="employee" control={<Radio />} label="Employee" />
          <FormControlLabel value="projectLeader" control={<Radio />} label="Project Leader" />
          <FormControlLabel value="manager" control={<Radio />} label="Manager" />
          <FormControlLabel value="admin" control={<Radio />} label="Admin" />
        </RadioGroup>
      </FormControl>

      {value === 'manager' && (
        <Box>
          <TextField
            // InputProps={{
            //   endAdornment: <SearchIcon />,
            // }}
            // onChange={handleSearch}
            label="Search"
          />
          <Box sx={{ mt: 2 }} key={user._id}>
            <ToggleSettings user={user} />
          </Box>
        </Box>
      )}
    </Box>
  );
}
