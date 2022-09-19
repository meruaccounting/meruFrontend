// react and other popular library
import React, {useState} from 'react';

// mui components
import { Box } from '@mui/system';
// own library
import IndividaulInfo from './IndividaulInfo';
import Option from './Option';
import SearchField from './SearchField';
import WeekDay from './WeekDay';

const WeekStart = () => {
   // store
   const [selectedUser, setSelectedUser] = useState([]);
 
   const handleUsers = (ele) => [setSelectedUser([...ele])];
  return (
    <Box>
      {/* to show individual information title */}
      <IndividaulInfo />
      {/* to search user from database */}
      <SearchField callback={handleUsers} />
      {/* to make visible of selected user */}
      {selectedUser.map((name) => (
        <WeekDay userDetail={name}/>
      ))}
    </Box>
  );
};

export default WeekStart;
