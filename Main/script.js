var playerScore = 0;
var AIScore = 0;
var board;
var xFrom,yFrom;
var xTo,yTo;

//This function MAPS the board to JavaScript Code.
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

//This function updates the Score Board.
//Add +1 to the score after each game.
// 1 - Human
// 2 - Computer
function UpdateScoreBoard(winner) {
    switch (winner) {
        case 1:
            playerScore++;
            document.getElementById('playerScore').firstChild.data = playerScore;
            break;
        case 2:
            AIScore++;
            document.getElementById('AISscore').firstChild.data = AIScore;
        default:
            break;
    }
}

// This Function Updates the Score Board With the winner
// 1 - Human
// 2 - Computer
// 0 - Reset to "Score Board"
function GameFinish(winner) {
    switch (winner) {
        case 0:
            document.getElementById('ScoreTitle').firstChild.data = "Score Board";
        case 1:
            document.getElementById('ScoreTitle').firstChild.data = "You Win";
            break;
        case 2:
            document.getElementById('ScoreTitle').firstChild.data = "Computer Wins";
            break;
        default:
            break;
    }
}
//This function divides the coordinates of points
function moveXY(from,to){
    
    xFrom = parseInt(from) % 10;
    yFrom = Math.floor((parseInt(from)) / 10);
    xTo = parseInt(to) % 10;
    yTo = Math.floor((parseInt(to)) / 10);
    console.log(xFrom);
    console.log(yFrom);
    console.log(xTo);
    console.log(yTo);
}


function print() {

    for (var i = 0; i < 8; i++)
        for (var j = 0; j < 8; j++)
            console.log(board[i][j]);
}
function init() {
    $('img').draggable();
}

function allowDrop(ev) {
    ev.preventDefault();
}

function drag(ev) {
    ev.dataTransfer.setData("text", $(ev.target).parent().attr('id'));
}

//This function check if the move of Human is illegal
function humanMove(ev,TD_FROM,TD_TO){
    moveXY(TD_FROM,TD_TO);

    if((xFrom+1==xTo && yFrom-1==yTo) || (xFrom-1==xTo && yFrom-1==yTo))
    {

        $(ev.target).append($('#' + TD_FROM).find('img'));
        console.log("This where i am FROM " + TD_FROM);
        console.log("This where i am NOW " + TD_TO);
    }
}

function drop(ev) {
    ev.preventDefault();
    var TD_FROM = ev.dataTransfer.getData("text");
    var TD_TO = $(ev.target).attr('id');
    humanMove(ev,TD_FROM,TD_TO);
}

$(document).ready(function () {
    board = matrix(8, 8);
    print();
    init();
});
