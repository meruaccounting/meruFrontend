import React, { useState, useEffect } from 'react';
import axios from 'axios';

// mui
import { CssBaseline, Box } from '@mui/material';
import CircularProgress from '@mui/material/CircularProgress';

// store
import useStore from '../store/activityStore';

// components
import Calendar from '../components/UserPage/Calendar';
import Overview from '../components/UserPage/Overview';
import ScreenShots from '../components/UserPage/ScreenShots';
import Timeline from '../components/UserPage/Timeline';
import PageHeader from '../components/UserPage/PageHeader';
import IntExt from '../components/UserPage/IntExt';

export default function UserPage() {
  // store
  const setActivities = useStore((state) => state.setActivities);
  const activities = useStore((state) => state.activities);

  //
  const [date, setdate] = useState(new Date(2022, 8, 24));
  const [isInternal, setisInternal] = useState(false);

  // get alll activities
  useEffect(() => {
    const source = axios.CancelToken.source();
    axios
      .get('/activity')
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

    return () => {
      source.cancel();
    };
  }, []);


  // return loader while fetching data
  if (activities.loader) {
    return (
      <Box
        sx={{
          display: 'flex',
          flexGrow: '1',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <CircularProgress sx={{ m: 2 }} />
      </Box>
    );
  }

  return (
    <CssBaseline>
      <Box component="div" sx={{ width: '95%', margin: 'auto' }}>
        <PageHeader title="Hi, Welcome Back!" />

        {/* <Calendar
          date={dateObj.format('D')}
          days={commonData?.commonData?.user?.days}
          setDate={(date) =>
            setdate((prev) => {
              return date;
            })
          }
          setDateObj={(obj) => {
            setdateObj((prev) => {
              return obj;
            });
          }}
        /> */}

        {/* overview */}
        <Overview date={date} dateObj={date} days={[]} activities={activities.activities} />

        {/* timeline */}
        <Timeline activities={activities.activities} date={date} />

        {/* Internal / External switcher */}
        <IntExt setInternal={(isInt) => setisInternal(isInt)} />

        {/* screenshots and activities */}
        <ScreenShots isInternal={isInternal} activities={activities.activities} date={date} />
      </Box>
    </CssBaseline>
  );
}
