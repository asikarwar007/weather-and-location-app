
const request = require('request');


var getWeather = (lat, lan,callback) =>{


request({
  url: `https://api.darksky.net/forecast/25af6133ee4a1f9f4151258fbf7b3286/${lat},${lan}`,
  json: true
}, (error, response, body) => {
  if (error) {
    callback('Unable to connect to Forecast.io server.');
  } else if (response.statusCode === 400) {
    callback('Unable to fetch weather.');
  } else if (response.statusCode === 200) {
    callback(undefined, {
    	temp: body.currently.temperature,
    	apparentTemperature : body.currently.apparentTemperature

    });
    console.log(`https://api.darksky.net/forecast/25af6133ee4a1f9f4151258fbf7b3286/${lat},${lan}`);
    
  }
});
}


module.exports.getWeather = getWeather;