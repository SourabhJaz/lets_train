export function ajaxUtil(params){
	var promiseObject = new Promise(function(resolve,reject){
    	var req, formData;
      req = new XMLHttpRequest();
      formData= params.formData? JSON.stringify(params.formData):null;
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

      if(params.contentType){
        req.setRequestHeader('Content-Type', params.contentType || "application/json");        
      }

      req.setRequestHeader('Accept', params.accept || "application/json");

      if(params.token)
      {
        req.setRequestHeader('Authorization', params.token);
       }
       
    	req.send(formData);
	});
	return promiseObject;
}

export function consoleError(msg){
  console.log(msg);
}
