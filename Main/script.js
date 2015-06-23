//All The Variables:
var playerScore = 0; // Player score for update
var AIScore = 0; // AI score for update
var board; // holds all the board status
var xFrom, yFrom; // gets the cords for the old block
var xTo, yTo; // gets the cords for the new block
var way; // gets the way of the move (right = 2 / left = 1)
var AIXfrom, AIYfrom; // gets the cords for the old block for AI
var AIXto, AIYto; // gets the cords for the new block for AI
var TD_FROM; // gets the block from the player move
var TD_TO; // gets the block to the player move
var AICounter = 0; // Holds the AI eat Counter
var PlayerCounter = 0; // Holds the Player Counter
var EndGame = true // Check If Game Ended

//******************
//* Empty = 0      *
//* Human = 1      *
//* AI = 2         *
//* King AI = 3    *
//* King Human = 4 *
//******************

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
    return arr;
}

//This Function updates the Score Board.
//Add +1 to the score after each game.
// 2 - Human
// 1 - Computer
function UpdateScoreBoard(winner) {
    console.log("Score Board Updated");
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

//This function makes the reset button hidden\visible.
(function ($) {
    $.fn.invisible = function () {
        return this.each(function () {
            $(this).css("visibility", "hidden");
        });
    };

    //This function makes the reset button visible
    $.fn.visible = function () {
        return this.each(function () {
            $(this).css("visibility", "visible");
        });
    };
}(jQuery));

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
            EndGame = false;
            $('#reset').visible();
            console.log("Game Finish");
            alert('Game Finish');
            break;
        case 2:
            document.getElementById('ScoreTitle').firstChild.data = "You Win";
            EndGame = false;
            $('#reset').visible();
            console.log("Game Finish");
            alert('Game Finish');
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
    if (board[xFrom][yFrom] == 2) {
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
    if (board[xFrom][yFrom] == 4) {
        if (TD_FROM < 70) {
            if (xFrom + 1 == xTo && yFrom + 1 == yTo) {
                if (CheckIsPeaceThere()) {
                    way = 2;
                    return true;
                }
            }

            if (xFrom + 1 == xTo && yFrom - 1 == yTo) {
                if (CheckIsPeaceThere()) {
                    way = 1;
                    return true;
                }
            }
        }
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

        }
        return false;
    }
}

//This Function Check if there is piece on the Block.
function CheckIsPeaceThere() {
    if (board[xTo][yTo] != 0) {
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
    for (var i = 7; i > 1; i--) {
        for (var j = 7; j >= 0; j--) {
            if (board[i][j] == 2 || board[i][j] == 4) {
                if ((board[i - 1][j - 1] == 1 || board[i - 1][j - 1] == 3) && board[i - 2][j - 2] == 0) {
                    console.log("Must Eat Left Side");
                    alert('Must Eat Left Side');
                    return true;
                }
                else if ((board[i - 1][j + 1] == 1 || board[i - 1][j + 1] == 3) && board[i - 2][j + 2] == 0) {
                    console.log("Must Eat Right Side");
                    alert('Must Eat Right Side');
                    return true;
                }
            }
        }
    }
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 8; j++) {
            if (board[i][j] == 4) {
                if ((board[i + 1][j - 1] == 1 || board[i + 1][j - 1] == 3) && board[i + 2][j - 2] == 0) {
                    console.log("Must Eat Left Side");
                    alert('Must Eat Left Side');
                    return true;
                }
                if ((board[i + 1][j + 1] == 1 || board[i + 1][j + 1] == 3) && board[i + 2][j + 2] == 0) {
                    console.log("Must Eat Right Side");
                    alert('Must Eat Right Side');
                    return true;
                }
            }
        }
    }
    return false;
}

//This Function Check for AI if eat is possible.
function AICheckEatFirst() {
    //eat down
    for (var i = 0; i < 6; i++) {
        for (var j = 0; j < 8; j++) {
            if (board[i][j] == 1 || board[i][j] == 3) {
                if (i < 6) {
                    if ((board[i + 1][j - 1] == 2 || board[i + 1][j - 1] == 4) && board[i + 2][j - 2] == 0) {
                        console.log("AI Must Eat Left Side");
                        way = 1;
                        AIXfrom = i;
                        AIYfrom = j;
                        AIXto = i + 2;
                        AIYto = j - 2;
                        return true;
                    }
                    else if ((board[i + 1][j + 1] == 2 || board[i + 1][j + 1] == 4) && board[i + 2][j + 2] == 0) {
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
    }
    //eat up
    for (var i = 7; i > 1; i--) {
        for (var j = 7; j >= 0; j--) {
            if (board[i][j] == 3) {
                if (i > 1) {
                    if ((board[i - 1][j - 1] == 2 || board[i - 1][j - 1] == 4) && board[i - 2][j - 2] == 0) {
                        console.log("AI King Must Eat Left Side");
                        way = 1;
                        AIXfrom = i;
                        AIYfrom = j;
                        AIXto = i - 2;
                        AIYto = j - 2;
                        return true;
                    }
                    else if ((board[i - 1][j + 1] == 2 || board[i - 1][j + 1] == 4) && board[i - 2][j + 2] == 0) {
                        console.log("AI King Must Eat Right Side");
                        way = 2;
                        AIXfrom = i;
                        AIYfrom = j;
                        AIXto = i - 2;
                        AIYto = j + 2;
                        return true;
                    }
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
                if (i < 7) {
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
                    }
                }
            }
        }
    }

    var rand = Math.floor((Math.random() * 2) + 1);

    switch (rand) {
        case 1:
            for (var i = 7; i >= 0; i--) {
                for (var j = 7; j >= 0; j--) {
                    if (board[i][j] == 3) {
                        if (AIsimpleMoveAddOn(i, j)) {
                            return true;
                        }
                    }
                }
            }
            break;
        case 2:
            for (var i = 0; i <= 7; i++) {
                for (var j = 0; j <= 7; j++) {
                    if (board[i][j] == 3) {
                        if (AIsimpleMoveAddOn(i, j)) {
                            return true;
                        }
                    }
                }
            }
            break;
        default:
            break;
    }


    return false;
}

function AIsimpleMoveAddOn(i, j) {
    if (i > 0) {
        if (i > 1) {
            if (board[i - 1][j - 1] == 0 && i >= 2 && board[i - 2][j - 2] == 0) {
                way = 1;
                AIXfrom = i;
                AIYfrom = j;
                AIXto = i - 1;
                AIYto = j - 1;
                return true;
            }
        }
        if (i > 1) {
            if (board[i - 1][j + 1] == 0 && i <= 2 && board[i - 2][j + 2] == 0) {
                way = 2;
                AIXfrom = i;
                AIYfrom = j;
                AIXto = i - 1;
                AIYto = j + 1;
                return true;
            }
        }
        if (board[i - 1][j - 1] == 0) {
            way = 1;
            AIXfrom = i;
            AIYfrom = j;
            AIXto = i - 1;
            AIYto = j - 1;
            return true;
        }
        if (board[i - 1][j + 1] == 0) {
            way = 2;
            AIXfrom = i;
            AIYfrom = j;
            AIXto = i - 1;
            AIYto = j + 1;
            return true;
        }
    }
    if (i < 7) {
        if (i < 6) {
            if (board[i + 1][j - 1] == 0 && i <= 5 && board[i + 2][j - 2] == 0) {
                way = 1;
                AIXfrom = i;
                AIYfrom = j;
                AIXto = i + 1;
                AIYto = j - 1;
                return true;
            }
        }
        if (i < 6) {
            if (board[i + 1][j + 1] == 0 && i <= 5 && board[i + 2][j + 2] == 0) {
                way = 2;
                AIXfrom = i;
                AIYfrom = j;
                AIXto = i + 1;
                AIYto = j + 1;
                return true;
            }
        }
        if (board[i + 1][j - 1] == 0) {
            way = 1;
            AIXfrom = i;
            AIYfrom = j;
            AIXto = i + 1;
            AIYto = j - 1;
            return true;
        }
        if (board[i + 1][j + 1] == 0) {
            way = 2;
            AIXfrom = i;
            AIYfrom = j;
            AIXto = i + 1;
            AIYto = j + 1;
            return true;
        }
    }
}

//This Function checks if you can eat one more peace before the computers turn.
function eatAgain() {
    if (board[xTo][yTo] == 2) {
        if (TD_FROM > 37) {
            if (board[xTo - 1][yTo - 1] == 1 || board[xTo - 1][yTo - 1] == 3) {
                if (board[xTo - 2][yTo - 2] == 0) {
                    console.log("One More Eat Left Side");
                    return true;
                }
            }
            else if (board[xTo - 1][yTo + 1] == 1 || board[xTo - 1][yTo + 1] == 3) {
                if (board[xTo - 2][yTo + 2] == 0) {
                    console.log("One More Eat Right Side");
                    return true;
                }
            }
        }
    }
    if (board[xTo][yTo] == 4) {
        if (TD_FROM < 60) {
            if (board[xTo + 1][yTo - 1] == 1 || board[xTo + 1][yTo - 1] == 3) {
                if (board[xTo + 2][yTo - 2] == 0) {
                    console.log("One More Eat Left Side");
                    return true;
                }
            }
            if (board[xTo + 1][yTo + 1] == 1 || board[xTo + 1][yTo + 1] == 3) {
                if (board[xTo + 2][yTo + 2] == 0) {
                    console.log("One More Eat Right Side");
                    return true;
                }
            }
        }
        if (TD_FROM > 37) {
            if (board[xTo - 1][yTo - 1] == 1 || board[xTo - 1][yTo - 1] == 3) {
                if (board[xTo - 2][yTo - 2] == 0) {
                    console.log("One More Eat Left Side");
                    return true;
                }
            }
            else if (board[xTo - 1][yTo + 1] == 1 || board[xTo - 1][yTo + 1] == 3) {
                if (board[xTo - 2][yTo + 2] == 0) {
                    console.log("One More Eat Right Side");
                    return true;
                }
            }
        }
    }
    return false;
}

//This Function checks if the eat move is OK.
function eatMove() {
    if (board[xFrom][yFrom] == 2) {
        if (TD_FROM > 17) {
            if (board[xFrom - 1][yFrom - 1] == 1 || board[xFrom - 1][yFrom - 1] == 3) {
                way = 1;
                if (eat(2)) {
                    return true;
                }
            }
            if (board[xFrom - 1][yFrom + 1] == 1 || board[xFrom - 1][yFrom + 1] == 3) {
                way = 2;
                if (eat(2)) {
                    return true;
                }
            }
        }
    }
    if (board[xFrom][yFrom] == 4) {
        if (TD_FROM < 60) {
            if (board[xFrom + 1][yFrom - 1] == 1 || board[xFrom + 1][yFrom - 1] == 3) {
                way = 1;
                if (eat(4)) {
                    return true;
                }
            }
            if (board[xFrom + 1][yFrom + 1] == 1 || board[xFrom + 1][yFrom + 1] == 3) {
                way = 2;
                if (eat(4)) {
                    return true;
                }
            }
        }
        if (TD_FROM > 17) {
            if (board[xFrom - 1][yFrom - 1] == 1 || board[xFrom - 1][yFrom - 1] == 3) {
                way = 1;
                if (eat(4)) {
                    return true;
                }
            }
            if (board[xFrom - 1][yFrom + 1] == 1 || board[xFrom - 1][yFrom + 1] == 3) {
                way = 2;
                if (eat(4)) {
                    return true;
                }
            }
        }
    }
    return false;
}

//This Function check if the move to cords is OK.
function eat(Who) {
    switch (Who) {
        case 2:
            if (TD_FROM > 17) {
                if ((xFrom - 2 == xTo && yFrom - 2 == yTo) && way == 1 && CheckIsPeaceThere())
                    return true;
                else if ((xFrom - 2 == xTo && yFrom + 2 == yTo) && way == 2 && CheckIsPeaceThere())
                    return true;
                else
                    return false;
            }
            break;
        case 4:
            if (TD_FROM < 60) {
                if ((xFrom + 2 == xTo && yFrom - 2 == yTo) && way == 1 && CheckIsPeaceThere())
                    return true;
                else if ((xFrom + 2 == xTo && yFrom + 2 == yTo) && way == 2 && CheckIsPeaceThere())
                    return true;
            }
            if (TD_FROM > 17) {
                if ((xFrom - 2 == xTo && yFrom - 2 == yTo) && way == 1 && CheckIsPeaceThere())
                    return true;
                else if ((xFrom - 2 == xTo && yFrom + 2 == yTo) && way == 2 && CheckIsPeaceThere())
                    return true;
            }
            return false;
            break;
        default:
            break;
    }
}

//This Function delete the piece from board.
function deletePieace() {
    if (board[xFrom][yFrom] == 2) {
        switch (way) {
            case 1:
                board[xFrom - 1][yFrom - 1] = 0;
                $('#' + (xFrom - 1) + (yFrom - 1)).find('img').hide(1000).promise().done(function () {
                    $(this).remove();
                });
                console.log("Pieace Deleted");
                GameCounter(2);
                break;
            case 2:
                board[xFrom - 1][yFrom + 1] = 0;
                $('#' + (xFrom - 1) + (yFrom + 1)).find('img').hide(1000).promise().done(function () {
                    $(this).remove();
                });
                console.log("Pieace Deleted");
                GameCounter(2);
                break;
            default:
                break;
        }
    }
    if (board[xFrom][yFrom] == 4) {
        if (xFrom + 2 == xTo) {
            switch (way) {
                case 1:
                    board[xFrom + 1][yFrom - 1] = 0;
                    $('#' + (xFrom + 1) + (yFrom - 1)).find('img').hide(1000).promise().done(function () {
                        $(this).remove();
                    });
                    console.log("Pieace Deleted");
                    GameCounter(2);
                    break;
                case 2:
                    board[xFrom + 1][yFrom + 1] = 0;
                    $('#' + (xFrom + 1) + (yFrom + 1)).find('img').hide(1000).promise().done(function () {
                        $(this).remove();
                    });
                    console.log("Pieace Deleted");
                    GameCounter(2);
                    break;
                default:
                    break;
            }
        }
        if (xFrom - 2 == xTo) {
            switch (way) {
                case 1:
                    board[xFrom - 1][yFrom - 1] = 0;
                    $('#' + (xFrom - 1) + (yFrom - 1)).find('img').hide(1000).promise().done(function () {
                        $(this).remove();
                    });
                    console.log("Pieace Deleted");
                    GameCounter(2);
                    break;
                case 2:
                    board[xFrom - 1][yFrom + 1] = 0;
                    $('#' + (xFrom - 1) + (yFrom + 1)).find('img').hide(1000).promise().done(function () {
                        $(this).remove();
                    });
                    console.log("Pieace Deleted");
                    GameCounter(2);
                    break;
                default:
                    break;
            }
        }
    }
}

//This Function Updates the Board with Taken Blocks.
function UpdateStatus() {
    if (board[xFrom][yFrom] == 2) {
        board[xFrom][yFrom] = 0;
        board[xTo][yTo] = 2;
        console.log("Status Updated");
    }
    if (board[xFrom][yFrom] == 4) {
        board[xFrom][yFrom] = 0;
        board[xTo][yTo] = 4;
        console.log("Status Updated");
    }
    if (xTo == 0 && board[xFrom][yFrom] != 4) {
        board[xTo][yTo] = 4;
        $('#' + xTo + yTo).find('img').remove();
        $('#' + xTo + yTo).append('<img ondragstart="drag(event)" data-player="4" src="res/2_king.png" />');
        console.log("King Created");
    }
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

    if (EndGame) {
        if (eatMove()) {
            $(ev.target).append($('#' + TD_FROM).find('img'));
            deletePieace();
            UpdateStatus();
            if (!eatAgain()) {
                AI_turn_start();
            }
        }
        else if (humanMove() && !MustEat()) {
            $(ev.target).append($('#' + TD_FROM).find('img'));
            UpdateStatus();
            AI_turn_start();
        }
        else
            console.log("Illegal Move");
    }
}

//This Function Starts the AI move.
function AI_turn_start() {
    if (EndGame) {
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
            console.log("AI-Move");
            AISimpleMove();
            AI_Move();
        }
    }
}

//This Function checks if the AI can eat again.
function AI_eat_again() {
    if (board[AIXto][AIYto] == 1 || board[AIXto][AIYto] == 3) {
        if (AIXto < 6) {
            if (AIXto < 6 && (board[AIXto + 1][AIYto - 1] == 2 || board[AIXto + 1][AIYto - 1] == 4) && board[AIXto + 2][AIYto - 2] == 0) {
                way = 1;
                AIXfrom = AIXto;
                AIYfrom = AIYto;
                AIXto = AIXto + 2;
                AIYto = AIYto - 2;
                return true;
            }

            if (AIXto < 6 && (board[AIXto + 1][AIYto + 1] == 2 || board[AIXto + 1][AIYto + 1] == 4) && board[AIXto + 2][AIYto + 2] == 0) {
                way = 2;
                AIXfrom = AIXto;
                AIYfrom = AIYto;
                AIXto = AIXto + 2;
                AIYto = AIYto + 2;
                return true;
            }
        }
    }
    if (board[AIXto][AIYto] == 3) {
        if (AIXto > 1) {
            if (AIXto > 1 && (board[AIXto - 1][AIYto - 1] == 2 || board[AIXto - 1][AIYto - 1] == 4) && board[AIXto - 2][AIYto - 2] == 0) {
                way = 1;
                AIXfrom = AIXto;
                AIYfrom = AIYto;
                AIXto = AIXto - 2;
                AIYto = AIYto - 2;
                return true;
            }

            if (AIXto > 1 && (board[AIXto - 1][AIYto + 1] == 2 || board[AIXto - 1][AIYto + 1] == 4) && board[AIXto - 2][AIYto + 2] == 0) {
                way = 2;
                AIXfrom = AIXto;
                AIYfrom = AIYto;
                AIXto = AIXto - 2;
                AIYto = AIYto + 2;
                return true;
            }
        }
    }
    return false;
}

//This Function Delete and update the board after AI eat move.
function AI_Eat_Move() {
    if (board[AIXfrom][AIYfrom] == 1) {
        switch (way) {
            case 1: {
                $('#' + AIXfrom + AIYfrom).find('img').hide(1000).promise().done(function () {
                    $(this).remove();
                });
                $('#' + (AIXfrom + 1) + (AIYfrom - 1)).find('img').hide(1000).promise().done(function () {
                    $(this).remove();
                });
                $('#' + AIXto + AIYto).append('<img ondragstart="drag(event)" data-player="1" src="res/1.png" />').find('img').hide().show(1000);
                board[AIXfrom][AIYfrom] = 0;
                board[AIXfrom + 1][AIYfrom - 1] = 0;
                board[AIXto][AIYto] = 1;
                console.log("Status Updated + AI-eat-Done(Left)");
                GameCounter(1);
                if (AIXto == 7) {
                    $('#' + AIXto + AIYto).find('img').remove();
                    $('#' + AIXto + AIYto).append('<img ondragstart="drag(event)" data-player="1" src="res/1_king.png" />');
                    board[AIXto][AIYto] = 3;
                }
                break;
            }
            case 2: {
                $('#' + AIXfrom + AIYfrom).find('img').hide(1000).promise().done(function () {
                    $(this).remove();
                });
                $('#' + (AIXfrom + 1) + (AIYfrom + 1)).find('img').hide(1000).promise().done(function () {
                    $(this).remove();
                });
                $('#' + AIXto + AIYto).append('<img ondragstart="drag(event)" data-player="1" src="res/1.png" />').find('img').hide().show(1000);
                board[AIXfrom][AIYfrom] = 0;
                board[AIXfrom + 1][AIYfrom + 1] = 0;
                board[AIXto][AIYto] = 1;
                console.log("Status Updated + AI-eat-Done(Right)");
                GameCounter(1);
                if (AIXto == 7) {
                    $('#' + AIXto + AIYto).find('img').remove();
                    $('#' + AIXto + AIYto).append('<img ondragstart="drag(event)" data-player="1" src="res/1_king.png" />');
                    board[AIXto][AIYto] = 3;
                }
                break;
            }
            default:
                break;
        }
    }
    if (board[AIXfrom][AIYfrom] == 3) {
        if (AIXfrom + 2 == AIXto) {
            switch (way) {
                case 1: {
                    $('#' + AIXfrom + AIYfrom).find('img').hide(1000).promise().done(function () {
                        $(this).remove();
                    });
                    $('#' + (AIXfrom + 1) + (AIYfrom - 1)).find('img').hide(1000).promise().done(function () {
                        $(this).remove();
                    });
                    $('#' + AIXto + AIYto).append('<img ondragstart="drag(event)" data-player="1" src="res/1_king.png" />').hide().show(1000);
                    board[AIXfrom][AIYfrom] = 0;
                    board[AIXfrom + 1][AIYfrom - 1] = 0;
                    board[AIXto][AIYto] = 3;
                    console.log("Status Updated + AI-eat-Done(Left)");
                    GameCounter(1);
                    break;
                }
                case 2: {
                    $('#' + AIXfrom + AIYfrom).find('img').hide(1000).promise().done(function () {
                        $(this).remove();
                    });
                    $('#' + (AIXfrom + 1) + (AIYfrom + 1)).find('img').hide(1000).promise().done(function () {
                        $(this).remove();
                    });
                    $('#' + AIXto + AIYto).append('<img ondragstart="drag(event)" data-player="1" src="res/1_king.png" />').hide().show(1000);
                    board[AIXfrom][AIYfrom] = 0;
                    board[AIXfrom + 1][AIYfrom + 1] = 0;
                    board[AIXto][AIYto] = 3;
                    console.log("Status Updated + AI-eat-Done(Right)");
                    GameCounter(1);
                    break;
                }
                default:
                    break;
            }
        }
        if (AIXfrom - 2 == AIXto) {
            switch (way) {
                case 1: {
                    $('#' + AIXfrom + AIYfrom).find('img').hide(1000).promise().done(function () {
                        $(this).remove();
                    });
                    $('#' + (AIXfrom - 1) + (AIYfrom - 1)).find('img').hide(1000).promise().done(function () {
                        $(this).remove();
                    });
                    $('#' + AIXto + AIYto).append('<img ondragstart="drag(event)" data-player="1" src="res/1_king.png" />').hide().show(1000);
                    board[AIXfrom][AIYfrom] = 0;
                    board[AIXfrom - 1][AIYfrom - 1] = 0;
                    board[AIXto][AIYto] = 3;
                    console.log("Status Updated + AI-eat-Done(Left)");
                    GameCounter(1);
                    break;
                }
                case 2: {
                    $('#' + AIXfrom + AIYfrom).find('img').hide(1000).promise().done(function () {
                        $(this).remove();
                    });
                    $('#' + (AIXfrom - 1) + (AIYfrom + 1)).find('img').hide(1000).promise().done(function () {
                        $(this).remove();
                    });
                    $('#' + AIXto + AIYto).append('<img ondragstart="drag(event)" data-player="1" src="res/1_king.png" />').hide().show(1000);
                    board[AIXfrom][AIYfrom] = 0;
                    board[AIXfrom - 1][AIYfrom + 1] = 0;
                    board[AIXto][AIYto] = 3;
                    console.log("Status Updated + AI-eat-Done(Right)");
                    GameCounter(1);
                    break;
                }
                default:
                    break;
            }
        }
    }

}

//This Function makes the move and update.
function AI_Move() {
    if (board[AIXfrom][AIYfrom] == 1) {
        $('#' + AIXfrom + AIYfrom).find('img').hide(1000).promise().done(function () {
            $(this).remove();
        });
        $('#' + AIXto + AIYto).append('<img ondragstart="drag(event)" data-player="1" src="res/1.png" />').find('img').hide().show(1000);
        board[AIXfrom][AIYfrom] = 0;
        board[AIXto][AIYto] = 1;
        console.log("Status Updated + AI-Move-Done");
        if (AIXto == 7) {
            $('#' + AIXto + AIYto).find('img').remove();
            $('#' + AIXto + AIYto).append('<img ondragstart="drag(event)" data-player="1" src="res/1_king.png" />');
            board[AIXto][AIYto] = 3;
        }
        return;
    }
    if (board[AIXfrom][AIYfrom] == 3) {
        $('#' + AIXfrom + AIYfrom).find('img').hide(1000).promise().done(function () {
            $(this).remove();
        });
        $('#' + AIXto + AIYto).append('<img ondragstart="drag(event)" data-player="1" src="res/1_king.png" />').find('img').hide().show(1000);
        board[AIXfrom][AIYfrom] = 0;
        board[AIXto][AIYto] = 3;
        console.log("Status Updated + AI-Move-Done");
        return;
    }
}

//This Function Counts the eat move on all players
function GameCounter(whoEat) {
    switch (whoEat) {
        case 1:
            if ((++AICounter) == 12) {
                GameFinish(1);
                UpdateScoreBoard(1);
            }
            break;
        case 2:
            if ((++PlayerCounter) == 12) {
                GameFinish(2);
                UpdateScoreBoard(2);
            }
            break;
        default:
            break;
    }
}

// This Function resets all the images
function ResetImgs(rows, cols) {
    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            $('#' + i + j).find('img').remove();
        }
    }

    for (var i = 0; i < rows; i++) {
        for (var j = 0; j < cols; j++) {
            if ((i % 2 == 0 && j % 2 != 0 && i < 3) || (i % 2 != 0 && j % 2 == 0 && i < 3)) {
                $('#' + i + j).append('<img ondragstart="drag(event)" data-player="1" src="res/1.png" />');
            } else
                if ((i % 2 == 0 && j % 2 != 0 && i > 4) || (i % 2 != 0 && j % 2 == 0 && i > 4)) {
                    $('#' + i + j).append('<img ondragstart="drag(event)" data-player="1" src="res/2.png" />');
                }
        }
    }
    console.log("Reset Images Done");
}

// This Function Resets the game data.
function ResetGame() {
    board = matrix(8, 8);
    PlayerCounter = 0;
    AICounter = 0;
    GameFinish(0);
    EndGame = true;
    $('#reset').invisible();
    ResetImgs(8, 8);
    console.log("Reset Game Done");
    alert('Game Reset');
}

//This Function Prints the Board
function Print(arr, rows, cols) {
    for (var i = 0; i < rows; i++)
        for (var j = 0; j < cols; j++) {
            console.log("arr" + "[" + i + ']' + '[' + j + ']:' + arr[i][j]);
        }
    console.log("Board Print Finish");
}

//This is the MAIN function.
$(document).ready(function () { board = matrix(8, 8); console.log("Init Complete.") });