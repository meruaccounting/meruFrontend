// react and other public library
import React, { useState } from 'react';

// mui components
import { Container, Checkbox, Autocomplete, TextField, Typography, IconButton, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';
import CheckBoxOutlineBlankIcon from '@mui/icons-material/CheckBoxOutlineBlank';
import CheckBoxIcon from '@mui/icons-material/CheckBox';

// own components

export default function AddMember() {
  // store
  const [addMember, setAddMember] = useState(false);
  // get list for memebers from teams store

  const icon = <CheckBoxOutlineBlankIcon fontSize="small" />;
  const checkedIcon = <CheckBoxIcon fontSize="small" />;

  const handleAddMembers = () => {
    setAddMember(false);
  };

  return (
    <>
      {addMember ? (
        <Container disableGutters sx={{ display: 'flex', alignItems: 'center' }}>
          <Autocomplete
            multiple
            limitTags={2}
            disableCloseOnSelect
            options={top100Films}
            getOptionLabel={(option) => option.title}
            renderOption={(props, option, { selected }) => (
              <li {...props}>
                <Checkbox icon={icon} checkedIcon={checkedIcon} style={{ marginRight: 8 }} checked={selected} />
                {option.title}
              </li>
            )}
            renderInput={(params) => <TextField {...params} label="Employees" placeholder="Employees" />}
            sx={{ width: '50%' }}
          />
          <Button variant="contained" sx={{ height: 50, m: 1 }} onClick={handleAddMembers}>
            Add
          </Button>
        </Container>
      ) : (
        <Container sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }} disableGutters>
          <Typography variant="h4">
            Project Members
            <IconButton sx={{ ml: -0.5 }} onClick={() => setAddMember(true)}>
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Typography>
        </Container>
      )}
    </>
  );
}

const top100Films = [
  { title: 'The Shawshank Redemption', year: 1994 },
  { title: 'The Godfather', year: 1972 },
  { title: 'The Godfather: Part II', year: 1974 },
  { title: 'The Dark Knight', year: 2008 },
  { title: '12 Angry Men', year: 1957 },
  { title: "Schindler's List", year: 1993 },
  { title: 'Pulp Fiction', year: 1994 },
  {
    title: 'The Lord of the Rings: The Return of the King',
    year: 2003,
  },
  { title: 'The Good, the Bad and the Ugly', year: 1966 },
  { title: 'Fight Club', year: 1999 },
  {
    title: 'The Lord of the Rings: The Fellowship of the Ring',
    year: 2001,
  },
  {
    title: 'Star Wars: Episode V - The Empire Strikes Back',
    year: 1980,
  },
  { title: 'Forrest Gump', year: 1994 },
  { title: 'Inception', year: 2010 },
  {
    title: 'The Lord of the Rings: The Two Towers',
    year: 2002,
  },
  { title: "One Flew Over the Cuckoo's Nest", year: 1975 },
  { title: 'Goodfellas', year: 1990 },
  { title: 'The Matrix', year: 1999 },
  { title: 'Seven Samurai', year: 1954 },
  {
    title: 'Star Wars: Episode IV - A New Hope',
    year: 1977,
  },
];
