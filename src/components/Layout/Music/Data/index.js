import {
  HomeIcon,
  InvoiceIcon,
  UserIcon,
  HeadphonesIcon,
  PageviewIcon,
} from '../../../Common/Icons';

export const CardData = [
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

export const searchVideos = (data) => {
  return async (dispatch) => {
    try {
      dispatch(fetchVideosRequest());

      const response = await axios.get('/search', {
        params: {
          part: 'snippet',
          q: data,
          maxResults: 10,
          order: 'relevance',
          key: 'AIzaSyB4dGTE7TllfIFr6p_hh6L2ix1NOub_Bo4',
        },
      });
      dispatch(fetchVideosSuccess(response.data.items));
      console.log(response.data.items);
    } catch (error) {
      dispatch(fetchVideosFailure(error));
    }
  };
};
