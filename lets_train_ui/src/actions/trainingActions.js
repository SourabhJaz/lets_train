import {ajaxUtil} from '../utility/ajaxUtility';
import {STORE_TRAININGS, STORE_CONTENT} from '../constants/frontEndConstants';

/**
  * This action will dispatch when the user authorized, dispatching from authLoginUser action
  */
function storeTrainings(data){
  return {
   type: STORE_TRAININGS,
   data
 };
}

function storeContent(data){
  return {
   type: STORE_CONTENT,
   data
 };
}

export function getAllTrainings(params){
    var promiseObject = ajaxUtil(params);
    return dispatch => {
     return (promiseObject).then(
     	data => dispatch(storeTrainings(data))
      ).catch(
     	error => console.log(error)
  	  );
   };
}

export function getTrainingContent(params){
    var promiseObject = ajaxUtil(params);
    return dispatch => {
     return (promiseObject).then(
      data => dispatch(storeContent(data))
      ).catch(
      error => console.log(error)
      );
   };
}

export function postTrainingContent(params){
    var promiseObject = ajaxUtil(params);
    return dispatch => {
     return (promiseObject).then(
      data => console.log(data)
      ).catch(
      error => console.log(error)
      );
   };
}