// react and other public library
import React, { useState } from 'react';

// mui components
import { Container, Autocomplete, TextField, Typography, IconButton, Button } from '@mui/material';
import AddCircleIcon from '@mui/icons-material/AddCircle';

// own components

const AddMemeber = () => {
  // store
  const [addMember, setAddMember] = useState(false);

  return (
    <>
      {addMember ? (
        <Container disableGutters sx={{  borderTop: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          <Autocomplete
            multiple
            limitTags={2}
            id="multiple-limit-tags"
            options={top100Films}
            getOptionLabel={(option) => option.title}
            defaultValue={[top100Films[13], top100Films[12], top100Films[11]]}
            renderInput={(params) => <TextField {...params} label="limitTags" placeholder="Favorites" />}
            sx={{ width: '100%', my: 2 }}
          />
          <Button variant="contained" color="success" sx={{height:50}} onClick={()=> setAddMember(false)}>Add Members</Button>
        </Container>
      ) : (
        <Container
          sx={{ borderTop: '1px solid', display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}
          disableGutters
        >
          <Typography variant="h4">
            Project Members
            <IconButton size="large" onClick={() => setAddMember(true)}>
              <AddCircleIcon fontSize="large" />
            </IconButton>
          </Typography>
        </Container>
      )}
    </>
  );
};

export default AddMemeber;

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
