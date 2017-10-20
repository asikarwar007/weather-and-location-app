const axios = require('axios');
const yargs = require('yargs');

const argv = yargs
.options({
	a: {
		demand : true,
		alias:'address',
		describe:' address to factch',
		string:true
	}
})
.help()
.alias('help','h')
.argv;
// console.log(argv);

var encodedAddress = encodeURIComponent(argv.address);
 var geoCodeURL = `https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress}`; 

axios.get(geoCodeURL)
  .then((response) =>{
  	if (response.data.status === 'ZERO_RESULTS'){
  		throw new error('unavl to fatch location');
  	}

  	var lat = response.data.results[0].geometry.location.lat;
	var lan = response.data.results[0].geometry.location.lng;
	var address = response.data.results[0].address_components[5].short_name;
	// console.log(address);
	var weatherURL = `https://api.darksky.net/forecast/25af6133ee4a1f9f4151258fbf7b3286/${lat},${lan}`;

	axios.get(weatherURL).then((response) =>{
		var temp = response.data.currently.temperature;
		var apparentTemperature = response.data.currently.apparentTemperature;
		console.log(`it's ${temp}'F in ${address} but feels like ${apparentTemperature}'F`)
	})


  })
  .catch(function (error) {
    console.log(error);
  });
 
 // geocode.geocodeAddress(argv.address, (errorMessage, results) =>{
// 	if(errorMessage){
// 		console.log(errorMessage);
// 	}
// 	else {
// 		// console.log(results.address);

// weather.getWeather(results.lat, results.lan, (errorMessage, weatherresults) =>{
// 	if (errorMessage){
// 		console.log(errorMessage);
// 	} else {
// 		// console.log(JSON.stringify(weatherresults,undefined,2));
// 		console.log(`it's ${weatherresults.temp}'F in ${results.address} but feels like ${weatherresults.apparentTemperature}'F`);
// 		console.log('get all the weather results in')
// 	}
// });

// 	}
// });

