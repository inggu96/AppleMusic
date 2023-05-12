import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Layout } from '../components';
import { Home, Mypage } from '../pages';

const route = (
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/my" element={<Mypage />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;
