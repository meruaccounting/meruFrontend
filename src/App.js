// snackbar
import { SnackbarProvider } from 'notistack';
// routes
import Router from './routes';
// theme
import ThemeProvider from './theme';
// components
import ScrollToTop from './components/ScrollToTop';
import { BaseOptionChartStyle } from './components/chart/BaseOptionChart';

// ----------------------------------------------------------------------

export default function App() {
  return (
    <ThemeProvider>
      <SnackbarProvider maxSnack={5}>
        <ScrollToTop />
        <BaseOptionChartStyle />
        <Router />
      </SnackbarProvider>
    </ThemeProvider>
  );
}
