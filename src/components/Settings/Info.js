import React, { useEffect, useState } from 'react';

// mui components
import { Container, Typography } from '@mui/material';

const Info = ({ msg }) => {
  const [title, setTitle] = useState('');
  const [desc, setDesc] = useState('');
  useEffect(() => {
    setTitle(msg.title);
    setDesc(msg.desc);
  }, [msg]);

  return (
    <Container disableGutters>
    {/* ---------------------------------------------------------------------------
    Heading and Defination
    -------------------------------------------------------------------------------- */}
      <Typography variant="h3">{title}</Typography>
      <Typography sx={{backgroundColor:"success.main", px:1, py:2}}>{desc}</Typography>
    </Container>
  );
};

export default Info;
