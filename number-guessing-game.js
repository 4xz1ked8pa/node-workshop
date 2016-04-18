// Create a file called number-guessing-game.js.
// In this file, re-write your number guessing game (from the basic javascript workshop) for the command line!
// Instead of using prompt and alert, you will have to use capabilities from NodeJS and any external module. HINT: there is an npm library called prompt that can help you with that :)
// Save/commit/push

var prompt = require('prompt');

function randBetween(a, b) {
 return Math.floor(Math.random() * (b - a + 1)) + a;
}
var counter = 0;
function promptNumber() {
  var randomNumber = randBetween(1,10)
  return prompt.get(['number'], function(err, result) {
    if (parseInt(result.number) === randomNumber) {
      console.log("You've guessed the right number: " + randomNumber);
      return;
    }
    else if(counter < 3) {
      if (randomNumber > parseInt(result.number)) {
        console.log("Try larger");
      }
      else if (randomNumber < parseInt(result.number)) {
        console.log("Try smaller");
      }
      counter++;
      promptNumber();
    }
  });
}

promptNumber();
