const express = require('express');
const path = require('path');
const hbs = require('hbs');
const req_geo = require('../utils/geocode.js');
const req_weather = require('../utils/weather.js');

const app = express();

//Define paths for express config
const publicDirectoryPath = path.join(__dirname, "../public");
const viewsPath = path.join(__dirname, "../templates/views");
const partialsPath = path.join(__dirname, "../templates/partilas");
//Setup handlebars engine and views location
app.set('view engine','hbs');
app.set('views',viewsPath)
hbs.registerPartials(partialsPath);
//Setup static directory to server
app.use(express.static(publicDirectoryPath))

app.get('', (req, res)=>{
    res.render('index', {
        title: 'Weather',
        name: "Maciej Waligora"
    });
});

app.get('/about',(req, res)=>{
    res.render('about',{
        title: 'About',
        name: 'Maciej Waligora'
    });
});

app.get('/help',(req, res)=>{
    res.render('help',{
        title: 'Help',
        name: 'Maciej Waligora'
    });
});

app.get('/weather',(req,res)=>{
    const resData={};
    if(!req.query.address){
        res.send({error:"Location data needs to be provided"});
    }else{
        req_geo(req.query.address,(error, data) =>{
            if(error){
                res.send({error:error});
            }else{
                resData.location = data;
                req_weather(data.lat, data.lon, (error, data1)=>{
                    if(error){
                        res.send(error)
                    }else{
                        resData.weather = data1;
                    res.send(resData);
                    }
                });
            }
        });
    }
});

app.get('/help/*',(req, res)=>{
    res.render('404',{
       title:'Help',
       err:'help article not found',
       name:"Maciej Waligora"
    });
});
app.get('*',(req,res)=>{ 
    res.render('404',{
        title:'404',
        err:'Page not found',
        name: "Maciej Waligora"
    })
});
app.listen(8081,()=>{console.log("Listening at port: 8081")});

