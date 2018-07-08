import {STORE_DEPARTMENTS} from '../constants/frontEndConstants';

export function departmentData(state={},action){
  switch (action.type) {
   case STORE_DEPARTMENTS:
      let list = action.data.results;   
      return Object.assign({}, state, {
        "departmentList":list
      });
   default:
     return state;
 }
}


