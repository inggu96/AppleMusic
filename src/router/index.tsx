import Layout from '@/components/Layout';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-dom';

import { Home, Music, Search } from '../pages';

const Routers = createBrowserRouter([
  {
    path: '/',
    element: <Home />, // '/' 경로에 대해 TestPage 컴포넌트를 렌더링합니다.
  },
  {
    path: '/:id',
    element: <Home />, // '/' 경로에 대해 TestPage 컴포넌트를 렌더링합니다.
  },
  {
    path: '/music',
    element: <Music />, // '/' 경로에 대해 TestPage 컴포넌트를 렌더링합니다.
  },
  {
    path: '/search',
    element: <Search />, // '/' 경로에 대해 TestPage 컴포넌트를 렌더링합니다.
  },
  // 필요에 따라 추가 라우트 설정
]);

const Router = () => {
  return <RouterProvider router={Routers} />;
};

export default Router;
