import {STORE_TRAININGS,UPDATE_TRAININGS} from '../constants/frontEndConstants';

export function trainingData(state={},action){
  switch (action.type) {
   case STORE_TRAININGS:
      let trainingList = action.data;   
      return Object.assign({}, state, {
        "trainingList":trainingList,
        "updated":false
      });
   case UPDATE_TRAININGS:
      return Object.assign({}, state, {
        "updated":true
      });   
   default:
     return state;
 }
}


