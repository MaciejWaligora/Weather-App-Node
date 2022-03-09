const request = require('request');

//Geocoding
const req_geo =(address, callback)=>{
    const url_geo = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+encodeURIComponent(address)+".json?access_token=pk.eyJ1IjoibWFjaWVqLXdhbGlnb3JhIiwiYSI6ImNrb3N6b3YyZzA2ZmsydG55eWV3c2U0ZTkifQ.pcbCiYTzox5nAIqsC-6Exg&limit=1"
    request({url: url_geo, json: true }, (error, response)=>{
        if(error){
            callback('Unable to connect to location services', undefined);
        } else if(response.body.features.length <1){
            callback("location cannot be found", undefined); 
        } else{
            callback(undefined, {
                lat: response.body.features[0].center[1],
                lon: response.body.features[0].center[0],
                location: response.body.features[0].place_name
            });
        
        }
    });
}

module.exports = req_geo;