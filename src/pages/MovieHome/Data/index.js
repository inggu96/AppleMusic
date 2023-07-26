import {
  HomeIcon,
  InvoiceIcon,
  UserIcon,
  HeadphonesIcon,
  PageviewIcon,
} from '../../../Common/Icons';

export const SidebarData = [
  {
    id: 1,
    name: '',
    path: '/',
    icon: <HomeIcon />,
  },
  {
    id: 2,
    name: '바로듣기',
    path: 'music',
    icon: <HeadphonesIcon />,
  },
  {
    id: 3,
    name: '플레이리스트',
    path: 'calendar',
    icon: <PageviewIcon />,
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
  {
    id: 'doughnut',
    category: 'Doughnut',
    title: '今日のおやつはみんな大好きドーナツ',
    pointOfInterest: 80,
    backgroundColor: '#814A0E',
  },
];
