export function ajaxUtil(params){
	var promiseObject = new Promise(function(resolve,reject){
    	var req, formData;
      req = new XMLHttpRequest();
      if(params && params.contentType !== false){
        formData= JSON.stringify(params.formData);
      }
      else{
      	formData = params.formData;
      }
    	req.open(params.method, params.url);

    	req.onload = function(){
    		if (req.status >= 200 && req.status < 300){
          var response = JSON.parse(req.response,req.status);
          resolve(response);
      	}
      	else {
          reject(req.statusText);
      	}
    	};

    	req.onerror = function(err) {
          reject('Error in AJAX call');    	
      	};
      	req.upload.onprogress = function(event){
    	 let progressData = {
			  loaded: event.loaded,
			  total: event.total    	 	
    	 };
    	 if(params.loadAction){
    	 	params.loadAction(progressData);
    	 }
		};
      if(params.contentType !== false){
	    req.setRequestHeader('Content-Type', params.contentType || "application/json");        
      }
      req.setRequestHeader('Accept', params.accept || "application/json");

      if(params.authorization)
      {
        req.setRequestHeader('Authorization', params.authorization);
       }
       
    	req.send(formData);
	});
	return promiseObject;
}

export function consoleError(msg){
  console.log(msg);
}
