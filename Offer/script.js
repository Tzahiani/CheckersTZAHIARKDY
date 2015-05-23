
var playerScore = 0;
var AIScore = 0;
var whiteEat=0;
var blackEat=0;
turn=0;
var baord;

function matrix( rows, cols){

  var arr = [];

  // Creates all lines:
  for(var i=0; i < rows; i++){

      // Creates an empty line
      arr.push([]);

      // Adds cols to the empty line:
      arr[i].push( new Array(cols));

      for(var j=0; j < cols; j++){
        // Initializes:
        arr[i][j] = undefined;
      }
  }

return arr;
}

function board(){

	for(var x=0;x<8;x++)
		for(var y=0;y<8;y++)
			board[x][y]=$('#'+x+y);
}
	
function UpdateScoreBoard(winner){
	switch(winner){
		case 1: 
			x=Document.getElementById("playerScore");
			x.innerHTML  = playerScore++;
			break;
		case 2:
			x=Document.getElementById("AIScore");
			x.innerHTML  = AIScore++;
		default:
        	break;
	}
}	

function start(){
	board = matrix(8,8)
	board();
}

	$( document ).ready(start);