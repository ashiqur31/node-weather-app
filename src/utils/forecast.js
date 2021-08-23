const request = require('request');

const forecast = (latitude, longitude, callback) => {
  const url = "http://api.weatherstack.com/current?access_key=5e2adf472f76fe9d162413a7ffd09e68&query="+latitude+","+longitude+"&units=f";
	request({url, json:true}, (error, { body }) => {
		if(error) {
			callback('Cannot connect to weather service', undefined);
		} else if(body.error) {
			callback('Unable to find location',undefined);
		} else {
			callback(undefined, body.current.weather_descriptions[0] +". It is currently " +body.current.temperature +" degrees out. It feels like " +body.current.feelslike +" degrees out.")
		}
	})
}

module.exports = forecast;