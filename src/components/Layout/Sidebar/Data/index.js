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
    name: '둘러보기',
    path: '/',
    icon: <HomeIcon />,
  },
  {
    id: 2,
    name: '인기검색어',
    path: 'music',
    icon: <HeadphonesIcon />,
  },
  {
    id: 3,
    name: '검색하기',
    path: 'search',
    icon: <PageviewIcon />,
  },
];
