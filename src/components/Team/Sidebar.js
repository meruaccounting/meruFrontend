import React, { useState, useEffect } from 'react';

// mui components
import { Paper, Typography, CircularProgress, Box, TextField, Autocomplete, Grid, Checkbox } from '@mui/material';
import { TreeItem, TreeView, LoadingButton } from '@mui/lab';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { Container } from '@mui/system';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';
import DeleteIcon from '@mui/icons-material/Delete';

// own components
import FloatingForm from './FloatingForm';

// iconn constants
const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
const checkedIcon = <CheckBoxIcon fontSize="small" />;
// styles
const rootPaper = {
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};
const listBoxLoader = {
  margin: 'auto',
  display: 'flex',
  flexGrow: '1',
  alignItems: 'center',
  justifyContent: 'center',
};

// temprary data
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

const Sidebar = ({ setTeamId }) => {
  // it will be used to get data from store
  const team = {
    loader: false,
    team: [
      { _id: 1, name: 'Team1' },
      { _id: 2, name: 'Team2' },
      { _id: 3, name: 'Team3' },
      { _id: 4, name: 'Team4' },
    ],
  };
  // store
  const [filteredData, setFilteredData] = useState([...team.team]);
  const userName = names;

  // all user selected will be stored here
  const handleChange = (event, newValue) => {
    console.log(newValue);
  };

  // for searching teams
  const handleSearch = (e) => {
    // convert input text to lower case
    const lowerCase = e.target.value.toLowerCase();
    const data = team.team.filter((team) => {
      // if no input the return the original
      if (lowerCase === '') {
        setFilteredData(team);
        return team;
      }
      // return the item which contains the user input
      return team.name ? team.name.toLowerCase().includes(lowerCase) : team.name;
    });
    setFilteredData(data);
  };

  // to delete team
  const handleDelete =  async(id) => {
    // send request to delete 
  }

  //   to sent request to add members
  const handleSubmit = async (e) => {
    e.preventDefault();
  };

  return (
    <Container sx={{ width: '30%', m: 1, mr: 0.5 }} disableGutters>
      <Paper component="div" elevation={3} sx={rootPaper}>
        {/* search component */}
        <Grid container spacing={1}>
          <Grid item xs={9}>
            <TextField
              InputProps={{
                endAdornment: <SearchIcon />,
              }}
              onChange={handleSearch}
              label="Search Members"
              fullWidth
            />
          </Grid>
          <Grid item xs={2}>
            <FloatingForm toolTip="Add Team" color="primary" icon={<AddIcon />}>
              <Autocomplete
                multiple
                disableCloseOnSelect
                limitTags={3}
                id="multiple-limit-tags"
                onChange={handleChange}
                options={userName}
                getOptionLabel={(option) => option}
                renderOption={(props, option, { selected }) => (
                  <li {...props}>
                    <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                    {option}
                  </li>
                )}
                renderInput={(params) => <TextField {...params} label="Users" placeholder="Users" />}
                sx={{ my: 2, minWidth: '250px' }}
              />
              <LoadingButton fullWidth type="submit" loading loadingPosition="end" variant="contained" sx={{ my: 1 }}>
                Add Team
              </LoadingButton>
            </FloatingForm>
          </Grid>
        </Grid>

        {/* -------------------------------------------------------------TreeView component -------------------------------------------------------------------------------- */}
        {team.loader ? (
          <CircularProgress sx={listBoxLoader} />
        ) : (
          <Box
            component="div"
            sx={{
              display: 'flex',
              flexDirection: 'column',
              flexGrow: '1',
              alignItems: 'flex-start',
              overflowY: 'auto',
            }}
          >
            <TreeView
              aria-label="Clients Treeview"
              defaultCollapseIcon={<ExpandMoreIcon />}
              defaultExpandIcon={<ChevronRightIcon />}
              sx={{
                flexGrow: 1,
                overflowY: 'auto',
                width: '100%',
              }}
            >
              {filteredData.length
                ? filteredData.map((team) => (
                    <TreeItem
                      onClick={() => setTeamId(team._id)}
                      nodeId={(team._id ? team._id : 1).toString()}
                      label={
                        <Box sx={{ display: 'flex', alignItems: 'center', p: 0.5, pr: 0 }} >
                          <Typography
                            sx={{
                              color: '#637381',
                              fontSize: '1.5rem',
                              fontWeight: '700',
                              flexGrow: 1,
                            }}
                          >
                            {team._id ? team.name : 'No Teams'}
                          </Typography>
                          <DeleteIcon onClick={() => handleDelete(team._id)}/>
                        </Box>
                      }
                      key={team._id}
                    />
                  ))
                : 'No Teams'}
            </TreeView>
          </Box>
        )}
      </Paper>
    </Container>
  );
};

export default Sidebar;
