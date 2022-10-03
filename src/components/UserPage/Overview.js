import React, { useEffect, useState } from 'react';
import dayjs from 'dayjs';

// mui
import { Box, Typography, CardContent, Card, Divider, Tab } from '@mui/material';
import TabContext from '@mui/lab/TabContext';
import TabList from '@mui/lab/TabList';
import TabPanel from '@mui/lab/TabPanel';

// components
import TotalHours from './totalHours';
import MonthlyHours from './monthlyHours';
import WeeklyHours from './weeklyHours';
import TodayHours from './todayHours';

// contexts

export default function Overview({ date, activities }) {
  const [totalHours, settotalHours] = useState(0);
  const [todayHours, settodayHours] = useState(0);
  const [monthlyHours, setmonthlyHours] = useState(0);
  const [weeklyHours, setweeklyHours] = useState(0);

  const [value, setValue] = React.useState('1');
  const [apps, setApps] = React.useState([]);
  const [appsMap, setAppsMap] = React.useState([]);

  // filter day selected day wise and internal and external
  useEffect(() => {
    // get date filtered acts

    const arr = activities.filter((act) => new Date(act.activityOn) <= date);

    // traverse thru acts to get time data
    let total = 0;
    let month = 0;
    let week = 0;
    let today = 0;
    arr.forEach((act) => {
      const date1 = new Date(act.activityOn);
      const date2 = date;
      total += act.consumeTime;
      if (date1.toDateString() === date2.toDateString()) {
        today += act.endTime - act.startTime;
      } else if (dayjs(date1).isSame(date, 'week')) {
        week += act.endTime - act.startTime;
      } else if (dayjs(date1).isSame(date, 'month')) {
        month += act.endTime - act.startTime;
      }
    });
    settotalHours(total);
    setweeklyHours(week);
    setmonthlyHours(month);
    settodayHours(today);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [activities, date]);

  // getting DailyHours
  //   useEffect(() => {
  //     let Data = [];
  //     Data = days?.filter((day) => day.date === date);
  //     if (Data && Data.length > 0) {
  //       setTodaysHours(Data[0].dailyHours);
  //     } else {
  //       setTodaysHours(0);
  //     }
  //   }, [date]);

  //   // Getting apps and URL's
  //   useEffect(() => {
  //     if (activities !== undefined && activities.length > 0) {
  //       const arr = [];
  //       const map = new Map();
  //       const finalArray = [];

  //       activities.forEach((activity) => {
  //         activity.screenshots.forEach((screenshot) => {
  //           arr.push(screenshot.title);
  //           if (map.get(screenshot.title)) {
  //             map.set(screenshot.title, map.get(screenshot.title) + 1);
  //           } else {
  //             map.set(screenshot.title, 1);
  //           }
  //         });
  //       });
  //       map.forEach((value, key) => {
  //         finalArray.push({
  //           app: key,
  //           usage: value,
  //         });
  //       });
  //       setApps(arr);
  //       setAppsMap(finalArray);
  //     }
  //   }, [activities]);

  // toggling tasks and apps
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };
  return (
    <Box
      component="div"
      sx={{
        m: 2,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'space-between',
        '@media (max-width: 780px)': {
          flexDirection: 'column',
        },
      }}
    >
      {/* Time cards */}
      <Box
        sx={{
          width: '40%',
          '@media (max-width: 780px)': {
            width: '100%',
            marginBottom: '10px',
          },
          display: 'flex',
          flexDirection: 'row',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
        }}
      >
        <TodayHours Total={todayHours} />
        <WeeklyHours Total={weeklyHours} />
        <MonthlyHours Total={monthlyHours} />
        <TotalHours Total={totalHours} />
      </Box>

      {/* Tab panels for tasks and apps and urls */}
      <Box
        sx={{
          width: '60%',
          '@media (max-width: 780px)': {
            width: '100%',
          },
        }}
      >
        <Card
          elevation={3}
          sx={{
            minWidth: 275,
            height: '100%',
            backgroundColor: 'info.lighter',
          }}
        >
          <CardContent>
            <TabContext value={value}>
              <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
                <Typography
                  component="div"
                  color="text.primary"
                  sx={{
                    fontSize: 14,
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'space-between',
                  }}
                >
                  {/* {dateObj.format('Do MMMM YYYY')} */}
                  <TabList onChange={handleChange} aria-label="lab API tabs example">
                    <Tab label="Tasks" value="1" />
                    <Tab label="Apps & URL's" value="2" />
                  </TabList>
                </Typography>
              </Box>
              <TabPanel value="1">
                <Box overflow={'auto'} sx={{ height: 145 }}>
                  {activities &&
                    activities.map((activity, index) => (
                      <div key={index}>
                        <a
                          style={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            px: 1,
                            textDecoration: 'none',
                            color: 'black',
                          }}
                          key={activity._id}
                          href={`#${activity._id}`}
                        >
                          <Typography sx={{ mb: 1.5 }} variant="h5" color="text.primary">
                            {activity?.project?.name}
                            <br />
                            <Typography color="text.primary">{activity.task}</Typography>
                          </Typography>
                          <Typography variant="h4" component="div">
                            {(activity.startTime, activity.endTime)}
                          </Typography>
                        </a>
                        <Divider sx={{ backgroundColor: 'primary.dark' }} />
                      </div>
                    ))}
                </Box>
              </TabPanel>
              <TabPanel value="2">
                <Box overflow={'auto'} sx={{ height: 145 }}>
                  {appsMap &&
                    appsMap.map((data) => (
                      <>
                        <Box
                          key={data.app}
                          sx={{
                            display: 'flex',
                            flexDirection: 'row',
                            justifyContent: 'space-between',
                            px: 1,
                          }}
                        >
                          <Typography sx={{ my: 1.5 }} variant="h6" color="text.primary">
                            {data.app}
                            <br />
                          </Typography>
                          <Typography variant="h5" component="div">
                            {`${((data.usage / apps.length) * 100).toFixed(2)}%`}
                          </Typography>
                        </Box>
                        <Divider sx={{ backgroundColor: 'primary.dark' }} />
                      </>
                    ))}
                </Box>
              </TabPanel>
            </TabContext>
          </CardContent>
        </Card>
      </Box>
    </Box>
  );
}
