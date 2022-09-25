import React, { useEffect, useState } from 'react';

// mui
import { Box } from '@mui/material';
import Alert from '@mui/material/Alert';
import AlertTitle from '@mui/material/AlertTitle';

// components
import Activity from './Activity';

export default function ScreenShots({ activities, date, isInternal }) {
  const [filteredActs, setfilteredActs] = useState([]);

  // filter day selected day wise and internal and external
  useEffect(() => {
    // get date filtered acts
    const arr = activities.filter((act) => new Date(act.activityOn) <= date);
    // get intExt filtered acts
    setfilteredActs(arr.filter((act) => act.isInternal === isInternal));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [isInternal, activities, date]);

  return (
    <Box component="div">
      {/* map the time ranges from user data for the particular date */}
      {filteredActs.length ? (
        filteredActs.map((act) => <Activity act={act} key={act._id} />)
      ) : (
        <Alert severity="info">
          <AlertTitle>No Activities</AlertTitle>
          Nothing was done on this day — <strong>{'NONE :('}</strong>
        </Alert>
      )}
    </Box>
  );
}
