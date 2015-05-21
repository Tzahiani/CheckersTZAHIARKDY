var playerScore = 0;
var AIScore = 0;

function start() {
		var board=[
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
				[0, 0, 0, 0, 0, 0, 0, 0],
			];

		for(var i=1;i<=8;i++){
			for(var j=1;j<=8;j++){
				if(i%2==0&&j%2==0)
					$("#"+i+j).css("background-color", "black");
				if(i%2!=0&&j%2!=0)
					$("#"+i+j).css("background-color", "black");
				if (i%2==0&&j%2!=0||i==4||i==5) 
					$("#"+ i + j+"player").hide();
				if (j%2==0&&i%2!=0||i==4||i==5) 
					$("#"+ i + j+"player").hide();
			}
		}
		$( init );
		
		function init() {
			$('.makeMeDraggable').draggable();
		}
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