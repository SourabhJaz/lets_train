import {STORE_CONTENT,CONTENT_PROGRESS} from '../constants/frontEndConstants';

export function contentData(state={},action){
  switch (action.type) {
   case STORE_CONTENT:
      let contentList = action.data.training_content;   
      return Object.assign({}, state, {
        "contentList":contentList
      });   
   case CONTENT_PROGRESS:
   	  let progressData = action.data;
   	  return Object.assign({}, state, {
   	  	"loaded": progressData.loaded,
   	  	"total": progressData.total
   	  })
   default:
     return state;
 }
}


