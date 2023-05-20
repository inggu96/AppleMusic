import { createStore, combineReducers, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import videoReducer from '../VideoReducers';

const rootReducer = combineReducers({
  videos: videoReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
