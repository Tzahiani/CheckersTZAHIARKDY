function FIND_ALL_LEGAL_MOVES(){

	var arr1 = [];
	var x=64;
	var i=0;
	var j=0;

	while(x!=0){
		if((bord[i][j]+1==bord[i+1][j-1] && bord[i+2][j-2]==0)||(bord[i][j]+1==bord[i+1][j+1] && bord[i+2][j+2]==0))
			arr1[x]=2;
		}else
			if(bord[i+1][j-1]==0 || bord[i+1][j+1]==0)
			arr1[x]=1;
		}else
			if(bord[i+2][j+2]==2 || bord[i+2][j-2]==0)
				arr1[x]=0;
		i++;
		j++;
		x--;
	}

}