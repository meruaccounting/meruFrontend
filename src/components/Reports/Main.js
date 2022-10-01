import * as React from 'react';
import { useSnackbar } from 'notistack';
import PropTypes from 'prop-types';
import axios from 'axios';
import dayjs from 'dayjs';

// mui
import { Tabs, Tab, Typography, Box, Button } from '@mui/material';
import SendIcon from '@mui/icons-material/Send';
// components
import DatePicker from './DatePicker';
import Graphs from './Graphs';
import SelectEmployees from './SelectEmployees';
import SelectProjects from './SelectProjects';
import SelectClients from './SelectClients';
import SelectGroup from './SelectGroup';
import ReportsOptions from './ReportsOptions';
import SavedR from './SavedR';

// contexts and apis

// import ByEp from './ByEp';
// import ByPr from './ByPr';
// import ByCl from './ByCL';
// import ByDetailed from './ByDetailed';
// import ByAppsUrl from './ByApp&Url';

// tab panels
function TabPanel(props) {
  const { children, value, index, ...other } = props;

  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`simple-tabpanel-${index}`}
      aria-labelledby={`simple-tab-${index}`}
      {...other}
    >
      {value === index && (
        <Box sx={{ p: 3 }}>
          <Typography>{children}</Typography>
        </Box>
      )}
    </div>
  );
}

TabPanel.propTypes = {
  children: PropTypes.node,
  index: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
};

function a11yProps(index) {
  return {
    id: `simple-tab-${index}`,
    'aria-controls': `simple-tabpanel-${index}`,
  };
}

// tab panels
export default function Main() {
  const { enqueueSnackbar } = useSnackbar();
  const [reports, setreports] = React.useState({ reports: [], loader: true });
  const [employees, setemployees] = React.useState([]);
  const [clients, setclients] = React.useState([]);
  const [projects, setprojects] = React.useState([]);
  const [date, setdate] = React.useState([null, null]);
  const [group, setgroup] = React.useState(null);
  const [value, setValue] = React.useState(0);

  // tabs and tab panels
  const handleChange = (event, newValue) => {
    setValue(newValue);
  };

  const handleGenerateReports = async () => {
    try {
      const dateOne = date[0] ? date[0].format('DD/MM/YYYY') : null;
      const dateTwo = date[1] ? date[1].format('DD/MM/YYYY') : null;
      const userIds = employees.length ? employees : null;
      const projectIds = projects.length ? projects : null;
      const clientIds = clients.length ? clients : null;
      let groupBy = '';
      group.forEach((g) => {
        groupBy = groupBy.concat(g.value);
      });
      const options = {
        clientIds,
        projectIds,
        userIds,
        dateOne,
        dateTwo,
        groupBy,
      };

      // call reports here
      console.log(dayjs(-1));

      axios.post('/report', { ...options }).then((res) => {
        setreports({ reports: res.data.data, loader: false });
      });
    } catch (err) {
      enqueueSnackbar(err.message, { variant: 'error' });
    }
  };

  return (
    <Box sx={{ width: '100%' }}>
      <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
        <Tabs value={value} onChange={handleChange} aria-label="reports-tabs">
          <Tab label="Summary" {...a11yProps(0)} />
          <Tab label="Saved Reports" {...a11yProps(1)} />
        </Tabs>
      </Box>
      {/* generate reports panel */}
      <TabPanel value={value} index={0}>
        <DatePicker
          setdate={(newValue) => {
            setdate(newValue);
          }}
        />
        <SelectEmployees
          options={[]}
          setemployees={(newValue) => {
            if (!newValue.length) {
              setemployees(null);
            } else {
              setemployees(newValue);
            }
          }}
        />

        <SelectClients
          options={[]}
          setclients={(newValue) => {
            if (!newValue.length) {
              setclients(null);
            } else {
              setclients(newValue);
            }
          }}
        />
        <SelectProjects
          options={[]}
          setprojects={(newValue) => {
            if (!newValue.length) {
              setprojects(null);
            } else {
              setprojects(newValue);
            }
          }}
        />
        <SelectGroup
          setgroup={(newValue) => {
            setgroup(newValue);
          }}
        />
        <Box component="div" sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <Button onClick={handleGenerateReports} variant="contained" endIcon={<SendIcon />}>
            Generate Reports
          </Button>
          {!reports.loader ? <ReportsOptions reports={reports} options={[]} /> : null}
        </Box>
        {!reports.loader ? (
          <>
            <Graphs reports={reports} style={{ margin: 10 }} />
            {/* <Divider /> */}

            {/* {group.filter((grp) => grp.value === 'E').length !== 0 ? (
              <ByEp sx={{ height: 'auto' }} reports={reports} />
            ) : group.filter((grp) => grp.value === 'P').length !== 0 ? (
              <ByPr sx={{ height: 'auto' }} reports={reports} />
            ) : group.filter((grp) => grp.value === 'C').length !== 0 ? (
              <ByCl sx={{ height: 'auto' }} reports={reports} />
            ) : group.filter((grp) => grp.value === 'D').length !== 0 ? (
              <ByDetailed sx={{ height: 'auto' }} reports={reports} />
            ) : group.filter((grp) => grp.value === 'A').length !== 0 ? (
              <ByAppsUrl sx={{ height: 'auto' }} reports={reports} />
            ) : (
              ''
            )} */}
          </>
        ) : (
          <></>
        )}
      </TabPanel>
      {/* saved reports panel */}
      <TabPanel value={value} index={1}>
        {/* <SavedR /> */}
      </TabPanel>
    </Box>
  );
}
