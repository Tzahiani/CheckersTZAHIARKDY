
var playerScore = 0;
var AIScore = 0;
var whiteEat=0;
var blackEat=0;
turn=0;
var baord[8][8];

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
	board();
}

	$( document ).ready(start);