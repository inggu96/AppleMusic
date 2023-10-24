import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Layout } from '../components';
import { BaseLogin, Home, Music, Search } from '../pages';
import GoogleLogIn from '../pages/Login';

const route = (
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/:id" element={<Home />} />
    <Route path="/login" element={<GoogleLogIn />} />
    <Route path="/fire" element={<BaseLogin />} />
    <Route path="/music" element={<Music />} />
    <Route path="/search" element={<Search />} />
    <Route path="/table" element={<Table />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;
