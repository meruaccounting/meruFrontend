// react and other popular library
import React, {useState} from 'react';

// mui components
import { Box } from '@mui/system';
// own library
import IndividaulInfo from './IndividaulInfo';
import SearchField from './SearchField';
import Option from './Option';

const Pause = () => {
  // store
  const [selectedUser, setSelectedUser] = useState([]);
  const radioLabel = { first: 'Pause After', second: 'Do not Pause', visible:true };
  const inputLabel = { label: 'Time limit', value: 10, visible: true };

  const handleUsers = (ele) => [setSelectedUser([...ele])];

  return (
    <Box>
      {/* to show individual information title */}
      <IndividaulInfo />
      {/* to search user from database */}
      <SearchField callback={handleUsers} />
      {/* to make visible of selected user */}
      {selectedUser.map((name, input) => (
        <Option radioLabel={radioLabel} inputLabel={inputLabel} key={input} userDetail={name} />
      ))}
    </Box>
  );
};

export default Pause;
