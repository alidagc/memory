
// TODO: Figure out double div/img added on round two of game
// TODO: Take all JS from everything from 1 file to 2
// TODO: going down from diffiult to medium size board

$(document).ready(function() {

// //   // FROM ION SOUND - init bunch of sounds
ion.sound({
    sounds: [
        {name: "bell_ring"},
        {name: "button_click"},
        {name: "water_droplet"},
        {name: "camera_flashing_2"},
        {name: "bell_ring"}
    ],
    // main config
    path: "ion.sound/sounds/",
    preload: true,
    multiplay: true,
    volume: 0.9
});

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
  ion.sound.play("button_click");
  var points = 0;
  $('#counter').html(points);
  $('#game-panel').show();

  var player1name = $('#player-1-name').val();

function addingCities (levelArray) {
  for (i = 0; i < levelArray.length ; i++) {
      cards.push(levelArray[i]);
      $('#the-grid').append('<div class="card unmatched"></div>');
    }
  }
function sizeOfBoard (){
  if ($('#difficulty').val() === "easy"){
      addingCities(easyCities);
  } else if ($('#difficulty').val() === "medium"){
      addingCities(easyCities);
      addingCities(mediumCities);
  } else if ($('#difficulty').val() === "difficult" && cards.length === 0){
      addingCities(easyCities);
      addingCities(mediumCities);
      addingCities(difficultCities);
  } else if ($('#difficulty').val() === "difficult" && cards.length > 8){
      addingCities(difficultCities);
  } else if ($('#difficulty').val() === "difficult" && cards.length < 8) {
      addingCities(mediumCities);
      addingCities(difficultCities);
  }
}

sizeOfBoard();

    function shuffle(array) {
      console.log('shuffle');
      var random = 0;
      var temp = 0;
      for (i = 1; i < array.length; i++) {
        random = Math.round(Math.random() * i);
        temp = array[i];
        array[i] = array[random];
        array[random] = temp;
      }
    }

// this sets up the initial game
shuffle(cards);
assignCards();
// ------------------------------

    function assignCards() {
      console.log('assign');
      $('.card').each(function(index) {
        $(this).attr('data-card-value', cards[index].photo);
        $(this).attr('data-name', cards[index].name);
      });
      // maybe this should be separate if cards are assigned multiple times
      clickHandlers();
    }

    function clickHandlers() {
      $('.card').click(function() {
        // ion.sound.play("water_droplet");
        $(this).html($(this).data('cardValue')).addClass('selected');
        checkMatch();
      });
    }

    function trivia(city) {
      var buttons = $('.trivia-button');
      trivia3Options.push(city);
      shuffle(citiesTrivia);
      trivia3Options.push(citiesTrivia[0]);
      trivia3Options.push(citiesTrivia[1]);
      shuffle(trivia3Options);
      $('#triviaButton1').html(trivia3Options[0]);
      $('#triviaButton2').html(trivia3Options[1]);
      $('#triviaButton3').html(trivia3Options[2]);
      ion.sound.play("camera_flashing_2");
      setTimeout (function () {
        $('#trivia-popup').show();
      },500);
      for (i = 0; i < $('.trivia-button').length ; i++) {
        if ($('.trivia-button').eq(i).text() === city){
          $('.trivia-button').eq(i).addClass('correctCity');
          }
        }
    }

    function checkTrivia (){
      if ($(this).hasClass('correctCity')) {
        $('#correct-trivia-answer').show();
        points +=25;
        $('#counter').html(points);
        ion.sound.play("bell_ring");
        $(this).removeClass('correctCity');
      } else {
        $('#incorrect-trivia-answer').show();
        $(this).removeClass('correctCity');
      }
      setTimeout (function (){
        $('#trivia-popup').hide();
        trivia3Options = [];
        $('#incorrect-trivia-answer').hide();
        $('#correct-trivia-answer').hide();
      }, 1400);
    }

    function checkMatch() {
      if ($('.selected').length === 2) {
        if ($('.selected').first().data('cardValue') === $('.selected').last().data('cardValue')) {
          points +=50;
          $('#counter').html(points);
          var matchedCity = $('.selected').first().data('name');
          trivia(matchedCity);
          $('.selected').each(function() {
            $(this).animate({
              opacity: 50
            })
            .removeClass('unmatched');
          });
          setTimeout(function() {
            $('.selected').each(function() {
              // alert("hi");
              $(this).removeClass('selected');
            });
          }, 800);
          checkWin();

        } else {
          setTimeout(function() {
            $('.selected').each(function() {
              // alert("hi");
              $(this).html('').removeClass('selected');
            });
          }, 800);
        }
      }
    }

$('.trivia-button').click(checkTrivia);

  function checkWin() {
      if ($('.unmatched').length === 0) {
        setTimeout(function (){
          $('#woohoo-scores').show();
          $('#winner').html(player1name);
          $('#scores-board-content').prepend('<tr><td>'+ points +'</td><td>'+ player1name +'</td></tr>');
          $('#contact').show();
          $('#game-panel').hide();
          cards = [];
          $('#the-grid').empty();
          points = 0;
          $('#counter').html('');
        },3500);
      }
    }

  $('#play-again').click(function(){
    $('#woohoo-scores').hide();
    $('#contact').hide();
    $('#trivia-popup').hide();
  });
// end lets-play click function
});

// end doc ready function
});
