// react and popular library
import React, { useEffect, useState } from 'react';

// mui components

// own components
import ScrshotHrs from './ScrshotHrs';
import Default from './Default';
import AppUrlTrack from './AppUrlTrack';
import WeeklyTime from './WeeklyTime';
import Pause from './Pause';
import Offline from './Offline';
import Notify from './Notify';
import WeekStart from './WeekStart';
import Currency from './Currency';
import ScrDelete from './ScrDelete';

const Main = ({ selectedSettingNo }) => {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    setIndex(selectedSettingNo);
    console.log(selectedSettingNo);
  }, [selectedSettingNo]);

  return (
    <>
      {(() => {
        switch (index) {
          case 0:
            return <ScrshotHrs />;
          case 1:
            return <AppUrlTrack/>
          case 2:
            return <WeeklyTime/>
          case 3:
            return <Pause/>
          case 4:
            return <Offline/>
          case 5:
            return <Notify/>
          case 6:
            return <WeekStart/>
          case 7:
            return <Currency/>
          case 8:
            return <ScrDelete/>
          default:
            return <Default />;
        }
      })()}
    </>
  );
};

export default Main;
