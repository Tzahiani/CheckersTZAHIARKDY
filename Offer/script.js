
var playerScore = 0;
var AIScore = 0;
var whiteEat=0;
var blackEat=0;
turn=0;



	function move(){
		
		var img =$(this);

		img.draggable();
		img.droppable({
			drop: function( event, ui ) {
				$( this ).addClass( "ui-state-highlight" ).find( "td" ).html( "Dropped!" );
			}
		
		}


		function start(){
			$('img').click(move);

		}	
//This function updates the scoreboard game finish.
//Human Player = 1
//AI = 2	
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

	$( document ).ready(start);