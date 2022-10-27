import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { FormControl, DialogContentText, FormControlLabel, Autocomplete, Checkbox } from '@mui/material';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import InputLabel from '@mui/material/InputLabel';
import OutlinedInput from '@mui/material/OutlinedInput';
import { styled } from '@mui/material/styles';
import Dialog from '@mui/material/Dialog';
import DialogTitle from '@mui/material/DialogTitle';
import DialogContent from '@mui/material/DialogContent';
import DialogActions from '@mui/material/DialogActions';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Typography from '@mui/material/Typography';
import { v4 as uuidv4 } from 'uuid';
import axios from 'axios';
import { useSnackbar } from 'notistack';
// import FileSaver from 'file-saver';
// import { utils, writeFile } from 'xlsx';
import PdfExport from './Export';

export default function ReportsOptions({ reports, options }) {
  // for dialog open close
  const [open, setopen] = React.useState(false);
  // name of report
  const [name, setname] = React.useState('Save Reports');
  const [share, setshare] = React.useState(true);
  const [includeSS, setincludeSS] = React.useState(false);
  const [includePR, setincludePR] = React.useState(false);
  const [includeAL, setincludeAL] = React.useState(false);
  const [includeApps, setincludeApps] = React.useState(false);
  const [schedule, setschedule] = React.useState(false);
  const [interval, setinterval] = React.useState('Daily');
  const [weeklyDay, setweeklyDay] = React.useState('Monday');
  const [dailyTime, setdailyTime] = React.useState(12);
  const [monthlyDate, setmonthlyDate] = React.useState(1);
  const { enqueueSnackbar } = useSnackbar();

  const [url, setUrl] = React.useState(uuidv4());

  React.useEffect(() => {
    setUrl(uuidv4());
  }, [open]);

  //   const handleExportExcel = async () => {
  //     try {
  //       let arr = [];
  //       let totalHoursSum = 0;
  //       let activitySum = 0;
  //       let moneySum = 0;
  //       let durationSum = 0;
  //       let noOfEmployees = 0;
  //       if (options?.groupBy === 'E') {
  //         arr.push(['Employee', 'Project', 'Total hours', 'Activity level', 'Cost ']);
  //         reports.reports[0]?.byEP?.map((emp, index) => emp.projects.map((pro) => {
  //             arr.push([
  //               `${emp._id.firstName} ${emp._id.lastName}`,
  //               `${pro.project}`,
  //               Number((pro.totalHours / 3600).toFixed(2)),
  //               Number((pro.avgPerformanceData / 1).toFixed(0)),
  //               Number(((pro.totalHours / 3600) * emp.payRate).toFixed(2)),
  //             ]);
  //             noOfEmployees += 1;

  //             totalHoursSum += pro.totalHours;
  //             activitySum += pro.avgPerformanceData;
  //             moneySum += (pro.totalHours / 3600) * emp.payRate;
  //           }));
  //         arr.push([]);
  //         arr.push([
  //           'total',
  //           '',
  //           `${(totalHoursSum / 3600).toFixed(2)} hr`,
  //           `${(activitySum / noOfEmployees).toFixed(2)} %`,
  //           moneySum.toFixed(2),
  //         ]);
  //       } else if (options?.groupBy === 'C') {
  //         arr.push(['Client', 'Employee', 'Total hours', 'Activity level', 'Cost ']);
  //         reports.reports[0]?.byCE?.map((cli) => cli.users.map((emp) => {
  //             arr.push([
  //               `${cli.client[0]?.name ? cli?.client[0].name : 'Deleted client'}`,

  //               `${emp.firstName} ${emp.lastName}`,
  //               Number((emp.totalHours / 3600).toFixed(2)),
  //               `${emp.avgPerformanceData.toFixed(2)} %`,
  //               Number(((emp?.totalHours / 3600) * emp.payRate).toFixed(2)),
  //             ]);
  //             noOfEmployees += 1;
  //             totalHoursSum += emp?.totalHours;
  //             activitySum += emp?.avgPerformanceData;
  //             moneySum += (emp?.totalHours / 3600) * emp.payRate;
  //           }));
  //         arr.push([]);

  //         arr.push([
  //           'total',
  //           '',
  //           `${(totalHoursSum / 3600).toFixed(2)} hr`,
  //           `${(activitySum / noOfEmployees).toFixed(2)} %`,
  //           moneySum.toFixed(2),
  //         ]);
  //       } else if (options?.groupBy === 'P') {
  //         arr.push(['Project', 'Employee', 'Total hours', 'Activity level', 'Cost ']);
  //         reports.reports[0]?.byPE?.map((pro) => pro.users.map((emp) => {
  //             arr.push([
  //               `${pro.client[0]?.name ? pro?.client[0].name : 'Deleted client'} :
  //                   ${pro.project[0]?.name ? pro?.project[0]?.name : 'Deleted project'}`,

  //               `${emp.firstName} ${emp.lastName}`,
  //               Number((emp.totalHours / 3600).toFixed(2)),
  //               `${(emp.avgPerformanceData / 1).toFixed(2)} %`,
  //               Number(((emp?.totalHours / 3600) * emp?.payRate).toFixed(2)),
  //             ]);
  //             noOfEmployees += 1;
  //             totalHoursSum += emp?.totalHours;
  //             activitySum += emp?.avgPerformanceData;
  //             moneySum += (emp?.totalHours / 3600) * emp.payRate;
  //           }));
  //         arr.push([]);
  //         arr.push([
  //           'total',
  //           '',
  //           `${(totalHoursSum / 3600).toFixed(2)} hr`,
  //           `${(activitySum / noOfEmployees).toFixed(2)} %`,
  //           moneySum.toFixed(2),
  //         ]);
  //       } else if (options?.groupBy === 'A') {
  //         arr.push(['Employee', 'Application', 'Activity level']);
  //         reports.reports[0]?.byA?.map((emp) => emp.screenshots.map((ss) => {
  //             const act = ss.avgPerformanceData;
  //             ss = ss?.title?.split('-').splice(-1);
  //             arr.push([`${emp._id.firstName} ${emp._id.lastName}`, ss[0], act]);
  //             activitySum += act;
  //             noOfEmployees += 1;
  //           }));
  //         arr.push([]);

  //         arr.push(['total', '', (activitySum / noOfEmployees).toFixed(2)]);
  //       } else if (options?.groupBy === 'D') {
  //         arr.push([
  //           'Date',
  //           'Client',
  //           'Project',
  //           'Start time',
  //           'End time',
  //           'Employee',
  //           'Total hours',
  //           'Activity level %',
  //           'Cost ',
  //         ]);
  //         reports.reports[0]?.byD?.map((d) => {
  //           const activity = d.performanceData;
  //           arr.push([
  //             d.activityOn,
  //             `${d.client?.name ? d?.client.name : 'Deleted client'}`,
  //             d.project.name,
  //             timeCC(d.startTime),
  //             timeCC(d.endTime),
  //             `${d.employee.firstName} ${d.employee.lastName}`,
  //             `${(d.consumeTime / 3600).toFixed(2)} hr`,
  //             `${(activity / 1).toFixed(2)} %`,
  //             Number(((d.consumeTime / 3600) * d.employee?.payRate).toFixed(2)),
  //           ]);
  //           noOfEmployees += 1;
  //           totalHoursSum += d.consumeTime;
  //           activitySum += activity;
  //           moneySum += (d.consumeTime / 3600) * d.employee?.payRate;
  //           durationSum += d.endTime - d.startTime;
  //         });
  //         arr.push([
  //           'total',
  //           '',
  //           '',
  //           '',
  //           timeCC(durationSum),
  //           '',
  //           `${(totalHoursSum / 3600).toFixed(2)} hr`,
  //           `${(activitySum / noOfEmployees).toFixed(2)} %`,
  //           moneySum.toFixed(2),
  //         ]);
  //       }

  //       let wb = utils.book_new();
  //       let ws = utils.aoa_to_sheet(arr);
  //       if (options.groupBy === 'E' || 'P' || 'C' || 'A') {
  //         ws['!cols'] = [{ wch: 30 }, { wch: 30 }];
  //       } else {
  //         ws['!cols'] = [{ wch: 10 }, { wch: 30 }, { wch: 30 }, { wch: 10 }, { wch: 10 }, { wch: 30 }];
  //       }
  //       utils.book_append_sheet(wb, ws);
  //       writeFile(wb, `${name}.xlsx`);
  //     } catch (err) {
  //       console.log(err);
  //       enqueueSnackbar(err.message, { variant: 'error' });
  //     }
  //   };

  const scheduleEmailChildren = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <TextField disabled={!schedule} id="email" label="Email" value={'email'} />
      <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
        <Autocomplete
          disabled={!schedule}
          value={interval}
          onChange={(e, value) => setinterval(value)}
          disablePortal
          options={['Monthly', 'Weekly', 'Daily']}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Select interval" />}
        />
        {interval === 'Weekly' && (
          <Autocomplete
            disabled={!schedule}
            value={weeklyDay}
            onChange={(e, value) => setweeklyDay(value)}
            disablePortal
            options={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
            sx={{ width: 300, ml: 1 }}
            renderInput={(params) => <TextField {...params} label="Select Day" />}
          />
        )}
        {interval === 'Monthly' && (
          <Autocomplete
            disabled={!schedule}
            defaultValue={1}
            onChange={(e, value) => setmonthlyDate(value)}
            disablePortal
            options={Array(28)
              .fill()
              .map((x, i) => i + 1)}
            sx={{ width: 300, ml: 1 }}
            renderInput={(params) => <TextField {...params} label="Select date" />}
          />
        )}
        <Autocomplete
          disabled={!schedule}
          value={dailyTime}
          defaultValue="12:00 am"
          onChange={(e, value) => setdailyTime(value)}
          disablePortal
          options={[]}
          sx={{ width: 300, ml: 1 }}
          renderInput={(params) => <TextField {...params} label="Select Time" />}
        />
      </Box>
    </Box>
  );
  const shareReportChildren = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel
        disabled={!share}
        label="Include screenshots"
        control={<Checkbox checked={includeSS} onClick={() => setincludeSS(!includeSS)} />}
      />
      <FormControlLabel
        disabled={!share}
        label="Include money"
        control={<Checkbox checked={includePR} onClick={() => setincludePR(!includePR)} />}
      />
      <FormControlLabel
        disabled={!share}
        label="Include activity level"
        control={<Checkbox checked={includeAL} onClick={() => setincludeAL(!includeAL)} />}
      />
      <FormControlLabel
        disabled={!share}
        label={`Include Apps & Url charts`}
        control={<Checkbox checked={includeApps} onClick={() => setincludeApps(!includeApps)} />}
      />
    </Box>
  );

  const handleSave = () => {
    console.log(reports);

    // schedule,
    // scheduleType,
    // scheduleEmail,
    // share,
    // options,
    // url,
    // includeSS,
    // includeAL,
    // includePR,
    // includeApps,
    // name: name === "" ? `${firstName} ${lastName}` : name,
    // fileName,

    const data = {
      schedule,
      scheduleType: [interval, monthlyDate, dailyTime],
      scheduledEmail: 'email',
      share,
      options,
      url,
      includeSS,
      includeAL,
      includePR,
      includeApps,
      reports: reports.reports,
      name,
    };
    axios.post('/report/save', data).then((res) => {
      console.log(res);
      setopen(!open);
    });
    if (share) {
      navigator.clipboard.writeText(`${window.location.origin}/reports/sharedReports/${url}`);
      enqueueSnackbar('link copied', { variant: 'success' });
    }
  };

  return (
    <>
      {/* {expdf ? <PdfExport options={options} /> : ''} */}
      <div style={{ marginRight: '2.5%' }}>
        <Button variant="outlined">Export pdf</Button>
        <Button variant="outlined" sx={{ ml: 1 }}>
          Export excel
        </Button>
        <Button variant="outlined" sx={{ ml: 1 }}>
          Share Report
        </Button>
        <Button variant="outlined" onClick={() => setopen(true)} sx={{ ml: 1 }}>
          Save Report
        </Button>

        <Dialog open={open}>
          <DialogTitle>Save Reports</DialogTitle>
          <DialogContent>
            <DialogContentText>
              {' '}
              {/*  */}
              <Typography gutterBottom>
                Date range :
                {` ${options?.dateOne === null ? '' : options?.dateOne}-${options?.dateTwo ? '' : options?.dateTwo}`}
              </Typography>
              {/*  */}
              <Typography gutterBottom>Description: {name}</Typography>
              {/*  */}
              <TextField value={name} label="Name" />
            </DialogContentText>

            {/*  */}
            <TextField
              sx={{ mt: 1.5 }}
              disabled={!share}
              fullWidth
              label="Sharing link"
              defaultValue={`${window.location.origin}/reports/sharedReports/${url}`}
              InputProps={{
                readOnly: true,
              }}
            />
            {/*  */}
            <Box>
              <FormControlLabel
                label="Share Report"
                control={<Checkbox checked={share} onClick={() => setshare(!share)} />}
              />
              {shareReportChildren}
            </Box>
            <Box>
              <FormControlLabel
                label="Schedule Email"
                control={<Checkbox checked={schedule} onClick={() => setschedule(!schedule)} />}
              />
              {scheduleEmailChildren}
            </Box>
          </DialogContent>
          <DialogActions>
            <Button onClick={() => setopen(false)}>Cancel</Button>
            <Button onClick={handleSave}>Save</Button>
          </DialogActions>
        </Dialog>
      </div>
    </>
  );
}
