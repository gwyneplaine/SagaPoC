import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';
import active from './active';

const reducers = combineReducers({
	routing: routerReducer,
	active,
});


export default reducers;
