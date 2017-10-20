const request = require('request');

var geocodeAddress = (address,callback) => {


var encodedAddress = encodeURIComponent(address);


request({
	url:` https://maps.googleapis.com/maps/api/geocode/json?address=${encodedAddress} `,
	json: true
}, (error, response, body)=>{
		// var data = JSON.stringify(body, undefined,1);
		// console.log(data);
		if(error){
			callback('error');
		} else if (body.status === 'ZERO_RESULTS'){
			callback('unable to find');

		}else if(body.status === 'OK'){
			callback(undefined, {
				address :body.results[0].formatted_address,
				lat : body.results[0].geometry.location.lat,
				lan : body.results[0].geometry.location.lng
			});
		}
}); 
}

module.exports.geocodeAddress = geocodeAddress;