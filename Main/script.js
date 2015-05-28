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
            if ((i % 2 == 0 && j % 2 != 0 && i < 3) || (i % 2 != 0 && j % 2 == 0 && i < 3)) {
                arr[i][j] = 1;
            } else
                if ((i % 2 == 0 && j % 2 != 0 && i > 4) || (i % 2 != 0 && j % 2 == 0 && i > 4)) {
                    arr[i][j] = 2;
                } else {
                    arr[i][j] = 0;
                }
        }
    }
    //Print
    for (var i = 0; i < rows; i++)
        for (var j = 0; j < cols; j++) {
            console.log("arr" + "[" + i + ']' + '[' + j + ']:' + arr[i][j]);
        }
    console.log("Board Print Finish");
    return arr;
}

//This function updates the Score Board.
//Add +1 to the score after each game.
// 2 - Human
// 1 - Computer
function UpdateScoreBoard(winner) {
    switch (winner) {
        case 1:
            AIScore++;
            document.getElementById('AISscore').firstChild.data = AIScore;
            break;
        case 2:
            playerScore++;
            document.getElementById('playerScore').firstChild.data = playerScore;
            break;
        default:
            break;
    }
}

// This Function Updates the Score Board With the winner
// 2 - Human
// 1 - Computer
// 0 - Reset to "Score Board"
function GameFinish(winner) {
    switch (winner) {
        case 0:
            document.getElementById('ScoreTitle').firstChild.data = "Score Board";
            break;
        case 1:
            document.getElementById('ScoreTitle').firstChild.data = "Computer Wins";
            break;
        case 2:
            document.getElementById('ScoreTitle').firstChild.data = "You Win";
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
}

//This function check if the move of Human is illegal
function humanMove() {

    if ((xFrom + 1 == xTo && yFrom - 1 == yTo) || (xFrom - 1 == xTo && yFrom - 1 == yTo)) {
        return true;
    }
    return false;
}

//this function Check if there is apeace on the Block.
function CheckIsPeaceThere() {

    if ((board[yTo][xTo] == 2) || (board[yTo][xTo] == 1)) {
        console.log("Block Taken");
        return false;
    }
    else {
        console.log("Block Free");
        return true;
    }
}

function eatCheck(num){

    if (num==1){
        for(var i=0;i<8;i++){
            for(var j=0;j<8;j++)
            {
                if(bord[i][j]-1==bord[i+1][j-1])
                    return true;
                if(bord[i][j]-1==bord[i-1][j-1])
                    return true;
            }
        }
    }else{
        for(var i=0;i<8;i++){
            for(var j=0;j<8;j++)
                {
                if(bord[i][j]+1==bord[i+1][j+1])
                    return true;
                if(bord[i][j]-1==bord[i-1][j+1])
                    return true;
                }
            }
      }
}


function eat(num){

    if (num==2){
         if ((xFrom + 2 == xTo && yFrom - 2 == yTo) || (xFrom - 2 == xTo && yFrom - 2 == yTo))
            return true;
    }
    else if(num==1){

        if ((xFrom + 2 == xTo && yFrom + 2 == yTo) || (xFrom - 2 == xTo && yFrom + 2 == yTo))
        return true;
    }
    return false;
}
//this function delete the pieace from board and HTML.
function deletePieace(x,y) {
    board[y][x] = 0;
    $('#' + y + x).find('img').attr('src') = undefined;
}

//This function Updates the Board with Taken Blocks.
function UpdateStatus(whoPlay) {
    board[yFrom][xFrom] = 0;
    board[yTo][xTo] = whoPlay;
    console.log("Status Updated");
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
    moveXY(TD_FROM, TD_TO);
    if (eatCheck(num)){
         if (eat(num)) {
        if (CheckIsPeaceThere()) {
            $(ev.target).append($('#' + TD_FROM).find('img'));
            UpdateStatus();
        }
        else
            console.log("Illigal Move: Block Taken");
    }
    else
        console.log("Illigal Move: Check Your Drop");
    }else
        if (humanMove()) {
            if (CheckIsPeaceThere()) {
                $(ev.target).append($('#' + TD_FROM).find('img'));
                UpdateStatus();
            }
            else
             console.log("Illigal Move: Block Taken");
        }
        else
            console.log("Illigal Move: Check Your Drop");
}

//this is the MAIN function.
$(document).ready(function () {
    board = matrix(8, 8);
    init();
});
