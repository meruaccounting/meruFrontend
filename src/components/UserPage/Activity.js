import React, { useState } from 'react';
import { useSnackbar } from 'notistack';
// mui
import { Box, Typography, Tooltip, Alert, AlertTitle, Toolbar, IconButton } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import HourglassFullIcon from '@mui/icons-material/HourglassFull';
import HourglassBottomIcon from '@mui/icons-material/HourglassBottom';
import HourglassEmptyIcon from '@mui/icons-material/HourglassEmpty';

// helpers
import toHhMm from '../../helpers/hhMm';

// components
import Preview from './Preview';

// ---------------------------------------------------------------------------------------------------------------------

// performance data icons
const percentIcon = (percent) =>
  // eslint-disable-next-line no-nested-ternary
  percent <= 30 ? (
    <HourglassEmptyIcon sx={{ m: -1 }} />
  ) : percent <= 70 && percent > 30 ? (
    <HourglassBottomIcon sx={{ m: -1 }} />
  ) : (
    <HourglassFullIcon sx={{ m: -1 }} />
  );

// style
const outerBox = { m: 0.5, pt: 1.5, pr: 1, pb: 1, pl: 0.5, borderRadius: 1 };

export default function Activity({ act }) {
  // selected ss to delete
  const [selectedSs, setselectedSs] = useState([]);

  // notistack
  const { enqueueSnackbar } = useSnackbar();

  const delSs = async (selectedSs) => {
    const array = selectedSs.map((ss) => ({ activityId: act._id, screenshotId: ss }));
  };

  const delAct = async (actId) => {};

  return (
    <Box component="div" sx={outerBox}>
      <Typography component="span" sx={{ fontWeight: 'bold', ml: 2.5 }}>
        {toHhMm(act.startTime)} - {toHhMm(act.endTime)} ||
      </Typography>
      <Tooltip title={`${Math.ceil(act.performanceData)}%`} placement="top" followCursor>
        <Box sx={{ m: 1, fontWeight: 'bold' }} component="span">
          {percentIcon(act.performanceData)}
          <span> ({Math.ceil(act.performanceData)}%)</span>
        </Box>
      </Tooltip>
      <Typography component="span" sx={{ m: 0, fontWeight: 'bold' }}>
        || {!act.project ? `No Project` : act.project.name}
      </Typography>
      <IconButton
        sx={{ float: 'right', color: 'primary.dark' }}
        onClick={() => {
          delAct(act._id);
        }}
      >
        <DeleteIcon />
      </IconButton>
      <IconButton sx={{ float: 'right', color: 'primary.dark' }}>
        <EditIcon />
      </IconButton>
      <Toolbar
        sx={{
          // use this for dynamic display none
          display: 'none',
          mb: 1,
          position: 'fixed',
          borderRadius: 1,
          bottom: '0',
          width: '70%',
          zIndex: '10',
          backgroundColor: '#ebf8f2',
          ...(selectedSs.length > 0 && {
            // bgcolor: (theme) => alpha(theme.palette.primary.main),
            display: 'flex',
          }),
        }}
      >
        <Tooltip title="Delete">
          <IconButton>
            <DeleteIcon
              sx={{ float: 'right' }}
              fontSize="small"
              onClick={() => {
                delSs(selectedSs);
              }}
            />
          </IconButton>
        </Tooltip>

        <Typography sx={{ flex: '1 1 100%' }} color="inherit" variant="subtitle1" component="div">
          Delete {selectedSs.length} selected screenshots?
        </Typography>
      </Toolbar>
      <Box component="div" sx={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap' }}>
        {act.screenshots.length ? (
          act.screenshots.map((ss, key) => (
            <Preview
              ss={ss}
              setSelectedSs={(isCheck, screenshotId) => {
                if (isCheck) {
                  setselectedSs((prev) => [...prev, screenshotId]);
                } else {
                  setselectedSs((prev) => selectedSs.filter((pre) => screenshotId !== pre));
                }
              }}
              selectedSs={selectedSs}
              ssId={ss._id}
              act={act}
              title={ss.title}
              preview={ss.image}
              key={key}
              performanceData={ss.performanceData}
              activityAt={ss.activityAt}
            />
          ))
        ) : (
          <Alert fullWidth severity="info" sx={{ m: 2, width: '100%' }} variant="string">
            <AlertTitle>No Screenshots</AlertTitle>
            Evidence was deleted — <strong>{`OOF :")`}</strong>
          </Alert>
        )}
      </Box>
    </Box>
  );
}
