// component
import Iconify from '../../components/Iconify';

// ----------------------------------------------------------------------

const getIcon = (name) => <Iconify icon={name} width={22} height={22} />;

// ud from localStorage
const ud = JSON.parse(localStorage.ud);

const navConfig = [
  {
    title: 'timeline',
    path: `/dashboard/timeline/${ud._id}`,
    icon: getIcon('eva:pie-chart-2-fill'),
  },
  {
    title: 'dashboard',
    path: '/dashboard/dashboard',
    icon: getIcon('eva:shopping-bag-fill'),
  },
  {
    title: 'Reports',
    path: '/dashboard/reports',
    icon: getIcon('eva:lock-fill'),
  },
  {
    title: 'clients',
    path: '/dashboard/clients',
    icon: getIcon('eva:people-fill'),
  },
  {
    title: 'Projects',
    path: '/dashboard/projects',
    icon: getIcon('eva:alert-triangle-fill'),
  },
  // {
  //   title: 'register',
  //   path: '/register',
  //   icon: getIcon('eva:person-add-fill'),
  // },
  // {
  //   title: 'Not found',
  //   path: '/404',
  //   icon: getIcon('eva:alert-triangle-fill'),
  // },
  {
    title: 'settings',
    path: '/dashboard/setting',
    icon: getIcon('ant-design:setting-filled'),
  },
];

export default navConfig;
