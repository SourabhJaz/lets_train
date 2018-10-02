import { combineReducers } from 'redux';
import { routerReducer as routing } from 'react-router-redux';
import {authLogin} from './reducers/loginReducer';
import {categoryData} from './reducers/categoryReducer';
import {trainingData} from './reducers/trainingReducer';
import {departmentData} from './reducers/departmentReducer';
import {userData} from './reducers/userReducer';
import {contentData} from './reducers/contentReducer'; 
import {notificationData} from './reducers/notificationReducer';

//Add the list of reducers in combineReducers method

const rootReducer = combineReducers({
   routing,
   authLogin,
   categoryData,
   trainingData,
   departmentData,
   userData,
   contentData,
   notificationData
});

export default rootReducer;