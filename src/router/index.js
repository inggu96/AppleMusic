import { AnimatePresence } from 'framer-motion';
import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Layout } from '../components';
import { BaseLogin, Home, MovieHome, Music, Search } from '../pages';
import GoogleLogIn from '../pages/Login';

const route = (
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<GoogleLogIn />} />
    <Route path="/fire" element={<BaseLogin />} />
    <Route path="/music" element={<Music />} />
    <Route path="/search" element={<Search />} />
    <Route path="/movies" element={<MovieHome />} />
    <Route path="/movies/:movieId" element={<MovieHome />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;
