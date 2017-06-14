$(document).ready(function() {

  var cards = [
      '<img src="photos/cards/venice.jpg">',
      '<img src="photos/cards/venice.jpg">',
      '<img src="photos/cards/barcelona.jpg">',
      '<img src="photos/cards/barcelona.jpg">',
    ];

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
      console.log('Shuffled Card Array: ' + cards);
    }

shuffle();

    function assignCards() {
      $('.card').each(function(index) {
        $(this).attr('data-card-value', cards[index]);
      });
      clickHandlers();
    }

    function clickHandlers() {
      $('.card').on('click', function() {
        $(this).html($(this).data('cardValue')).addClass('selected');
        checkMatch();
      });
    }

    function checkMatch() {
      if ($('.selected').length === 2) {
        if ($('.selected').first().data('cardValue') == $('.selected').last().data('cardValue')) {
          $('.selected').each(function() {
            $(this).animate({
              opacity: 50
            }).removeClass('unmatched');
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
        $('section').html('<h1>You Won!</h1>');
      }
    }

});
