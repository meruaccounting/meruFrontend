import * as React from 'react';
import PropTypes from 'prop-types';
import Button from '@mui/material/Button';
import { FormControl, FormControlLabel, Autocomplete, Checkbox } from '@mui/material';
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

const BootstrapDialog = styled(Dialog)(({ theme }) => ({
  '& .MuiDialogContent-root': {
    padding: theme.spacing(2),
  },
  '& .MuiDialogActions-root': {
    padding: theme.spacing(1),
  },
}));

const BootstrapDialogTitle = (props) => {
  const { children, onClose, ...other } = props;

  return (
    <DialogTitle sx={{ m: 0, p: 2 }} {...other}>
      {children}
      {onClose ? (
        <IconButton
          aria-label="close"
          onClick={onClose}
          sx={{
            position: 'absolute',
            right: 8,
            top: 8,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      ) : null}
    </DialogTitle>
  );
};

BootstrapDialogTitle.propTypes = {
  children: PropTypes.node,
  onClose: PropTypes.func.isRequired,
};

export default function ReportsOptions({ reports, options }) {
  const [open, setOpen] = React.useState(false);
  const [name, setName] = React.useState(`${options?.groupBy}`);
  const [checked, setChecked] = React.useState([true, '']);
  const [ssval, setSsval] = React.useState([false, '']);
  const [moneyval, setMoneyval] = React.useState([false, '']);
  const [alval, setAlval] = React.useState([false, '']);
  const [appurl, setAppurl] = React.useState([false, '']);
  const [scheduleChecked, setScheduleChecked] = React.useState([false, '']);
  const [expdf, setExPdf] = React.useState(false);
  const [timeint, setTimeint] = React.useState('Daily');
  const [dayint, setDayint] = React.useState(null);
  const [hourint, setHourint] = React.useState('12:00');
  const [monthlyDate, setMonthlyDate] = React.useState([]);
  const { enqueueSnackbar } = useSnackbar();

  const [url, setUrl] = React.useState(uuidv4());
  // Default name of the saved report
  React.useEffect(() => {
    // if (options?.groupBy === 'E') {
    //   options?.userIds?.length
    //     ? setName(`${options.userIds?.length} employee - Summary by employees`)
    //     : setName(`Summary by employees`);
    // }
    // if (options?.groupBy === 'D') {
    //   options.userIds?.length
    //     ? setName(`${options.userIds.length} employee - Summary by details`)
    //     : setName(`Summary by Details`);
    // }
    // if (options?.groupBy === 'P') {
    //   options.userIds?.length
    //     ? setName(`${options?.userIds.length} employee - Summary by projects`)
    //     : setName(`Summary by projects`);
    // }
    // if (options?.groupBy === 'C') {
    //   options.userIds?.length
    //     ? setName(`${options?.userIds?.length} employee - Summary by Clients`)
    //     : setName(`Summary by Clients`);
    // }
    // if (options?.groupBy === 'A') {
    //   options?.userIds?.length
    //     ? setName(`${options?.userIds?.length} employee - Summary by Apps&Url`)
    //     : setName(`Summary by App&Urls`);
    // }
  }, [options]);

  React.useEffect(() => {
    setUrl(uuidv4());
  }, [open]);

  //   const data = {
  //     schedule: scheduleChecked[0],
  //     scheduleType: [timeint, dayint, hourint],
  //     scheduledEmail: loginC?.userData?.email,
  //     // scheduledTime: ,
  //     share: checked[0],
  //     includeSS: ssval[0],
  //     includeAL: alval[0],
  //     includePR: moneyval[0],
  //     includeApps: appurl[0],
  //     reports: reports.reports,
  //     url,
  //     name,
  //     options: options,
  //   };

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

  const children2 = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <OutlinedInput id="component-outlined" value={'email'} label="mail" />
      <Box sx={{ display: 'flex', flexDirection: 'row', mt: 2 }}>
        <Autocomplete
          defaultValue="Daily"
          onChange={(e, value) => setTimeint(value)}
          disablePortal
          id="combo-box-demo"
          options={['Monthly', 'Weekly', 'Daily']}
          sx={{ width: 300 }}
          renderInput={(params) => <TextField {...params} label="Select interval" />}
        />
        {timeint === 'Weekly' && (
          <Autocomplete
            defaultValue="Monday"
            onChange={(e, value) => setDayint(value)}
            disablePortal
            id="combo-box-demo"
            options={['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday']}
            sx={{ width: 300, ml: 1 }}
            renderInput={(params) => <TextField {...params} label="Select Day" />}
          />
        )}
        {timeint === 'Monthly' && (
          <Autocomplete
            defaultValue={1}
            onChange={(e, value) => setDayint(value)}
            disablePortal
            id="combo-box-demo"
            options={Array(28)
              .fill()
              .map((x, i) => i + 1)}
            sx={{ width: 300, ml: 1 }}
            renderInput={(params) => <TextField {...params} label="Select date" />}
          />
        )}
        <Autocomplete
          defaultValue="12:00 am"
          onChange={(e, value) => setHourint(value)}
          disablePortal
          id="combo-box-demo"
          options={[]}
          sx={{ width: 300, ml: 1 }}
          renderInput={(params) => <TextField {...params} label="Select Time" />}
        />
      </Box>
    </Box>
  );
  const children = (
    <Box sx={{ display: 'flex', flexDirection: 'column', ml: 3 }}>
      <FormControlLabel label="Include screenshots" control={<Checkbox checked={ssval[0]} />} />
      {true ? <FormControlLabel label="Include money" control={<Checkbox checked={moneyval[0]} />} /> : ''}
      <FormControlLabel label="Include activity level" control={<Checkbox checked={alval[0]} />} />

      <FormControlLabel label="Include Apps&Url charts" control={<Checkbox checked={appurl[0]} />} />
    </Box>
  );

  return (
    <>
      {expdf ? <PdfExport options={options} /> : ''}
      <div style={{ marginRight: '2.5%' }}>
        <Button variant="outlined">Export pdf</Button>
        <Button variant="outlined" sx={{ ml: 1 }}>
          Export excel
        </Button>
        <Button variant="outlined" sx={{ ml: 1 }}>
          Share Report
        </Button>
        <Button variant="outlined" sx={{ ml: 1 }}>
          Save Report
        </Button>
        <BootstrapDialog aria-labelledby="customized-dialog-title" open={open}>
          <BootstrapDialogTitle id="customized-dialog-title">Save Report</BootstrapDialogTitle>
          <DialogContent dividers>
            <Typography gutterBottom>
              Date range :
              {`${options?.dateOne === null ? '' : options?.dateOne}-${options?.dateTwo ? '' : options?.dateTwo}`}
            </Typography>
            <Typography gutterBottom>Description: {name}</Typography>
            <FormControl>
              <InputLabel htmlFor="component-outlined">Name</InputLabel>
              <OutlinedInput id="component-outlined" value={name} label="Name" />
            </FormControl>

            <Box sx={{ mt: 1.5 }}>
              <TextField
                disabled={!checked[0]}
                fullWidth
                label="Sharing link"
                defaultValue={`${window.location.origin}/reports/sharedReports/${url}`}
                // defaultValue={`https://monitor-meruaccounting-bf9db.web.app/reports/sharedReports/${url}`}
                InputProps={{
                  readOnly: true,
                }}
              />
            </Box>

            <div>
              <FormControlLabel
                label="Share Report"
                control={<Checkbox defaultChecked={checked} checked={checked[0]} />}
              />
              {checked[0] ? children : null}
            </div>
            <div>
              <FormControlLabel
                label="Schedule Email"
                control={<Checkbox defaultChecked={false} checked={scheduleChecked[0]} />}
              />
              {scheduleChecked[0] ? children2 : null}
            </div>
          </DialogContent>
          <DialogActions>
            <Button autoFocus>Save & Copy</Button>
          </DialogActions>
        </BootstrapDialog>
      </div>
    </>
  );
}
