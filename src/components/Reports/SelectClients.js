import * as React from 'react';
import axios from 'axios';

// mui
import { Box, Autocomplete, TextField } from '@mui/material';

// --------------------------------------------------------------------

export default function SelectEmployees({ setclients }) {
  const ud = JSON.parse(localStorage.ud);

  const [options, setoptions] = React.useState([{ _id: null, name: 'Without client' }]);

  React.useEffect(() => {
    const source = axios.CancelToken.source();
    // get activities of current month on mount
    axios
      .post('/report/options')
      .then((res) => {
        setoptions((prev) => [...prev, ...res.data.projectsClientsOptions[0].clients]);
        console.log(options);
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
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    ud.role !== 'employee' && (
      <Box sx={{ m: 2, ml: 0 }}>
        <Autocomplete
          multiple
          options={options}
          getOptionLabel={(option) => `${option.name}`}
          filterSelectedOptions
          onChange={(e, value) => {
            console.log(value);
            setclients(value);
          }}
          renderInput={(params) => <TextField {...params} label="Select Clients" />}
        />
      </Box>
    )
  );
}
