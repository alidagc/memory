$(document).ready(function() {

$('#trivia-popup').hide();
$('#incorrect-trivia-answer').hide();
$('#correct-trivia-answer').hide();
$('#woohoo-scores').hide();
$('#contact').hide();
$('#game-panel').hide();

var cards = [];

var easyCities = [
    {name: 'Venice', photo:'<img src="photos/cards/venice.jpg">'},
    {name: 'Venice', photo:'<img src="photos/cards/venice.jpg">'},
    {name: 'Barcelona', photo:'<img src="photos/cards/barcelona.jpeg">'},
    {name: 'Barcelona', photo:'<img src="photos/cards/barcelona.jpeg">'},
    {name: 'Rome', photo:'<img src="photos/cards/rome.png">'},
    {name: 'Rome', photo:'<img src="photos/cards/rome.png">'},
  ];

var mediumCities = [
    {name: 'Amsterdam', photo:'<img src="photos/cards/amsterdam.jpg">'},
    {name: 'Amsterdam', photo:'<img src="photos/cards/amsterdam.jpg">'},
    {name: 'Dubrovnik', photo:'<img src="photos/cards/dubrovnik.png">'},
    {name: 'Dubrovnik', photo:'<img src="photos/cards/dubrovnik.png">'},
    {name: 'New Orleans', photo:'<img src="photos/cards/nola.jpg">'},
    {name: 'New Orleans', photo:'<img src="photos/cards/nola.jpg">'}
  ];

var difficultCities = [
    {name: 'New York', photo:'<img src="photos/cards/new-york.jpg">'},
    {name: 'New York', photo:'<img src="photos/cards/new-york.jpg">'},
    {name: 'Positano', photo:'<img src="photos/cards/positano.png">'},
    {name: 'Positano', photo:'<img src="photos/cards/positano.png">'},
    {name: 'San Sebastian', photo:'<img src="photos/cards/san-sebastian.jpg">'},
    {name: 'San Sebastian', photo:'<img src="photos/cards/san-sebastian.jpg">'}
  ];

var citiesTrivia = ['Tokyo','Osaka','Lima','Miami',
'Bali','Milan','Bogota','Munich','Bangkok','Los Angeles','Rio de Janeiro',
'Chicago','Hong Kong','Toronto','Sydney'];

var trivia3Options = [];

// This click lets the game start
$('#lets-play').click(function(){
  // ion.sound.play('button_click');
  var points = 0;
  $('#counter').html(points);
  $('#game-panel').show();

  var player1name = $('#player-1-name').val();

sizeOfBoard();

// this sets up the initial game
shuffle(cards);
assignCards();
// clickHandlers();
// end lets-play click function
});

$('.trivia-button').click(checkTrivia);

$('#play-again').click(function(){
    $('#woohoo-scores').hide();
    $('#contact').hide();
    $('#trivia-popup').hide();
  });

// end doc ready function
});
