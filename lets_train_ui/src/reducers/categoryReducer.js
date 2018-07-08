import {STORE_CATEGORIES} from '../constants/frontEndConstants';

export function categoryData(state={},action){
  switch (action.type) {
   case STORE_CATEGORIES:
      let list = action.data.results;   
      return Object.assign({}, state, {
        "categoryList":list
      });
   default:
     return state;
 }
}


