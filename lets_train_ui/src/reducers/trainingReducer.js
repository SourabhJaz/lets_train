import {STORE_TRAININGS,STORE_CONTENT} from '../constants/frontEndConstants';

export function trainingData(state={},action){
  switch (action.type) {
   case STORE_TRAININGS:
      let trainingList = action.data.results;   
      return Object.assign({}, state, {
        "trainingList":trainingList
      });
   case STORE_CONTENT:
      let contentList = action.data.training_content;   
      return Object.assign({}, state, {
        "contentList":contentList
      });   
   default:
     return state;
 }
}


