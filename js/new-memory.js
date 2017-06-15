$(document).ready(function() {

//   // FROM ION SOUND - init bunch of sounds
//   ion.sound({
//     //list of sounds files to load. Choose the mp3
//       sounds: [
//           {name: "button_click"}
//       ],
//       // path to folder where sounds are stored
//       path: "ion-sound/sounds/button_click.mp3",
//       //satrts loading sound files even before you use them
//       preload: true,
//       //multiple sounds at once
//       multiplay: true,
//       //90% volume
//       volume: 0.9,
// });

$('#trivia-popup').hide();
$('#incorrect-trivia-answer').hide();
$('#correct-trivia-answer').hide();
$('#woohoo-scores').hide();
$('#contact').hide();
$('#game-panel').hide();

var citiesTrivia = ['Tokyo','Osaka','Lima','Miami',
'Bali','Milan','Bogota','Munich','Bangkok','Los Angeles','Rio de Janeiro',
'Chicago','Hong Kong','Toronto','Sydney'];

var trivia3Options = [];

var cards = [
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

var points = 0;
$('#counter').html(points);

// This click lets the game start
$('#lets-play').click(function(){
  // ion.sound.play('button_click');
  $('#game-panel').show();

  var player1name = $('#player-1-name').val();
  var player2name = $('#player-2-name').val();

function sizeOfBoard (){
  if ($('#difficulty').val() === "medium"){
    for (i = 0; i < mediumCities.length ; i++) {
        cards.push(mediumCities[i]);
    }
    for (i = 0; i < mediumCities.length ; i++) {
      $('#the-grid').append('<div class="card unmatched"></div>');
    }
  } else
    if ($('#difficulty').val() === "difficult"){
    for (i = 0; i < difficultCities.length ; i++) {
        cards.push(difficultCities[i]);
    }
    for (i = 0; i < difficultCities.length ; i++) {
      $('#the-grid').append('<div class="card unmatched"></div>');
    }
    }
  }
sizeOfBoard();

    function shuffle(array) {
      var random = 0;
      var temp = 0;
      for (i = 1; i < array.length; i++) {
        random = Math.round(Math.random() * i);
        temp = array[i];
        array[i] = array[random];
        array[random] = temp;
      }
      assignCards();
      // console.log('Shuffled Card Array: ' + cards);
    }
shuffle(cards);

    function assignCards() {
      $('.card').each(function(index) {
        $(this).attr('data-card-value', cards[index].photo);
        $(this).attr('data-name', cards[index].name);
      });
      clickHandlers();
    }

    function clickHandlers() {
      $('.card').click(function() {
        $(this).html($(this).data('cardValue')).addClass('selected');
        checkMatch();
      });
    }

    function trivia(city) {
      var buttons = $('.trivia-button');
      console.log(buttons);

      trivia3Options.push(city);
      shuffle(citiesTrivia);
      trivia3Options.push(citiesTrivia[0]);
      trivia3Options.push(citiesTrivia[1]);
      shuffle(trivia3Options);
      $('#triviaButton1').html(trivia3Options[0]);
      $('#triviaButton2').html(trivia3Options[1]);
      $('#triviaButton3').html(trivia3Options[2]);
      $('#trivia-popup').show();

      for (i = 0; i < $('.trivia-button').length ; i++) {
        console.log($('.trivia-button').eq(i).text());
        if ($('.trivia-button').eq(i).text() === city){
          console.log("BOOM!");
          $('.trivia-button').eq(i).addClass('correctCity');
          }
        }
    }

    function checkTrivia (){
      if ($(this).hasClass('correctCity')) {
        $('#correct-trivia-answer').show();
        points +=25;
        $('#counter').html(points);
      } else {
        $('#incorrect-trivia-answer').show();
      }
      setTimeout (function (){
        $('#trivia-popup').hide();
        trivia3Options = [];
        $('#incorrect-trivia-answer').hide();
        $('#correct-trivia-answer').hide();
      }, 1600);
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
          $('.selected').each(function() {
            $(this).removeClass('selected');
          });
          checkWin();
        } else {
          setTimeout(function() {
            $('.selected').each(function() {
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
          // $('#woohoo-scores').ScrollTo();
        },500);
      }
      // if player's 1 points > than player 2,
      //  then print player1name, else print player 2
    }
// end lets play on-click function
});

// TODO: Tear down without refreshing the page
// $('#play-again').click()

// end doc ready function
});
