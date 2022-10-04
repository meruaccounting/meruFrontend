import { Navigate, useRoutes } from 'react-router-dom';
// layouts
import DashboardLayout from './layouts/dashboard';
import LogoOnlyLayout from './layouts/LogoOnlyLayout';
//
import Setting from './pages/Setting';
import Clients from './pages/Clients';
import Login from './pages/Login';
import NotFound from './pages/Page404';
import Register from './pages/Register';
import Dashboard from './pages/Dashboard';
import Projects from './pages/Projects';
import UserPage from './pages/UserPage';
import Reports from './pages/Reports';

// ----------------------------------------------------------------------

export default function Router() {
  const token = localStorage['Bearer Token'];

  return useRoutes([
    {
      path: '/dashboard',
      element: token ? <DashboardLayout /> : <Navigate to="/login" />,
      children: [
        { path: 'timeline/:id', element: <UserPage /> },
        { path: 'clients', element: <Clients /> },
        { path: 'reports', element: <Reports /> },
        { path: 'dashboard', element: <Dashboard /> },
        { path: 'setting', element: <Setting /> },
        { path: 'projects', element: <Projects /> },
      ],
    },
    {
      path: 'login',
      element: !token ? <Login /> : <Navigate to="/dashboard/dashboard" />,
    },
    {
      path: 'register',
      element: !token ? <Register /> : <Navigate to="/dashboard/dashboard" />,
    },
    {
      path: '/',
      element: <LogoOnlyLayout />,
      children: [
        { path: '/', element: <Navigate to="/dashboard/dashboard/" /> },
        { path: '404', element: <NotFound /> },
        { path: '*', element: <Navigate to="/404" /> },
      ],
    },
    {
      path: '*',
      element: <Navigate to="/404" replace />,
    },
  ]);
}
