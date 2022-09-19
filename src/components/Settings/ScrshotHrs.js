// react and other poppular library
import React, { useState } from 'react';

// mui components
import { Box } from '@mui/system';

// ownLibrary
import IndividaulInfo from './IndividaulInfo';
import Option from './Option';
import SearchField from './SearchField';

const ScrshotHrs = () => {
  // store
  const [selectedUser, setSelectedUser] = useState([]);
  const radioLabel = { first: 'Take', second: 'Do not Take', visible:true };
  const inputLabel = { label: 'Screenshots per hrs', value: 10, visible: true };

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

export default ScrshotHrs;
