var playerScore = 0; // Player score for update
var AIScore = 0; // AI score for update
var board; // holds all the board status
var xFrom, yFrom; // gets the cords for the old block
var xTo, yTo; // gets the cords for the new block
var way; // gets the way of the move (right = 2 / left = 1)
var AIXfrom, AIYfrom; // gets the cords for the old block for AI
var AIXto, AIYto; // gets the cords for the new block for AI
var TD_FROM;
var TD_TO;

//This Function MAPS the board to JavaScript Code.
// 2 - Human
// 1 - Computer
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

// This Function Updates the Score Board With the winner.
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

//This Function divides the coordinates of points.
function moveXY(from, to) {

    yFrom = parseInt(from) % 10;
    xFrom = Math.floor((parseInt(from)) / 10);
    yTo = parseInt(to) % 10;
    xTo = Math.floor((parseInt(to)) / 10);
}

//This Function check if the move of Human is illegal.
function humanMove() {
    if (TD_FROM > 07) {
        if (xFrom - 1 == xTo && yFrom + 1 == yTo) {

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
}

//This Function Check if there is piece on the Block.
function CheckIsPeaceThere() {
    if (TD_FROM > 07) {
        if ((board[xTo][yTo] == 2) || (board[xTo][yTo] == 1)) {
            console.log("Block Taken");
            return false;
        }
        else {
            console.log("Block Free");
            return true;
        }
    }
}

//This Function make only eat possible.
function MustEat() {
    for (var i = 7; i > 1; i--) {
        for (var j = 7; j >= 0; j--) {
            if (board[i][j] == 2) {
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
    }
    return false;
}

//This Function Check for AI if eat is possible.
function AICheckEatFirst() {
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 8; j++) {
            if (board[i][j] == 1) {
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

//This Function checks the move for AI.
function AISimpleMove() {
    for (var i = 0; i < 7; i++) {
        for (var j = 0; j < 8; j++) {
            if (board[i][j] == 1) {
                if (board[i][j] == board[i + 1][j - 1] + 1 || board[i][j] == board[i + 1][j + 1] + 1) {
                    if (board[i + 1][j - 1] == 0 && i <= 5 && board[i + 2][j - 2] == 0) {
                        way = 1;
                        AIXfrom = i;
                        AIYfrom = j;
                        AIXto = i + 1;
                        AIYto = j - 1;
                        return true;
                    } else if (board[i + 1][j + 1] == 0 && i <= 5 && board[i + 2][j + 2] == 0) {
                        way = 2;
                        AIXfrom = i;
                        AIYfrom = j;
                        AIXto = i + 1;
                        AIYto = j + 1;
                        return true;
                    } else if (board[i + 1][j - 1] == 0) {
                        way = 1;
                        AIXfrom = i;
                        AIYfrom = j;
                        AIXto = i + 1;
                        AIYto = j - 1;
                        return true;
                    } else if (board[i + 1][j + 1] == 0) {
                        way = 2;
                        AIXfrom = i;
                        AIYfrom = j;
                        AIXto = i + 1;
                        AIYto = j + 1;
                        return true;
                    } else
                        return false;
                }
            }
        }

    }
}

//This Function checks if you can eat one more peace before the computers turn.
function eatAgain() {
    if (TD_FROM > 37) {
        if (board[xTo - 1][yTo - 1] == 1) {
            if (board[xTo - 2][yTo - 2] == 0) {
                console.log("One More Eat Left Side");
                return true;
            }
        }
        else if (board[xTo - 1][yTo + 1] == 1) {
            if (board[xTo - 2][yTo + 2] == 0) {
                console.log("One More Eat Right Side");
                return true;
            }
        }
        return false;
    }
}

//This Function checks if the eat move is OK.
function eatMove() {
    if (TD_FROM > 17) {
        if (board[xFrom - 1][yFrom - 1] == 1) {
            way = 1;
            if (eat()) {
                return true;
            }
        }
        if (board[xFrom - 1][yFrom + 1] == 1) {
            way = 2;
            if (eat()) {
                return true;
            }
        }
        return false;
    }
}

//This Function check if the move to cords is OK.
function eat() {
    if (TD_FROM > 17) {
        if ((xFrom - 2 == xTo && yFrom - 2 == yTo) && way == 1 && CheckIsPeaceThere())
            return true;
        else if ((xFrom - 2 == xTo && yFrom + 2 == yTo) && way == 2 && CheckIsPeaceThere())
            return true;
        else
            return false;
    }
}

//This Function delete the piece from board.
function deletePieace() {
    switch (way) {
        case 1:
            board[xFrom - 1][yFrom - 1] = 0;
            $('#' + (xFrom - 1) + (yFrom - 1)).find('img').remove();
            console.log("Piace Deleted");
            break;
        case 2:
            board[xFrom - 1][yFrom + 1] = 0;
            $('#' + (xFrom - 1) + (yFrom + 1)).find('img').remove();
            console.log("Piace Deleted");
            break;
        default:
            break;
    }
}

//This Function Updates the Board with Taken Blocks.
function UpdateStatus(whoPlay) {
    board[xFrom][yFrom] = 0;
    board[xTo][yTo] = whoPlay;
    console.log("Status Updated");
}

//This Function makes all the pieces draggable.
function init() {
    $('img').draggable();
}

//This Function allows to drop in the cell.
function allowDrop(ev) {
    ev.preventDefault();

}

//This Function makes the drag start and take the IMG with it.
function drag(ev) {
    ev.dataTransfer.setData("text", $(ev.target).parent().attr('id'));
}

//This Function make the drop in the new cell.
function drop(ev) {
    ev.preventDefault();
    TD_FROM = ev.dataTransfer.getData("text");
    TD_TO = $(ev.target).attr('id');
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
    var flag = true;

    if (AICheckEatFirst()) {
        console.log("AI-Eat");
        AI_Eat_Move();
        flag = false;
        while (AI_eat_again()) {
            console.log("AI-Eat-Again");
            AI_Eat_Move();
        }
    }
    if (flag) {
        console.log("AI-MOVE");
        AISimpleMove();
        AI_Move();
    }
}

function AI_eat_again() {
    if (AIXto < 6 && board[AIXto + 1][AIYto - 1] == 2 && board[AIXto + 2][AIYto - 2] == 0) {
        way = 1;
        AIXfrom = AIXto;
        AIYfrom = AIYto;
        AIXto = AIXto + 2;
        AIYto = AIYto - 2;
        return true;
    }

    if (AIXto < 6 && board[AIXto + 1][AIYto + 1] == 2 && board[AIXto + 2][AIYto + 2] == 0) {
        way = 2;
        AIXfrom = AIXto;
        AIYfrom = AIYto;
        AIXto = AIXto + 2;
        AIYto = AIYto + 2;
        return true;
    }

    return false;
}

//This Function Delete and update the board after AI eat move.
function AI_Eat_Move() {

    switch (way) {

        case 1: {
            $('#' + AIXfrom + AIYfrom).find('img').remove();
            $('#' + (AIXfrom + 1) + (AIYfrom - 1)).find('img').remove();
            $('#' + AIXto + AIYto).append('<img ondragstart="drag(event)" data-player="1" src="res/1.png" />')
            board[AIXfrom][AIYfrom] = 0;
            console.log("FROM" + "[" + AIXfrom + ']' + '[' + AIYfrom + ']:' + board[AIXfrom][AIYfrom]);
            board[AIXfrom + 1][AIYfrom - 1] = 0;
            console.log("Delete" + "[" + (AIXfrom + 1) + ']' + '[' + (AIYfrom - 1) + ']:' + board[AIXfrom + 1][AIYfrom - 1]);
            board[AIXto][AIYto] = 1;
            console.log("TO" + "[" + AIXto + ']' + '[' + AIYto + ']:' + board[AIXto][AIYto]);
            console.log("Status Updated + AI-eat-Done(Left)");
            break;
        }
        case 2: {
            $('#' + AIXfrom + AIYfrom).find('img').remove();
            $('#' + (AIXfrom + 1) + (AIYfrom + 1)).find('img').remove();
            $('#' + AIXto + AIYto).append('<img ondragstart="drag(event)" data-player="1" src="res/1.png" />')
            board[AIXfrom][AIYfrom] = 0;
            console.log("FROM" + "[" + AIXfrom + ']' + '[' + AIYfrom + ']:' + board[AIXfrom][AIYfrom]);
            board[AIXfrom + 1][AIYfrom + 1] = 0;
            console.log("Delete" + "[" + (AIXfrom + 1) + ']' + '[' + (AIYfrom + 1) + ']:' + board[AIXfrom + 1][AIYfrom - 1]);
            board[AIXto][AIYto] = 1;
            console.log("TO" + "[" + AIXto + ']' + '[' + AIYto + ']:' + board[AIXto][AIYto]);
            console.log("Status Updated + AI-eat-Done(Right)");
            break;
        }
        default:
            break;
    }
}

//This Function makes the move and update.
function AI_Move() {

    $('#' + AIXfrom + AIYfrom).find('img').remove();
    $('#' + AIXto + AIYto).append('<img ondragstart="drag(event)" data-player="1" src="res/1.png" />')
    board[AIXfrom][AIYfrom] = 0;
    console.log("FROM" + "[" + AIXfrom + ']' + '[' + AIYfrom + ']:' + board[AIXfrom][AIYfrom]);
    board[AIXto][AIYto] = 1;
    console.log("TO" + "[" + AIXto + ']' + '[' + AIYto + ']:' + board[AIXto][AIYto]);
    console.log("Status Updated + AI-Move-Done");

}

//This is the MAIN function.
$(document).ready(function () {
    board = matrix(8, 8);
    init();
});