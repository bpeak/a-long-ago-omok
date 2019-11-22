c = document.getElementById('myCanvas')
ctx = c.getContext('2d');

var gameStart = 0;
var turn = 'user'
var user_input_location = [];
var com_input_location = [];

var mouseDownX = null;
var mouseDownY = null;
var mouseStatus = 0;
document.addEventListener('mousedown', mouseDownHandler, false)
function mouseDownHandler(e){
	mouseDownX = e.offsetX
	mouseDownY = e.offsetY
	gameStart = 1;
	mouseStatus = 1;
}

var blackOImage = new Image();
blackOImage.src = './img/blackO.png'
var whiteOImage = new Image();
whiteOImage.src = './img/whiteO.png'

var pann = {};
pann.columns = 20;
pann.rows = pann.columns
pann.width = 30;
var pannImage = new Image();
pannImage.src = './img/pann.png'

var local = [];
for(i = 0; i < pann.columns; i++){
		local[i] = []
	for(j = 0; j < pann.columns; j++){
			local[i][j] = 0
	}	}
var point = [];
for(i = 0; i < pann.columns; i++){
		point[i] = []
	for(j = 0; j < pann.columns; j++){
		point[i][j] = {
			g : 0,
			s : 0,
			rd : 0,
			ld : 0
		}
	}	
}
function findUserInputLocation(){
	for(i = 0; i < pann.columns; i++){
		for(j = 0; j < pann.columns; j++){
			if(( mouseDownX >= i * pann.width && mouseDownX <= (i + 1) * pann.width ) && ( mouseDownY >= j * pann.width && mouseDownY <= (j + 1) * pann.width )){
				return [i, j]
			}
		}
	}
}

function drawPann(){
	for(i = 0; i < pann.columns; i++){
		for(j = 0; j < pann.columns; j++){
			ctx.drawImage(pannImage, i * pann.width, j * pann.width, pann.width, pann.width)
		}
	}
}

function drawO(){
	for(i = 0; i < pann.columns; i++){
		for(j = 0; j < pann.columns; j++){
			if(local[i][j] == 1){
				ctx.drawImage(blackOImage, i * pann.width, j * pann.width, pann.width, pann.width)
			}
			if(local[i][j] == 2){
				ctx.drawImage(whiteOImage, i * pann.width, j * pann.width, pann.width, pann.width)
			}
		}
	}
}

function comThink(){
	for(i = 0; i < pann.columns; i++){
		point[i] = []
	for(j = 0; j < pann.columns; j++){
		point[i][j] = {
			g : 0,
			s : 0,
			rd : 0,
			ld : 0
		}
	}	
}


var bba = 1;

	function findUserO(){
		var cur_max = 0;
		
		for(i = 0; i < pann.columns; i++){
			for(j = 0; j < pann.columns; j++){
				if(local[i][j] == 1){
					for(g = 1; g < 100; g++){
						if(local[i - g][j] == 1){
							point[i][j].g += 1;
						} else if(local[i - g][j] == 0){
							break;
						} else if(local[i - g][j] == 2){
							point[i][j].g -= 1;
							break;
						}
					}
					for(g = 1; g < 100; g++){
						if(local[i + g][j] == 1){
							point[i][j].g += 1;
						} else if(local[i + g][j] == 0){
							break;
						} else if(local[i + g][j] == 2){
							point[i][j].g -= 1;
							break;
						}
					}
					for(g = 1; g < 100; g++){
						if(local[i][j - g] == 1){
							point[i][j].s += 1;
						} else if(local[i][j - g] == 0){
							break;
						} else if(local[i][j - g] == 2){
							point[i][j].s -= -1;
						}
					}
					for(g = 1; g < 100; g++){
						if(local[i][j + g] == 1){
							point[i][j].s += 1;
						} else if(local[i][j + g] == 0){
							break;
						} else if(local[i][j + g] == 2){
							point[i][j].s -= -1;
						}
					}
					console.log(i + " : " + j + " 가로point : " + point[i][j].g)
					console.log(i + " : " + j + " 세로point : " + point[i][j].s)
				}
			}
		}
	}
	findUserO()
}

local[9][9] = 2;
function main(){
	ctx.clearRect(0, 0, c.width, c.height)
	drawPann()
	drawO();
	if(gameStart == 1){
		if(turn == 'user'){
			user_input_location = findUserInputLocation();
			if(local[user_input_location[0]][user_input_location[1]] == 0){
				local[user_input_location[0]][user_input_location[1]] = 1
				turn = 'com'
				mouseStatus = 0;
			} else {
				turn = 'user'
			}
		}
		if(turn == 'com'){
			comThink()
			turn = 'user'
		}
	}
	requestAnimationFrame(main)
}

main()