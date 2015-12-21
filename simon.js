var allowedElements = ["square", "cert", "circle", "tri"]; // these are the only items we want clicked on
var round = 1; //starts the game, round 1
var computerInput = []; // sequence of all computer-generated selections, one new random selection pushed here every round
var userInput = []; //sequence of all user-generated selections, each pushed into this array
$(document).ready(function() { //runs the function at startup
  $(".start").click(function(e) { //when the user clicks start, activates game and round 1
    reset(); //resets regardless of what you are doing
    var game = function(n) {
      var ci = generateSequence(n);
      animate(ci);
      var counter = 0;
      $(document).off().on('click', function(e) {
        var id = e.toElement.id;
        colorChange(id);
        if(allowedElements.indexOf(id) != -1) {
          userInput.push(id);
          if(userInput.length == ci.length || computerInput[counter] != id) {
            var result = checkInput(userInput, computerInput);
            if(result) {
              round++;
              console.log(round);
              window.setTimeout(function() {
                message("success");
                userInput = [];
                game(round);
              }, 300);
            } else {
              window.setTimeout(function() {
                  round = 1;
                  reset();
                  game(round);
              }, 300);              
            }
          }
          counter++;
        }
      });
    }    
    game(round);

    
  });
})

var animate = function(input) {
  var i = 0;
  var interval = setInterval(function() {
    colorChange(input[i]);
    i++;
    if(i == input.length) {
      clearInterval(interval);
    }
  }, 400);
}
var displayMessage = function(msg){
  document.querySelector(".message").innerHTML ="Begin! Round " + msg;
}
var message = function(type) {
  if(type="success") {
    displayMessage(round);
  } else {
    displayMessage(round);
  }
}
var reset = function() {
  round = 1;
  computerInput = [];
  userInput = [];
  displayMessage(round);
}
var checkInput = function(userInput, computerInput) {
  for( var i in userInput ) {
    if(userInput[i] != computerInput[i]) {
      return false;
    }
  }
  return true;
}

var generateSequence = function(n) {
  var index = Math.floor(Math.random() * ((allowedElements.length-1) - 0 + 1) + 0); //this was a hot mess; still not sure what happens here
  var id = allowedElements[index];
  computerInput.push(id);
  return computerInput;
}

var colorChange = function(id) {// using opacity to change the color here, played around and decided .2 to 1 would be best
	$("#"+id).css("opacity", "0.2");
	setTimeout(function(){
		$("#"+id).css("opacity", "1");
	},200);	
};