import Layout from '@/components/Layout';
import Home from '@/pages/Home';
import Music from '@/pages/Music';
import Search from '@/pages/Search';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

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
    path: '/music',
    element: <Music />,
  },
  {
    path: '/search',
    element: <Search />,
  },
]);

const Router = () => {
  return <RouterProvider router={Routers} />;
};

export default Router;
