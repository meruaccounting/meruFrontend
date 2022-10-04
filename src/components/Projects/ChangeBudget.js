// react and other importanat library
import React, { useState } from 'react';

// mui components
import { Box, Container, Input, Paper, Typography } from '@mui/material';
import EditIcon from '@mui/icons-material/Edit';

const ChangeBudget = () => {
  // store
  const [edit, setEdit] = useState(false);
  const [projectHrs, setProjectHrs] = useState(0);
  const [internalHrs, setInternalHrs] = useState(0);
  const [budgetHrs, setBudgetHrs] = useState(0);
  const [budgetMoney, setBudgetMoney] = useState(0);
  const [BudgetPeriod, setBudgetPeBudgetPeriod] = useState('Monthly');
  const [editNumber, setEditNumber] = useState(-1);

  return (
    <Box flexGrow={1}>
      <Container disableGutters sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Container disableGutters>
          <Typography variant="h5">Total Project Hours : {projectHrs}hrs</Typography>
          <Typography variant="h5">Total Internal Hours : {internalHrs}hrs</Typography>
        </Container>
        <Container disableGutters>
          <Paper sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
            <Typography variant="h5">
              Budget Hours :{editNumber === 1 ? <Input sx={{ width: 50 }} value={budgetHrs} /> : budgetHrs}hrs
            </Typography>
            <EditIcon onClick={() => setEditNumber(1)} />
          </Paper>
          <Paper sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
            <Typography variant="h5">
              BudgetMoney : {editNumber === 2 ? <Input sx={{ width: 50 }} value={budgetMoney} /> : budgetMoney} Rs{' '}
            </Typography>{' '}
            <EditIcon onClick={() => setEditNumber(2)} />
          </Paper>
          <Paper sx={{ display: 'flex', justifyContent: 'space-between', alignContent: 'center' }}>
            <Typography variant="h5">
              BudgetPeriod : {editNumber === 3 ? <Input sx={{ width: 100 }} value={BudgetPeriod} /> : BudgetPeriod}{' '}
            </Typography>{' '}
            <EditIcon onClick={() => setEditNumber(3)} />
          </Paper>
        </Container>
      </Container>
    </Box>
  );
};

export default ChangeBudget;
