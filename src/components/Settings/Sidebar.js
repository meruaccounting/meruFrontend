// react and other library
import React, { useState } from 'react';

// mui library
import { Container, Paper, List, ListItemText, ListItemButton } from '@mui/material';

const rootPaper = {
  overflow: 'hidden',
  height: '100%',
  display: 'flex',
  flexDirection: 'column',
};

const SideBarData = [
  {
    title: 'Screen Shot Per Hour',
    desc: 'How Frequently screenshots will be taken. This number is an average since screenshots are taken at random intervals',
  },
  { title: 'Apps And Url Tracking', desc: 'Track what application your team  members use and what website they visit' },
  {
    title: 'weekly Time Limit',
    desc: 'Number of hours your employees are allowed to work. The tracking will stop when the limit is reached.The time zone for the time limit is always UTC',
  },
  {
    title: 'Auto Pause',
    desc: 'Tracking will automatically pause after the specified period of inactivity and will automatically resume when user becomes active again.',
  },
  {
    title: 'Offline Time',
    desc: 'Allow user to add time not tracked by the program to their timeline manually. It is often used to account for work away from a computer.',
  },
  {
    title: 'Notify User',
    desc: 'Every time a screenshot is taken – a small notification will pop up for a couple of seconds next to the system tray saying that a Screenshot was taken.',
  },
  {
    title: 'Week Start',
    desc: 'When does your week start? This will be used when showing totals for a week or setting weekly time limits.',
  },
  {
    title: 'Currency Symbol',
    desc: 'The symbol (e.g. $, €, £) will be shown when you set hourly pay rates for your employees and everywhere where money is shown (like total amount spent today or on a specific project).',
  },
  {
    title: 'Screenshot Delete',
    desc: 'The Screenshots of all users will be deleted after the given duration automatically.',
  },
];

const Sidebar = () => {
  const [selectListIndex, setSelectListIndex] = useState(0);

  const handleSelectedIndex = (index) => {
    setSelectListIndex(index);
  };
  return (
    <Container sx={{ width: '30%', m: 1, mr: 0.5 }} disableGutters>
      {/* --------------------------------------------------------------------
                    List Container
        ----------------------------------------------------------------------- */}
      <Paper component="div" elevation={3} sx={rootPaper}>
        <List component="nav" aria-label="Setting Options">
          {SideBarData.map((ele, index) => (
            <ListItemButton
              selected={selectListIndex === index}
              onClick={() => {
                handleSelectedIndex(index);
              }}
              key={index}
            >
              <ListItemText primary={ele.title} sx={{ color: selectListIndex === index ? 'blue' : '' }} />
            </ListItemButton>
          ))}
        </List>
      </Paper>
    </Container>
  );
};

export default Sidebar;
