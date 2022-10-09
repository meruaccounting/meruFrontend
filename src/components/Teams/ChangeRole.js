import * as React from 'react';
import { Radio, Box, Typography, TextField } from '@mui/material';
import RadioGroup from '@mui/material/RadioGroup';
import FormControlLabel from '@mui/material/FormControlLabel';
import FormControl from '@mui/material/FormControl';
import FormLabel from '@mui/material/FormLabel';
import axios from 'axios';

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
    </Box>
  );
}
