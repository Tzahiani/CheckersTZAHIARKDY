
var playerScore = 0;
var AIScore = 0;
var whiteEat = 0;
var blackEat = 0;
turn = 0;
var board;

function matrix(rows, cols) {

    var arr = [];

    // Creates all lines:
    for (var i = 0; i < rows; i++) {

        // Creates an empty line
        arr.push([]);

        // Adds cols to the empty line:
        arr[i].push(new Array(cols));

        for (var j = 0; j < cols; j++) {
            // Initializes:
            arr[i][j] = $('#' + i + j);
        }
    }

    return arr;
}
function DragAndDropByLocation(){

  $('img').draggable({

    // Find original position of dragged image.
    start: function(event, ui) {

      // Show start dragged position of image.
      var Startpos = $(this).position();
      console.log("START: \nLeft: "+ parseInt(Startpos.left) + "\nTop: " + parseInt(Startpos.top));
    },

    // Find position where image is dropped.
    stop: function(event, ui) {

      // Show dropped position.
      var Stoppos = $(this).position();
      console.log("STOP: \nLeft: "+ parseInt(Stoppos.left) + "\nTop: " + parseInt(Stoppos.top));
    }
  });
}

function UpdateScoreBoard(winner) {
    switch (winner) {
        case 1:
            x = Document.getElementById("playerScore");
            x.innerHTML = playerScore++;
            break;
        case 2:
            x = Document.getElementById("AIScore");
            x.innerHTML = AIScore++;
        default:
            break;
    }
}
function print() {

    for (var i = 0; i < 8; i++)
        for (var j = 0; j < 8; j++)
            console.log(board[i][j]);
}
function init() {
    DragAndDropByLocation();
}

function CheckIfOk() {
    console.log("If you see this then i try to drag some thing.");
}

$(document).ready(function () {

    board = matrix(8, 8);
    print();
    init();

});