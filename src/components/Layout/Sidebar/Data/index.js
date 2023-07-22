import {
  HomeIcon,
  LayoutIcon,
  CalendarIcon,
  InvoiceIcon,
  UserIcon,
} from '../Icons';

export const SIDEBAR_DATA = [
  {
    id: 1,
    name: '홈',
    path: '/',
    icon: <HomeIcon />,
  },
  {
    id: 2,
    name: '바로듣기',
    path: 'music',
    icon: <LayoutIcon />,
  },
  {
    id: 3,
    name: '플레이리스트',
    path: 'calendar',
    icon: <CalendarIcon />,
  },
  {
    id: 4,
    name: 'invoice',
    path: 'invoice',
    icon: <InvoiceIcon />,
  },
  {
    id: 5,
    name: 'users',
    path: 'users',
    icon: <UserIcon />,
  },
];
