axios.post(url, params,{

    "headers": {
    
    "content-type": "application/json",
    
    },
    
    })
    .then(function(response) {
    
    console.log(response);
    
    })
    
    .catch(function(error) {
    
    console.log(error);
    
    });
    
};