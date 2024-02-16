import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Layout } from '../components';
import { Home, Music, Search } from '../pages';

const route = (
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/:id" element={<Home />} />
    <Route path="/music" element={<Music />} />
    <Route path="/search" element={<Search />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;
