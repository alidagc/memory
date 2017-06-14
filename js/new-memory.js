$(document).ready(function() {

$('#trivia-popup').hide();
$('#woohoo-scores').hide();
$('#contact').hide();
$('#game-panel').hide();


// This click lets the game start
$('#lets-play').click(function(){

  var cards = [
      {name: 'Venice', photo:'<img src="photos/cards/venice.jpg">'},
      {name: 'Venice', photo:'<img src="photos/cards/venice.jpg">'},
      {name: 'Barcelona', photo:'<img src="photos/cards/barcelona.jpg">'},
      {name: 'Barcelona', photo:'<img src="photos/cards/barcelona.jpg">'},
      {name: 'Rome', photo:'<img src="photos/cards/rome.png">'},
      {name: 'Rome', photo:'<img src="photos/cards/rome.png">'},
    ];

  var mediumCities = [
      {name: 'Amsterdam', photo:'<img src="photos/cards/amsterdam.jpg">'},
      {name: 'Amsterdam', photo:'<img src="photos/cards/amsterdam.jpg">'},
      {name: 'Baltimore', photo:'<img src="photos/cards/baltimore.jpg">'},
      {name: 'Baltimore', photo:'<img src="photos/cards/baltimore.jpg">'}
    ];

  var difficultCities = [
      {name: '', photo:'<img src="photos/cards/.png">'},
      {name: '', photo:'<img src="photos/cards/.png">'}
    ];
  $('#game-panel').show();

  var player1name = $('#player-1-name').val();
  var player2name = $('#player-2-name').val();

var points = 0;
$('#counter').html(points);

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

console.log(cards);

    function shuffle() {
      var random = 0;
      var temp = 0;
      for (i = 1; i < cards.length; i++) {
        random = Math.round(Math.random() * i);
        temp = cards[i];
        cards[i] = cards[random];
        cards[random] = temp;
      }
      assignCards();
      // console.log('Shuffled Card Array: ' + cards);
    }
shuffle();

    function assignCards() {
      $('.card').each(function(index) {
        $(this).attr('data-card-value', cards[index].photo);
      });
      clickHandlers();
    }

    function clickHandlers() {
      $('.card').click(function() {
        $(this).html($(this).data('cardValue')).addClass('selected');
        checkMatch();
      });
    }

    // function trivia() {
    //   $('#xchoice1').html(this.card);
    // }

    function checkMatch() {
      if ($('.selected').length === 2) {
        if ($('.selected').first().data('cardValue') === $('.selected').last().data('cardValue')) {
          points +=50;
          $('#counter').html(points);
          // $('#trivia-popup').show();
          // TODO: need to put this back up when trivia works
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
          }, 1000);
        }
      }
    }

  function checkWin() {
      if ($('.unmatched').length === 0) {
        setTimeout(function (){
          $('#woohoo-scores').show();
          $('#winner').html(player1name);
          $('#scores-board-content').prepend('<tr><td>'+ points +'</td><td>'+ player1name +'</td></tr>');
          $('#contact').show();
          $('#game-panel').hide();
          // $('#woohoo-scores').ScrollTo();
          },1000);
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
