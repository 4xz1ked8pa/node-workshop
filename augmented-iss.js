// Create a file called iss-augmented.js. It will be similar to iss.js but more difficult!
// Augment your ISS application to tell the user how "far" the ISS is from them. Here is how you will do it:
// Using the prompt module, ask the user to enter their location (e.g. "montreal")
//
// Using Google's Geolocation API, find out the latitude and longitude of the provided location. Here is how:
//    - This URL: https://maps.googleapis.com/maps/api/geocode/json?address=montreal will show the lat/long for montreal
//    - Explore this URL in your web browser to figure out where the lat/lng is located. Try to pass different values for "address" for educational purposes :)
//
// When you are comfortable with finding the location based on an input address, you can then calculate the distance between the ISS and the user:
//    - Look at this URL: http://www.movable-type.co.uk/scripts/latlong.html
//    - It specifies a formula for calculating the distance. Scroll the page to the JavaScript portion, and create a function that uses the provided code. You don't need to understand what is going on in there, it is very mathy!
//    - In order for this code to work, you'll need to add the following code at the beginning of your program:

var request = require('request');
var prompt = require('prompt');

Number.prototype.toRadians = function() {
  return this * Math.PI / 180;
}
function distanceBetweenTwoPoints(lat1, lon1, lat2, lon2) {
  var R = 6371000; // metres
  var φ1 = parseInt(lat1).toRadians();
  var φ2 = parseInt(lat2).toRadians();
  var Δφ = (parseInt(lat2)-parseInt(lat1)).toRadians();
  var Δλ = (parseInt(lon2)-parseInt(lon1)).toRadians();

  var a = Math.sin(Δφ/2) * Math.sin(Δφ/2) +
          Math.cos(φ1) * Math.cos(φ2) *
          Math.sin(Δλ/2) * Math.sin(Δλ/2);
  var c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a));

  var d = R * c;
  return d;
}
// city, city coordinates, space coordinates
function distanceFromSpaceStation() {
  prompt.start();
  prompt.get(['city'],function(err, result) {
    var requestAddress = 'https://maps.googleapis.com/maps/api/geocode/json?address=' + result.city;
    request(requestAddress, function(err, result) {
      var resultObject = JSON.parse(result.body);
      lat1 = resultObject.results[0].geometry.location.lat;
      lon1 = resultObject.results[0].geometry.location.lng;
      console.log(lat1);
      console.log(lon1);
      var issAddress = 'http://api.open-notify.org/iss-now.json';
      request(issAddress, function(err, result) {
        var resultObject = JSON.parse(result.body);
        lat2 = resultObject.iss_position.latitude.toFixed(2);
        lon2 = resultObject.iss_position.longitude.toFixed(2);
        console.log(distanceBetweenTwoPoints(lat1, lon1, lat2, lon2));
      });
    });
  });
}

distanceFromSpaceStation();
