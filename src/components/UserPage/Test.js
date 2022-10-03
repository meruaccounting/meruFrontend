import React, { useState, useEffect } from 'react';
import LinearProgress from '@mui/material/LinearProgress';
import { Typography, Button, Box } from '@mui/material/';

import dayjs from 'dayjs';

const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];

export default function Test({ date, setdate, activities }) {
  const [value, setvalue] = useState(date.getDate());

  // just to bring the date back to first day
  useEffect(() => {
    // const arr = [...Array(dayjs(date).daysInMonth())].fill(0);
    setvalue(date.getDate());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [date]);

  // to calculate only on act change(called when month changes)
  const arr = [...Array(dayjs(date).daysInMonth())].fill(0);
  useEffect(() => {
    activities.forEach((act) => {
      arr[new Date(act.activityOn)] += act.endTime - act.startTime;
    });

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities]);

  const handleClick = (e) => {
    setvalue(Number(e.target.value));
    setdate((prev) => new Date(prev.getFullYear(), prev.getMonth(), Number(e.target.value)));
  };

  //   {Array[24].forEach((index, i) => progress(50, index))}

  return (
    <>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'row',
          justifyContent: 'center',
          minWidth: 400,
          borderRight: '0.5px solid black',
        }}

        // divider={<Divider orientation="vertical" flexItem />}
      >
        {[...Array(dayjs(date).daysInMonth())].map((element, index) => {
          const key = index + 1;
          const year = date.getFullYear();
          const month = date.getMonth();
          const day = new Date(year, month, index + 1).getDay();

          return (
            <Box
              key={key}
              style={{
                display: 'flex',
                flexDirection: 'column',
                justifyContent: 'center',
                borderLeft: day === 0 ? '3px solid black' : '0.5px solid black',
                flex: 1,
                minWidth: 0,
              }}
            >
              <Typography
                sx={{
                  border: '0.5px solid black',
                  borderLeft: 0,
                  borderRight: 0,
                }}
                variant="subtitle2"
                align="center"
              >
                {days[day]}
              </Typography>
              <Button
                sx={{
                  cursor: 'pointer',
                  maxWidth: '50px',
                  maxHeight: '50px',
                  minWidth: '30px',
                  minHeight: '30px',
                  backgroundColor: key === value && 'blue',
                  mb: 0.5,
                }}
                value={key}
                onClick={(e) => {
                  handleClick(e);
                }}
                vlaue={element}
                aria-label="left aligned"
              >
                {key}
              </Button>
              <LinearProgress variant="determinate" value={arr[key] / 300} />
            </Box>
          );
        })}
      </Box>
    </>
  );
}
