var playerScore = 0; // Player score for update
var AIScore = 0; // AI score for update
var board; // holds all the board status
var xFrom, yFrom; // gets the cords for the old block
var xTo, yTo; // gets the cords for the new block
var way; // gets the way of the move (right = 2 / left = 1)
var AIXfrom, AIYfrom;
var AIXto, AIYto;

//This Function MAPS the board to JavaScript Code.
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

//This Function updates the Score Board.
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

//This Function divides the coordinates of points
function moveXY(from, to) {

    xFrom = parseInt(from) % 10;
    yFrom = Math.floor((parseInt(from)) / 10);
    xTo = parseInt(to) % 10;
    yTo = Math.floor((parseInt(to)) / 10);
}

//This Function check if the move of Human is illegal
function humanMove() {
    if (xFrom + 1 == xTo && yFrom - 1 == yTo) {

        if (CheckIsPeaceThere()) {
            way = 2;
            return true;
        }
    }

    if (xFrom - 1 == xTo && yFrom - 1 == yTo) {

        if (CheckIsPeaceThere()) {
            way = 1;
            return true;
        }
    }
    return false;
}

//This Function Check if there is apeace on the Block.
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

//This Function make only eat possible.
function MustEat() {
    for (var i = 7; i > 0; i--) {
        for (var j = 7; j > 0; j--) {
            if (board[i][j] - 1 == board[i - 1][j - 1] || board[i][j] - 1 == board[i - 1][j + 1]) {
                if (board[i - 1][j - 1] == 1 && board[i - 2][j - 2] == 0) {
                    console.log("Must Eat Left Side");
                    return true;
                }
                else if (board[i - 1][j + 1] == 1 && board[i - 2][j + 2] == 0) {
                    console.log("Must Eat Right Side");
                    return true;
                }
            }
        }
    }
    return false;
}

//This Function Check for AI if eat is possible
function AICheckEatFirst() {
    for (var i = 0; i < 8; i++) {
        for (var j = 0; j < 8; j++) {
            if (board[i][j] == board[i + 1][j - 1] + 1 || board[i][j] == board[i + 1][j + 1] + 1) {
                if (board[i + 1][j - 1] == 2 && board[i + 2][j - 2] == 0) {
                    console.log("AI Must Eat Left Side");
                    way = 1;
                    AIXfrom = i;
                    AIYfrom = j;
                    AIXto = i + 2;
                    AIYto = j - 2;
                    return true;
                }
                else if (board[i + 1][j + 1] == 2 && board[i + 2][j + 2] == 0) {
                    console.log("AI Must Eat Right Side");
                    way = 2;
                    AIXfrom = i;
                    AIYfrom = j;
                    AIXto = i + 2;
                    AIYto = j + 2;
                    return true;
                }
            }
        }
    }
    return false;
}
//This Function checks if you can eat one more peace before the computers turn
function eatAgain() {
    if (board[yTo - 1][xTo - 1] == 1) {
        if (board[yTo - 2][xTo - 2] == 0) {
            console.log("One More Eat Left Side");
            return true;
        }
    }
    else if (board[yTo - 1][xTo + 1] == 1) {
        if (board[yTo - 2][xTo + 2] == 0) {
            console.log("One More Eat Right Side");
            return true;
        }
    }
    return false;
}

//This Function checks if the eat move is ok.
function eatMove() {

    if (board[yFrom - 1][xFrom - 1] == 1) {
        way = 1;
        if (eat()) {
            return true;
        }
    }
    else if (board[yFrom - 1][xFrom + 1] == 1) {
        way = 2;
        if (eat()) {
            return true;
        }
    }
    return false;
}

//This Function check if the move to cords is OK.
function eat() {
    if ((xFrom - 2 == xTo && yFrom - 2 == yTo) && way == 1 && CheckIsPeaceThere())
        return true;
    else if ((xFrom + 2 == xTo && yFrom - 2 == yTo) && way == 2 && CheckIsPeaceThere())
        return true;
    else
        return false;
}

//This Function delete the pieace from board.
function deletePieace() {
    switch (way) {
        case 1:
            board[yFrom - 1][xFrom - 1] = 0;
            $('#' + (yFrom - 1) + (xFrom - 1)).find('img').remove();
            console.log("Piace Deleted");
            break;
        case 2:
            board[yFrom - 1][xFrom + 1] = 0;
            $('#' + (yFrom - 1) + (xFrom + 1)).find('img').remove();
            console.log("Piace Deleted");
            break;
        default:
            break;
    }
}

//This Function Updates the Board with Taken Blocks.
function UpdateStatus(whoPlay) {
    board[yFrom][xFrom] = 0;
    board[yTo][xTo] = whoPlay;
    console.log("Status Updated");
}

//This Function makes all the pieces draggeble.
function init() {
    $('img').draggable();
}

//This Function allows to drop in the cell
function allowDrop(ev) {
    ev.preventDefault();

}

//This Function makes the dtag start and take the img with it.
function drag(ev) {
    ev.dataTransfer.setData("text", $(ev.target).parent().attr('id'));
}

//This Function make the drop in the new cell.
function drop(ev) {
    ev.preventDefault();
    var TD_FROM = ev.dataTransfer.getData("text");
    var TD_TO = $(ev.target).attr('id');
    moveXY(TD_FROM, TD_TO);

    if (eatMove()) {
        $(ev.target).append($('#' + TD_FROM).find('img'));
        deletePieace();
        UpdateStatus(2);
        if (!eatAgain()) {
            AI_turn_start();
        }
    }
    else if (humanMove() && !MustEat()) {
        $(ev.target).append($('#' + TD_FROM).find('img'));
        UpdateStatus(2);
        AI_turn_start();
    }
    else
        console.log("Illegal Move");
}

//This Function Starts the AI move.
function AI_turn_start() {

    console.log("AI-play");

    while (AICheckEatFirst()) {
        console.log("AI-Eat");
        AI_Eat_Move();
    }
}


//This Function Delete and update the board after AI eat move
function AI_Eat_Move() {

    switch (way) {

        case 1: {
            $('#' + AIXfrom + AIYfrom).find('img').remove();
            $('#' + (AIXfrom + 1) + (AIYfrom - 1)).find('img').remove();
            $('#' + AIXto + AIYto).append('<img ondragstart="drag(event)" data-player="1" src="res/1.png" />')
            board[AIXfrom][AIYfrom] = 0;
            board[AIXfrom + 1][AIYfrom - 1] = 0;
            board[AIXto][AIYto] = 1;
            console.log("Status Updated + AI-eat-Done(Left)");
            break;
        }
        case 2: {
            $('#' + AIXfrom + AIYfrom).find('img').remove();
            $('#' + (AIXfrom + 1) + (AIYfrom + 1)).find('img').remove();
            $('#' + AIXto + AIYto).append('<img ondragstart="drag(event)" data-player="1" src="res/1.png" />')
            board[AIXfrom][AIYfrom] = 0;
            board[AIXfrom + 1][AIYfrom + 1] = 0;
            board[AIXto][AIYto] = 1;
            console.log("Status Updated + AI-eat-Done(Right)");
            break;
        }
        default:
            break;
    }
}

function AI_Move() {

    $('#' + AIXfrom + AIYfrom).find('img').remove();
    $('#' + AIXto + AIYto).append('<img ondragstart="drag(event)" data-player="1" src="res/1.png" />')
    board[AIXfrom][AIYfrom] = 0;
    board[AIXto][AIYto] = 1;
    console.log("Status Updated + AI-Move-Done");

}

//This is the MAIN function.
$(document).ready(function () {
    board = matrix(8, 8);
    init();
    board[4][3] = 1;
});