  // Creating the tiles
  var Tile = function(x, y) {
      this.x = x;
      this.y = y;
      this.width = 80;
  };

  Tile.prototype.drawFaceDown = function() {
      // console.log('hello');
      $(this).addClass('.card');
      // $(".card").css("height", "80px");
      // $(".card").css("background-color", "purple");
      // //  document.body.style.image = "url('photos/card-back.png')";
      // fill(214, 247, 202);
      // strokeWeight(2);
      // rect(this.x, this.y, this.width, this.width, 10);
      // image(getImage("photos/card-back.png"), this.x, this.y, this.width, this.width);
  };

  // Creating the array of tiles at appropriate positions
  var tiles = [];
  var NUM_COLS = 3;
  var NUM_ROWS = 2;
  for (var i = 0; i < NUM_COLS; i++) {
      for (var j = 0; j < NUM_ROWS; j++) {
          tiles.push(new Tile(i * 88, j * 88));
      }
  }

  // Drawing them all down
  for (i = 0; i < tiles.length; i++) {
      tiles[i].drawFaceDown();
  }







// var board = [
//   ['',''],
//   ['','']
// ];

// var cardsPicked = '';
//
// $('.card').click(function(){
//     var classes = this.className.split(' ');
//     // console.log(classes);
//     var cityClass = classes[1];
//
//   if (cardsPicked === '') {
//       cardsPicked = cityClass;
//     } else {
//       if (cardsPicked === cityClass) {
//           alert('matched!');
//       } else {
//           alert ('sorry try again');
//       }
//       cardsPicked = '';
//     }
// });
