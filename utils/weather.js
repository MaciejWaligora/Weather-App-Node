const request = require('request');

//weather
const req_weather =(lat, lon,callback)=>{
    const url_weather = "http://api.weatherstack.com/current?access_key=03f7ff53be34dad69860362879407cb6&query="+lat+","+lon;
    request({url: url_weather, json: true }, (error, response)=>{
    if (error){
        callback("Unable to connect to wheather service",undefined);
    } else if(response.body.error){
        callback(response.body.error.info, undefined);
    } else{
        callback(undefined, {
            desc: response.body.current.weather_descriptions[0],
            tmp: response.body.current.temperature,
            tmp_feel: response.body.current.feelslike,
            });
        }
    });
}

module.exports = req_weather;