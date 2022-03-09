const weatherForm = document.querySelector("form");
const input =  document.querySelector("input");
const message1 = document.querySelector("#message1");
const message2 = document.querySelector("#message2");



weatherForm.addEventListener('submit',(e)=>{
    e.preventDefault();
   askWeather(input.value);
})

const askWeather =async (location) =>{
    message1.textContent = "Loading...";
    var weatherResponse = await fetch('/weather?address='+location).then((res)=>{
        res.json().then((data)=>{
            message1.textContent = "";
            if(data.error){
                console.log(data.error);
                message2.textContent =data.error;
            }else{
               
                console.log("Exact location: "+data.location.location);
                console.log("Weather: "+data.weather.desc);
                console.log("Temperature: "+data.weather.tmp+"*C");
                console.log("Temperature feel: "+data.weather.tmp_feel+"*C");
                console.log("humidity is: "+ data.weather.humidity + "%");
                message2.textContent ="Exact location: "+data.location.location+" | "+"Weather: "+data.weather.desc+" | "+"Temperature: "+data.weather.tmp+"*C"+" | "+"Temperature feel: "+data.weather.tmp_feel+"*C" + " | "+"Humidity is: "+ data.weather.humidity + "%";
            }
        });
    });
}





