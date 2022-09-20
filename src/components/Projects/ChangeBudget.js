import React, { useState } from 'react';
import axios from 'axios';

// mui components
import { Input, InputLabel, InputAdornment, TextField } from '@mui/material';

export default function ChangeBudget() {
  const [amount, setamount] = useState();
  const [timePeriod, settimePeriod] = useState('Month');

  const handleAmountChange = () => {};
  const handleTimePeriodChange = () => {};
  const handleTimeChange = () => {};
  const timePeriods = ['Week', 'Month'];

  return (
    <>
      <TextField
        onChange={handleTimePeriodChange}
        SelectProps={{
          native: true,
        }}
        options={timePeriods}
        select
        label="Time Period Select"
      >
        {timePeriods.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </TextField>
      <InputLabel htmlFor="standard-adornment-amount">Budget Amount</InputLabel>
      <Input
        id="standard-adornment-amount"
        value={amount}
        onChange={handleAmountChange}
        startAdornment={<InputAdornment position="start">$</InputAdornment>}
      />

      <InputLabel htmlFor="standard-adornment-amount">Budget Time</InputLabel>
      <Input
        id="standard-adornment-amount"
        value={amount}
        onChange={handleTimeChange}
        endAdornment={<InputAdornment position="start">Hrs</InputAdornment>}
      />
    </>
  );
}
