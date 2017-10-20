const request = require('request');
const yargs = require('yargs');

const geocode = require('./geocode');
const weather = require('./weather');

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

geocode.geocodeAddress(argv.address, (errorMessage, results) =>{
	if(errorMessage){
		console.log(errorMessage);
	}
	else {
		// console.log(results.address);

weather.getWeather(results.lat, results.lan, (errorMessage, weatherresults) =>{
	if (errorMessage){
		console.log(errorMessage);
	} else {
		// console.log(JSON.stringify(weatherresults,undefined,2));
		console.log(`it's ${weatherresults.temp}'F in ${results.address} but feels like ${weatherresults.apparentTemperature}'F`);
		console.log('get all the weather results in')
	}
});

	}
});
