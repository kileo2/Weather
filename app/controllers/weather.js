var express = require('express');
router = express.Router();

var http = require('http');

const key = "99a8db9a0f3c2e31";

var newData={};

var newArray=[];

var finalArray;

function getWeather(state, city){
    for(var i = 0; i < state.length;i++){
        let url = "http://api.wunderground.com/api/" + key + "/conditions/forecast/forecast10day/q/" + state[i] + "/" + city[i] + ".json";
        newArray.push(url);
    }
    return newArray
}

module.exports = function (app, config){
    finalArray = [];

        for (var j = 0; j < links.length; j++) {
            http.get(links[j], res => {
                res.setEncoding("utf8");
                let body = '';
                res.on('data', data => {
                    body += data;
                });
                res.on('end', () => {
                    body = JSON.parse(body);
                    //To see if the data is being pulled from the open API


                    function average(){
                        var sum = 0;
                        for(var d =0; d < body.forecast.simpleforecast.forecastday.length; d++){
                            sum = sum+ parseInt(body.forecast.simpleforecast.forecastday[d].high.fahrenheit);
                        }
                        var avg = (sum/10);
                        return avg;
                    }

                    newData = {
                        city: body.current_observation.display_location.city,
                        temp: body.current_observation.temp_f,
                        max: body.forecast.simpleforecast.forecastday[0].high.fahrenheit,
                        min: body.forecast.simpleforecast.forecastday[0].low.fahrenheit,
                        windchill: body.current_observation.windchill_f,
                        Relative_Humidity: body.current_observation.relative_humidity,
                        Average_10_day: average()
                    };



                    finalArray.push(newData);
                    finalArray.sort(function(a,b){
                        return a.max - b.max
                    })

                    console.log(finalArray);

                    for ( var b = 0; b < finalArray.length;b++) {

                        console.log("City: " + finalArray[b].city + "  " + "Temperature: " + finalArray[b].temp + "  " + "Max: " + finalArray[b].max + "  " + "Min: " + finalArray[b].min + "  " + "Wind Chill: " + finalArray[b].windchill + "  " + "Relative Humidity: " + finalArray[b].Relative_Humidity + "  " +"Relative 10 Day Average: " +finalArray[b].Average_10_day);

                    }

                    function minimum(){
                        var minArray =[];
                       for(var e = 0; e < finalArray.length; e++){
                           minArray.push(finalArray[e].Average_10_day)
                       }

                       return minArray
                    }

                    var minim = minimum(finalArray);
                    console.log("The city that has the lowest 10 day average temperature is: " + finalArray[minim.indexOf(Math.min.apply(Math,minim))].city)
                    return finalArray


                })
            });

        }

}

var links = getWeather(["MN", "WI", "WI", "IL"], ["Minneapolis", "Milwaukee", "Madison", "Chicago"]);





