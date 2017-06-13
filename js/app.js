// FROM ION SOUND - init bunch of sounds
ion.sound({
  //list of sounds files to load. Choose the mp3
    sounds: [
        {name: "beer_can_opening"},
        {name: "button_click"}
    ],
    // path to folder where sounds are stored
    path: "../ion-sound/sounds/",
    //satrts loading sound files even before you use them
    preload: true,
    //multiple sounds at once
    multiplay: true,
    //90% volume
    volume: 0.9
});

$(document).ready(function (){
  $('#lets-play').click(function () {
      ion.sound.play('button_click');
  });
});

// --------
// Universal variables
var possibleCities = ['venice', 'barcelona', 'barcelona','venice','rome', 'rome'];
var board = [
  ['','',''],
  ['','','']
];
var contents = '';
var cell = '';


$(document).ready(function (){

// Function to shuffle all possible cards:
function shuffle(array) {
  var m = array.length, t, i;
  // While there remain elements to shuffle…
  while (m) {
    // Pick a remaining element…
    i = Math.floor(Math.random() * m--);
    // And swap it with the current element.
    t = array[m];
    array[m] = array[i];
    array[i] = t;
  }
  return array;
}

shuffle(possibleCities);

function populateBoard () {

  for (row = 0; row < board.length; row++) {
      for (col = 0; col < board[row].length; col++) {
        if (row === 0){
          // <!--TODO: ^^ this needs to be scaled to when you have more rows -->
          city = col;
        } else {
          city = col + board[row].length;
        }
            cell = board[row][col];
            cell = possibleCities[city];

          if (cell === 'venice') {
          contents = '<div class="card"><img src="photos/cards/venice.jpg"></div>';
          }
          else if (cell === 'barcelona') {
          contents = '<div class="card"><img src="photos/cards/barcelona.jpg"></div>';
          }
          else if (cell === 'rome') {
          contents = '<div class="card"><img src="photos/cards/rome.png"></div>';
          }

        $('#MofM').remove();
        // <!--TODO: ^^ this needs to be deleted. It's only for testing purposed -->
        $('#the-grid').append(contents);
        }
      }
}
populateBoard();

// Function to know if cards matched within a turn
function matchingCards () {
  var lastClicked = '';

  if (lastClicked === 0) {
    lastClicked += cell;
  } else {
    if (lastClicked === cell) {
        alert('matched!');
    } else {
        alert ('sorry try again');
    }
  }
}

$('.card').click(matchingCards());

});
// ^^^ end document ready function

// function City (cityName, cityImage) {
//   this.name = cityName;
//   this.image = cityImage;
// }
//
// var venice = new City ('Venice','photos/cards/venice.jpg');
// var barcelona = new City ('Barcelona', 'photos/cards/barcelona.jpg');
// var rome = new City ('Rome', 'photos/cards/rome.png');
