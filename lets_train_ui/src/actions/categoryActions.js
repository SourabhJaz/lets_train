import {ajaxUtil} from '../utility/ajaxUtility';
import {STORE_CATEGORIES, UPDATE_CATEGORIES} from '../constants/frontEndConstants';
import {SUCCESS, ERROR} from '../constants/frontEndConstants';
import {setNotification} from './notificationActions';

/**
  * This action will dispatch when the user authorized, dispatching from authLoginUser action
  */
function storeCategories(data){
  return {
   type: STORE_CATEGORIES,
   data
 };
}

function updateCategories(){
  return {
   type: UPDATE_CATEGORIES
 };
}

export function postCategory(params){
    var promiseObject = ajaxUtil(params);
    return dispatch => {
     return (promiseObject).then(
      data => {
        dispatch(updateCategories());
        dispatch(setNotification({
            type: SUCCESS,
            message: "Category added!"
          }))
      }).catch(
      error => {
          dispatch(setNotification({
            type: ERROR,
            message: "Error adding new category"
          }))
      });
   };
}

export function getAllCategories(params){
    var promiseObject = ajaxUtil(params);
    return dispatch => {
     return (promiseObject).then(
     	data => dispatch(storeCategories(data))
      ).catch(
     	error => console.log(error)
  	  );
   };
}
