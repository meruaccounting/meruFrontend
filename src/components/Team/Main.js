import React, { useState } from 'react';

import { Button, Container, Box, Checkbox, TextField, Autocomplete, Typography } from '@mui/material';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

import {teamData} from "./seed"
import UserInfo from './UserInfo';


const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;

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

const Main = ({ teamId }) => {
  const [addMember, setAddMember] = useState(false);

  const [userName, setUserName] = useState([...names]);

  const handleChange = (event, newValue) => {
    // console.log(newValue)
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setAddMember(false)
    // console.log(userName)
  };

  return (
    <Container disableGutters sx={{ py: 2 }}>
      <Box>
        <Container>
          {addMember ? (
            <Autocomplete
              multiple
              limitTags={3}
              id="multiple-limit-tags"
              onChange={handleChange}
              onBlur={handleSubmit}
              options={userName}
              disableCloseOnSelect
              size="medium"
              getOptionLabel={(option) => option}
              renderOption={(props, option, { selected }) => (
                <li {...props}>
                  <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                  {option}
                </li>
              )}
              renderInput={(params) => <TextField {...params} label="Users" placeholder="Users" />}
              sx={{ my: 2 }}
            />
          ) : (
            <Button variant="contained" onClick={() => setAddMember(true)}>
              Add Members
            </Button>
          )}
        </Container>

        <Container>
          {teamData.data[0].members.map((ele) =><UserInfo userData={ele}/>)}
            
        </Container>
      </Box>
    </Container>
  );
};

export default Main;
