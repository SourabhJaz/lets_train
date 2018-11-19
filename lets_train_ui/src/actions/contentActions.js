import {ajaxUtil} from '../utility/ajaxUtility';
import {STORE_CONTENT,CONTENT_PROGRESS} from '../constants/frontEndConstants';
import {SUCCESS, ERROR} from '../constants/frontEndConstants';
import {setNotification} from './notificationActions';

export function storeContent(data){
  return {
   type: STORE_CONTENT,
   data
 };
}

export function setContentProgress(data){
	return {
		type: CONTENT_PROGRESS,
		data
	}
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
      data => {
          dispatch(setNotification({
            type: SUCCESS,
            message: "Content added!"
          }))
      }).then(() => {
        setTimeout(() => {
          dispatch(setContentProgress({
            loaded: 0,
            total: 0
          })
        )}, 2000);
      }).catch(
      error => {
          dispatch(setNotification({
            type: ERROR,
            message: "Error in adding new content"
          }))
      });
   };
}