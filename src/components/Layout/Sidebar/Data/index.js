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
    name: '홈',
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
    path: 'search',
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
];
