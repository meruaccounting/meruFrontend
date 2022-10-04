import * as React from 'react';
import axios from 'axios';

// mui
import Box from '@mui/material/Box';
import { IconButton } from '@mui/material';
import KeyboardArrowLeft from '@mui/icons-material/KeyboardArrowLeft';
import KeyboardArrowRight from '@mui/icons-material/KeyboardArrowRight';

// store
import useStore from '../../store/activityStore';

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

export default function ChangeMonth({ date, setdate, id }) {
  // store
  const setActivities = useStore((state) => state.setActivities);

  const handleNext = () => {
    // to call in activities
    const prevDate = date;
    setdate((prev) => new Date(prev.getFullYear(), prev.getMonth() + 1, 1));

    // call next month activities here
    axios
      .post('/activity/getActivities', {
        userId: id,
        startTime: new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 1),
        endTime: new Date(prevDate.getFullYear(), prevDate.getMonth() + 1, 0),
      })
      .then((res) => {
        setActivities(res.data.data, false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Axios request aborted.');
        } else {
          console.error(err);
        }
      });
  };

  const handleBack = () => {
    const prevDate = date;
    setdate((prev) => new Date(prev.getFullYear(), prev.getMonth() - 1, 1));
    // call previous month activities here
    // call next month activities here
    axios
      .post('/activity/getActivities', {
        userId: id,
        startTime: new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 1),
        endTime: new Date(prevDate.getFullYear(), prevDate.getMonth() - 1, 0),
      })
      .then((res) => {
        setActivities(res.data.data, false);
      })
      .catch((err) => {
        if (axios.isCancel(err)) {
          console.log('Axios request aborted.');
        } else {
          console.error(err);
        }
      });
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
