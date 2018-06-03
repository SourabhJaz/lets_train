import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';

//Add the list of reducers in combineReducers method

const rootReducer = combineReducers({
   routing
});

export default rootReducer;