import {
  createBrowserRouter,
  createRoutesFromElements,
  Route,
} from 'react-router-dom';
import { Layout } from '../components';
import {
  BaseLogin,
  Home,
  InsertData,
  JsonUser,
  Player,
  Youtube,
} from '../pages';
import GoogleLogIn from '../pages/Login';

const route = (
  <Route element={<Layout />}>
    <Route path="/" element={<Home />} />
    <Route path="/login" element={<GoogleLogIn />} />
    <Route path="/fire" element={<BaseLogin />} />
    <Route path="/gogle" element={<Youtube />} />
    <Route path="/user" element={<JsonUser />} />
    <Route path="/play" element={<InsertData />} />
    <Route path="/music" element={<Player />} />
  </Route>
);

const rootRouter = createBrowserRouter(createRoutesFromElements(route));
export default rootRouter;
