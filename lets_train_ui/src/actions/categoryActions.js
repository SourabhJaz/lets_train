import {ajaxUtil} from '../utility/ajaxUtility';
import {STORE_CATEGORIES} from '../constants/frontEndConstants';

/**
  * This action will dispatch when the user authorized, dispatching from authLoginUser action
  */
function storeCategories(data){
  return {
   type: STORE_CATEGORIES,
   data
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
