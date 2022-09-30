import React, { useState } from 'react';
import TextField from '@mui/material/TextField';
import DateRangePicker from '@mui/lab/DateRangePicker';
import dayjs from 'dayjs';
import AdapterDayjs from '@mui/lab/AdapterDayjs';
import LocalizationProvider from '@mui/lab/LocalizationProvider';
import { Box, Typography } from '@mui/material';

// style
const typoStyle = {
  m: 1,
  opacity: 0.6,
  fontWeight: 'bold',
  cursor: 'pointer',
  textDecoration: 'underline',
};

export default function DatePicker({ setdate }) {
  const [value, setvalue] = useState([null, null]);
  const [range, setrange] = useState('Custom');

  // send the changed date back to main whenever value is chcanged
  React.useEffect(() => {
    setdate(value);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <>
      <Box sx={{ display: 'flex' }}>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([dayjs(), dayjs()]);
            setrange('Today');
          }}
        >
          Today
        </Typography>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([dayjs().startOf('week'), dayjs()]);
            setrange('This week');
          }}
        >
          This week
        </Typography>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([dayjs().startOf('month'), dayjs()]);
            setrange('This month');
          }}
        >
          This month
        </Typography>

        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([dayjs().startOf('year'), dayjs()]);
            setrange('This year');
          }}
        >
          This year
        </Typography>
      </Box>
      <Box sx={{ display: 'flex' }}>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([dayjs().add(-1, 'day'), dayjs().add(-1, 'day')]);
            setrange('Yesterday');
          }}
        >
          Yesterday
        </Typography>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([dayjs().startOf('week').subtract(1, 'week'), dayjs().endOf('week').subtract(1, 'week')]);
            setrange('Last week');
          }}
        >
          Last week
        </Typography>
        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([dayjs().startOf('month').subtract(1, 'month'), dayjs().endOf('month').subtract(1, 'month')]);
            setrange('Last month');
          }}
        >
          Last month
        </Typography>

        <Typography
          sx={{
            ...typoStyle,
          }}
          onClick={() => {
            setvalue([dayjs().startOf('year').subtract(1, 'year'), dayjs().endOf('year').subtract(1, 'year')]);
            setrange('Last year');
          }}
        >
          Last year
        </Typography>
      </Box>
      <LocalizationProvider dateAdapter={AdapterDayjs} localeText={{ start: 'Check-in', end: 'Check-out' }}>
        <DateRangePicker
          value={value}
          onChange={(newValue) => {
            // setValue(newValue);
          }}
          renderInput={(startProps, endProps) => (
            <>
              <TextField {...startProps} />
              <Box sx={{ mx: 2 }}> to </Box>
              <TextField {...endProps} />
            </>
          )}
        />
      </LocalizationProvider>
      <Typography sx={{ ml: 0.5, mb: 3, mt: 0.5 }} variant="subtitle2">
        ({range})
      </Typography>
    </>
  );
}
