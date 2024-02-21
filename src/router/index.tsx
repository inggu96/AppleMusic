import Home from '@/pages/Home';
import Chart from '@/pages/Home/Chart';
import Music from '@/pages/Music';
import PlayList from '@/pages/PlayList';
import Search from '@/pages/Search';
import { createBrowserRouter, RouterProvider } from 'react-router-dom';

const Routers = createBrowserRouter([
  {
    path: '/',
    element: <Home />,
  },
  {
    path: '/:id',
    element: <Home />,
  },
  {
    path: '/charts',
    element: <Chart />,
  },
  {
    path: '/search',
    element: <Search />,
  },
  {
    path: '/playlists',
    element: <PlayList />,
  },
]);

const Router = () => {
  return <RouterProvider router={Routers} />;
};

export default Router;
