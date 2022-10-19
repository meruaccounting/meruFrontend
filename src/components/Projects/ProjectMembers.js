import React, { useEffect, useState } from 'react';
import axios from 'axios';

// mui components
import { Box, Link, Divider, Switch, Typography, TextField } from '@mui/material';

function ToggleMember({ user, project }) {
  return (
    <Box sx={{ mt: 2 }} key={user._id}>
      <Box sx={{ display: 'flex' }}>
        <Switch onChange={(e) => console.log(e.target.value)} defaultChecked={user._id in project.project.employees} />
        <Typography variant="h5">{user.name}</Typography>
      </Box>
      <Divider dark />
    </Box>
  );
}

export default function ProjectMembers({ project }) {
  console.log(project);
  const [users, setusers] = useState([]);
  const [filteredUsers, setfilteredUsers] = useState([]);

  useEffect(() => {
    axios.get('/employee/all').then((res) => {
      setusers(res.data.data);
      setfilteredUsers(res.data.data);
    });

    console.log(project.project.employees);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSearch = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    const data = users.filter((user) => {
      // if no input the return the original
      if (lowerCase === '') {
        setfilteredUsers(users);
        return user;
      }
      // return the item which contains the user input
      return user.name.toLowerCase().includes(lowerCase);
    });
    setfilteredUsers(data);
  };

  const addMember = (e, employeeId) => {
    let editType = 'remove';
    if (e.target.checked) editType = 'add';
    // convert input text to lower case
    axios
      .patch(`project/members/${editType}/${project.project._id}`, { employeeId })
      .then((res) => {
        console.log(res);
      })
      .catch((error) => console.log(error));
  };

  return (
    <Box sx={{ overflowY: 'auto' }}>
      <Box sx={{ overflow: 'auto', display: 'flex', justifyContent: 'space-between', mt: 5, mb: 1 }}>
        <Box>
          <Typography variant="h4">Project Members</Typography>
          <Link underline="hover" sx={{ cursor: 'pointer', pr: 1 }}>
            Add all
          </Link>
          <Link underline="hover" sx={{ cursor: 'pointer', pr: 1 }}>
            Remove all
          </Link>
        </Box>
        <TextField
          // InputProps={{
          //   endAdornment: <SearchIcon />,
          // }}
          onChange={handleSearch}
          label="Search"
        />
      </Box>
      {filteredUsers.map((user) => (
        <Box component="div" sx={{ mt: 2, overflowY: 'auto' }} key={user._id}>
          <Box sx={{ display: 'flex' }}>
            <Switch
              onClick={(e) => addMember(e, user._id)}
              defaultChecked={project.project.employees.includes(user._id)}
            />
            <Typography variant="h5">{user.name}</Typography>
          </Box>
          <Divider dark />
        </Box>
      ))}
    </Box>
  );
}
