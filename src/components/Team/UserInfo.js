import React, { useState } from 'react';

import { Box, Container, Typography } from '@mui/material';
import DeleteIcon from '@mui/icons-material/Delete';
import KeyboardArrowDownIcon from '@mui/icons-material/KeyboardArrowDown';
import KeyboardArrowUpIcon from '@mui/icons-material/KeyboardArrowUp';

const UserInfo = ({ userData }) => {
  const [showDetails, setShowDetails] = useState(false);
  console.log(userData);
  return (
    <Container disableGutters>
      <Container
        disableGutters
        sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', my:2 }}
      >
        <Typography variant="h3">{`${userData.firstName}  ${userData.lastName}`}</Typography>
        <Box>
          <DeleteIcon />
          {showDetails ? (
            <KeyboardArrowUpIcon onClick={() => setShowDetails(!showDetails)} />
          ) : (
            <KeyboardArrowDownIcon onClick={() => setShowDetails(!showDetails)} />
          )}
        </Box>
      </Container>
      {showDetails && (
        <Container disableGutters>
          <Typography>Email : {userData.email}</Typography>
          {userData.role === "manager" &&<Typography variant="h4">{userData.firstName} can create their team</Typography>}
          {/* //////////////// PROJECT LISTS */}
          <Typography variant="h4" sx={{ mt: 2 }}>
            Projects
          </Typography>

          {/* /////////////////Settings Sections */}
          <Typography variant="h4">Effective Settings </Typography>
          <Typography sx={{ fontSize: 24 }}>
            Screen Shot Per Hour <span style={{textDecorationLine:"underline", color:"blue", cursor:"pointer"}}>{userData.settings.ScreenShotPerHour.individualValue}
          </span></Typography>
          <Typography sx={{ fontSize: 24 }}>
            Allow Blur <span style={{textDecorationLine:"underline", color:"blue", cursor:"pointer"}}>{userData.settings.AllowBlur.individualValue ? 'True' : 'False'}
          </span></Typography>
          <Typography sx={{ fontSize: 24 }}>
            Apps And Url Tracking <span style={{textDecorationLine:"underline", color:"blue", cursor:"pointer"}}>{userData.settings.AppsAndUrlTracking.individualValue ? 'True' : 'False'}
          </span></Typography>
          <Typography sx={{ fontSize: 24 }}>
            Weekly Time Limit <span style={{textDecorationLine:"underline", color:"blue", cursor:"pointer"}}>{userData.settings.WeeklyTimeLimit.individualValue}
          </span></Typography>
          <Typography sx={{ fontSize: 24 }}>Auto Pause <span style={{textDecorationLine:"underline", color:"blue", cursor:"pointer"}}>{userData.settings.AutoPause.individualValue}</span></Typography>
          <Typography sx={{ fontSize: 24 }}>
            Offline Time <span style={{textDecorationLine:"underline", color:"blue", cursor:"pointer"}}>{userData.settings.OfflineTime.individualValue ? 'True' : 'False'}
          </span></Typography>
          <Typography sx={{ fontSize: 24 }}>
            Notify User <span style={{textDecorationLine:"underline", color:"blue", cursor:"pointer"}}>{userData.settings.NotifyUser.individualValue ? 'True' : 'False'}
          </span></Typography>
          <Typography sx={{ fontSize: 24 }}>Week Start <span style={{textDecorationLine:"underline", color:"blue", cursor:"pointer"}}>{userData.settings.WeekStart.individualValue}</span></Typography>
          <Typography sx={{ fontSize: 24 }}>
            Currency Symbol <span style={{textDecorationLine:"underline", color:"blue", cursor:"pointer"}}>{userData.settings.CurrencySymbol.individualValue}
          </span></Typography>
        </Container>
      )}
    </Container>
  );
};

export default UserInfo;
