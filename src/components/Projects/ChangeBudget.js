// react and other importanat library
import React, { useState } from 'react';

// mui components
import { Box, Paper, Container, Input, Typography, IconButton } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ChangeBudget = () => {
  // store
  const [edit, setEdit] = useState(false);
  const [projectHrs, setProjectHrs] = useState(0);
  const [internalHrs, setInternalHrs] = useState(0);
  const [budgetHrs, setBudgetHrs] = useState(0);

  return (
    <Paper>
      <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
        <Container disableGutters>
          <Typography variant="h5">
            Total Project Hours :{' '}
            {edit ? (
              <Input
                type="number"
                sx={{ width: 100, height: 20 }}
                onChange={(event) => setProjectHrs(event.target.value)}
                value={projectHrs}
              />
            ) : (
              projectHrs
            )}{' '}
            hrs
          </Typography>
          <Typography variant="h5">
            Total Internal Hours :{' '}
            {edit ? (
              <Input
                type="number"
                sx={{ width: 100, height: 20 }}
                onChange={(event) => setInternalHrs(event.target.value)}
                value={internalHrs}
              />
            ) : (
              internalHrs
            )}{' '}
            hrs
          </Typography>
        </Container>
        <Container sx={{ display: 'flex', alignItems: 'center', justifyContent: 'end' }} disableGutters>
          <Typography variant="h5">
            BudgetHours :{' '}
            {edit ? (
              <Input
                type="number"
                sx={{ width: 100, height: 20 }}
                onChange={(event) => setBudgetHrs(event.target.value)}
                value={budgetHrs}
              />
            ) : (
              budgetHrs
            )}{' '}
            hrs
          </Typography>
          <IconButton sx={{ ml: 2 }} onClick={() => setEdit(!edit)}>
            <EditIcon />
          </IconButton>
        </Container>
      </Box>
    </Paper>
  );
};

export default ChangeBudget;
