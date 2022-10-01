import * as React from 'react';
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

const month = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
];

export default function ChangeMonth({ date, setdate }) {
  const handleNext = () => {
    setdate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));
  };

  const handleBack = () => {
    setdate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
  };

  return (
    <Box sx={{ maxWidth: 250, flexGrow: 1 }}>
      <IconButton color="primary" size="medium" onClick={handleBack}>
        <KeyboardArrowLeft />
      </IconButton>
      {`${month[date.getMonth()]} ${date.getFullYear()}`}
      <IconButton color="primary" size="medium" onClick={handleNext}>
        <KeyboardArrowRight />
      </IconButton>
    </Box>
  );
}
