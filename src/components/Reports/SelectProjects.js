import * as React from 'react';
import axios from 'axios';

// mui
import { Box, Autocomplete, TextField } from '@mui/material';

// ------------------------------------------------------------------

export default function SelectEmployees({ setprojects }) {
  const [options, setoptions] = React.useState([{ _id: null, name: 'Without project' }]);

  React.useEffect(() => {
    const source = axios.CancelToken.source();
    // get activities of current month on mount
    axios
      .post('/report/options')
      .then((res) => {
        setoptions((prev) => [...prev, ...res.data.projectsClientsOptions[0].projects]);
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
        getOptionLabel={(option) => `${option.name} ** ${option.client?.name ?? 'No Client'} `}
        filterSelectedOptions
        onChange={(e, value) => {
          setprojects(value);
        }}
        renderInput={(params) => <TextField {...params} label="Select Projects" />}
      />
    </Box>
  );
}
