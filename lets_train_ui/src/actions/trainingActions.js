import {ajaxUtil} from '../utility/ajaxUtility';
import {STORE_TRAININGS, UPDATE_TRAININGS} from '../constants/frontEndConstants';
import {SUCCESS, ERROR} from '../constants/frontEndConstants';
import {setNotification} from './notificationActions';

/**
  * This action will dispatch when the user authorized, dispatching from authLoginUser action
  */
export function storeTrainings(data){
  return {
   type: STORE_TRAININGS,
   data
 };
}

function updateTrainings(){
  return {
   type: UPDATE_TRAININGS
 };
}

export function getAllTrainings(params){
    var promiseObject = ajaxUtil(params);
    return dispatch => {
     return (promiseObject).then(
     	data => dispatch(storeTrainings(data))
      ).catch(
     	error => { console.log(error) 
      });
   };
}

export function postTraining(params){
    var promiseObject = ajaxUtil(params);
    return dispatch => {
     return (promiseObject).then(
      data => {
        dispatch(updateTrainings());
        dispatch(setNotification({
            type: SUCCESS,
            message: "Training added!"
          }))
      }).catch(
      error => {
          dispatch(setNotification({
            type: ERROR,
            message: "Error in adding new training"
          }))
      });
   };
}
