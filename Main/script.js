var playerScore = 0;
var AIScore = 0;
var board;


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
            if((i%2==0 && j%2!=0 && i<3) || (i%2!=0 && j%2==0 && i<3))
            {
            arr[i][j] = 1;
            }else 
                if((i%2==0 && j%2!=0 && i>4) || (i%2!=0 && j%2==0 && i>4))
                {
                    arr[i][j] = 2;
                }else
                    {
                        arr[i][j] = 0;
                    }
        } 
    }
    for(var i=0;i<rows;i++)
        for(var j=0;j<cols;j++)
        {
            console.log("arr"+"["+i+']'+'['+j+']:'+arr[i][j]);
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
function moveXY(from, to) {

    xFrom = parseInt(from) % 10;
    yFrom = Math.floor((parseInt(from)) / 10);
    xTo = parseInt(to) % 10;
    yTo = Math.floor((parseInt(to)) / 10);
    console.log("X-From: " + xFrom);
    console.log("Y-From: " + yFrom);
    console.log("X-To: " + xTo);
    console.log("Y-To " + yTo);
}

//This function check if the move of Human is illegal
function humanMove() {

    if ((xFrom + 1 == xTo && yFrom - 1 == yTo) || (xFrom - 1 == xTo && yFrom - 1 == yTo)) {
        return true;
    } 
    return false;
}

function CheckIsPeaceThere() {

    if (board[xTo][yTo] == 2) {
        console.log("has Image");
        return false;
    }
    else {
        console.log("Its Empty Image");
        return true;
    }
}

//This function Updates the Board with Taken Blocks.
function UpdateStatus() {
    board[xFrom][yFrom] = 0;
    board[xTo][yTo] = 2;
    console.log("Status Updated");
}

//This function print all the object in the board.
function print() {

    for (var i = 0; i < 8; i++)
        for (var j = 0; j < 8; j++)
            console.log(board[i][j]);
    console, log("Print Finish");
}

//this function makes all the pieces draggeble.
function init() {
    $('img').draggable();
}

//this function allows to drop in the cell
function allowDrop(ev) {
    ev.preventDefault();

}

//this function makes the dtag start and take the img with it.
function drag(ev) {
    ev.dataTransfer.setData("text", $(ev.target).parent().attr('id'));
}

//this function make the drop in the new cell.
function drop(ev) {
    ev.preventDefault();
    var TD_FROM = ev.dataTransfer.getData("text");
    var TD_TO = $(ev.target).attr('id');
<<<<<<< HEAD
    moveXY(TD_FROM, TD_TO);
    if (humanMove()) {
        if (CheckIsPeaceThere()) {
            $(ev.target).append($('#' + TD_FROM).find('img'));
            UpdateStatus();
        }
        else
            console.log("Illigal Move Block Taken");
    }
    else
        console.log("Illigal Move Check Your Drop");
=======

    //if(humanMove(ev,TD_FROM,TD_TO))
    //{
       //if (CheckIsPeaceThere(TD_TO)) {
       //    $(ev.target).append($('#' + TD_FROM).find('img'));
       //    console.log("This where i am FROM " + TD_FROM);
       //   console.log("This where i am NOW " + TD_TO);
       //}
        //console.log("Illigal Move Check Your Drop")
  //}
>>>>>>> origin/master
}

//this is the MAIN function.
$(document).ready(function () {
    board = matrix(8, 8);
    print();
    init();
});
