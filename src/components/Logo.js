import PropTypes from 'prop-types';
// @mui
/* eslint-disable no-unused-vars */
import { useTheme } from '@mui/material/styles';
import { Box } from '@mui/material';

// ----------------------------------------------------------------------

Logo.propTypes = {
  disabledLink: PropTypes.bool,
  sx: PropTypes.object,
};

/* eslint-disable no-unused-vars */
export default function Logo({ disabledLink = false, sx }) {
  // const theme = useTheme();

  // OR
  // const logo = <Box component="img" src="/static/logo.svg" sx={{ width: 40, height: 40, ...sx }} />

  const logo = (
    <Box
      component="img"
      src="/static/meru1024.svg"
      sx={{
        width: 210,
        backgroundColor: 'white',
      }}
    />
  );

  if (disabledLink) {
    return <>{logo}</>;
  }

  return (
    <a href="https://www.meruaccounting.com/" target="blank">
      {logo}
    </a>
  );
}
