import {STORE_CATEGORIES,UPDATE_CATEGORIES} from '../constants/frontEndConstants';

export function categoryData(state={},action){
  switch (action.type) {
   case STORE_CATEGORIES:
      let list = action.data;   
      return Object.assign({}, state, {
        "categoryList":list,
        "updated":false
      });
   case UPDATE_CATEGORIES:
      return Object.assign({}, state, {
        "updated":true
      });   	
   default:
     return state;
 }
}


