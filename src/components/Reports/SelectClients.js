import * as React from 'react';
import axios from 'axios';

// mui
import { Box, Autocomplete, TextField } from '@mui/material';

// --------------------------------------------------------------------

export default function SelectEmployees({ setclients }) {
  const [options, setoptions] = React.useState([]);

  React.useEffect(() => {
    const source = axios.CancelToken.source();
    // get activities of current month on mount
    axios
      .post('/report/options')
      .then((res) => {
        // setoptions(res.data.projectsClientsOptions[0].members);
        setoptions(res.data.projectsClientsOptions[0].clients);
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
    <Box sx={{ m: 2, ml: 0 }}>
      <Autocomplete
        multiple
        options={options}
        getOptionLabel={(option) => `${option.name}`}
        filterSelectedOptions
        onChange={(e, value) => {
          setclients(value);
        }}
        renderInput={(params) => <TextField {...params} label="Select Clients" />}
      />
    </Box>
  );
}
