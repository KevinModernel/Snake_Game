class Snake{
	constructor(x, y, size){
		this.x = x;
		this.y = y;
		this.size = size;
		this.tail = [{x:this.x, y:this.y}]
		this.rotateX = 0;
		this.rotateY = 1;
	}

	 move(){
	 	let newRect;

	 	if(this.rotateX == 1){ // rotateX=1 Desplaza hacia derecha
	 		newRect = {
	 			x: this.tail[this.tail.length - 1].x + this.size,
	 			y: this.tail[this.tail.length - 1].y,
	 		}
	 	} else if(this.rotateX == -1){  // rotateX=-1 Desplaza hacia izquierda
	 		newRect = {
	 			x: this.tail[this.tail.length - 1].x - this.size,
	 			y: this.tail[this.tail.length - 1].y,
	 		}
	 	} else if(this.rotateY == 1){ // rotateY=1 Desplaza hacia abajo
	 		newRect = {
	 			x: this.tail[this.tail.length - 1].x,
	 			y: this.tail[this.tail.length - 1].y + this.size,
	 		}
	 	} else if(this.rotateY == -1){ //rotateY=-1 Desplaza hacia arriba
	 		newRect = {
	 			x: this.tail[this.tail.length - 1].x,
	 			y: this.tail[this.tail.length - 1].y - this.size,
	 		}
	 	}
	 
	 	 this.tail.shift();
	 	 this.tail.push(newRect);

	 }
}

class Apple{
	constructor(){
		let isTouching;
		while(true){
			isTouching = false;
			this.x = Math.floor(Math.random() * $canvas.width / snake.size) * snake.size;
			this.y = Math.floor(Math.random() * $canvas.height / snake.size) * snake.size;
			for(let i = 0; i < snake.tail.length; i++){
				if(this.x == snake.tail[i].x && this.y == snake.tail[i].y){
					isTouching = true;
				}										
			}
			this.color = "red";
			this.size = snake.size;

			if(!isTouching){
				break;
			}
		}
	}
}


// Asigno HTML Elements y creo canvas.

let $score = document.getElementById("score")
const $canvas = document.getElementById("canvas");
const $canvasContext = $canvas.getContext("2d");
createRect(0,0,$canvas.width, $canvas.height, "black");

const $startButton = document.querySelector("#start");
const $restartButton = document.querySelector("#restart");
const $levelOneButton = document.querySelector("#levelOneButton");
const $levelTwoButton = document.querySelector("#levelTwoButton");
const $levelThreeButton = document.querySelector("#levelThreeButton");

const $levelOneLabel = document.getElementById("levelOne")
const $levelTwoLabel = document.getElementById("levelTwo")
const $levelThreeLabel = document.getElementById("levelThree")


// Declaro e Inicializo variables

let scoreSum = 0
let loop = 0;
let snake = '';
let apple = '';
let collision = false;
$restartButton.disabled = true;

// Valor de la variable FPS indica Frames Per Second, variable según LVL. 
// Level 1=10FPS, Level 2=15 FPS, Level 3=20 FPS.
let FPS = 10;

// Comienza el juego con el boton Start.
$startButton.onclick = () => {
	startButtonsHandler();
	gameLoop();
}

// Reinicia el juego.
$restartButton.onclick = () => {
	clearInterval(loop);
	restartButtonsHandler();
	gameLoop();
}

// Reasigno variables para iniciar el juego, creo instances de Snake y Apple Classes, e inicializo loop
function gameLoop(){
	scoreSum = 0;
	collision = false;
	$score.innerHTML = 0;
	snake = new Snake($canvas.width / 2, $canvas.height / 2, 20);
	apple = new Apple();
	loop = setInterval(show, 1000/FPS)
	}

// Para cada intervalo del loop, actualiza nueva posición, corrobora colisiones y redibuja.
function show(){
	update();
	if (collision == false) {
		draw();
	}
}

// Actualiza nueva posición, corrobora colisiones.
function update(){
	snake.move();
	checkHit();
	eatApple();
}

// Corrobora colisiones.
function checkHit() {
	checkHitWall();
	checkHitItself();
}

function checkHitItself(){
	let headTail = snake.tail[snake.tail.length-1]; 
	let snakeTail = snake.tail;
	for(let i=0; i < snakeTail.length - 1; i++){ 
		if (headTail.x === snakeTail[i].x && headTail.y === snakeTail[i].y){
			gameOver();
			collision = true;
		}
	}
}

function checkHitWall() {
	let headTail = snake.tail[snake.tail.length-1]; 
	if (headTail.x === -snake.size && (headTail.y >= 0 && headTail.y <= $canvas.height)) { // izq
		gameOver();
		collision = true;
	} else if (headTail.x === $canvas.width && (headTail.y >= 0 && headTail.y <= $canvas.height)) { // derecha
		gameOver();
		collision = true;
	} else if (headTail.y === -snake.size && (headTail.x >= 0 && headTail.x <= $canvas.width)) { //arriba
		gameOver();
		collision = true;
	} else if (headTail.y === $canvas.height && (headTail.x >= 0 && headTail.x <= $canvas.width)) { // abajo
		gameOver();
		collision = true;
	}
}

function eatApple(){
	if (snake.tail[snake.tail.length - 1].x == apple.x && 
		snake.tail[snake.tail.length - 1].y == apple.y){
			snake.tail[snake.tail.length] = {x:apple.x, y: apple.y};
			apple = new Apple();
			scoreSum++;
			$score.innerHTML = scoreSum;
	}
}

function draw(){
	createRect(0,0,$canvas.width, $canvas.height, "black");
	for(let i=0; i < snake.tail.length; i++){
		createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5, snake.size - 5, snake.size - 5, 'green');
	}
	createRect(apple.x, apple.y, apple.size -5, apple.size-5, apple.color);
}

// Detiene Loop, muestra mensaje, y maneja botones.
function gameOver() {
	clearInterval(loop);
	gameOverMessage();	
	gameOverButtonsHandler();
}

function gameOverMessage() {
	createRect(0,0,$canvas.width, $canvas.height, "black");
	for(let i = 0; i < snake.tail.length; i++){
		createRect(snake.tail[i].x + 2.5, snake.tail[i].y + 2.5, snake.size - 5, snake.size - 5, 'red');
	}
	$canvasContext.font = "80px Arial";
	$canvasContext.fillStyle = "green";
	$canvasContext.fillText("Game Over", 90, 90,200);
}

function createRect(x,y,width, height, color){
	$canvasContext.fillStyle = color;
	$canvasContext.fillRect(x,y,width,height);
}

// Responde a cambios de dirección según teclado (Arrow Keys).
window.addEventListener("keydown", (event)=>{
	setTimeout(()=>{
		if(event.keyCode == 37 && snake.rotateX != 1){ // 37 arrow left
			snake.rotateX = -1;
			snake.rotateY = 0;
		} else if(event.keyCode == 38 && snake.rotateY != 1){  // 38 arrow up
			snake.rotateX = 0;
			snake.rotateY = -1;
		} else if(event.keyCode == 39 && snake.rotateX != -1){ // 39 arrow right
			snake.rotateX = 1;
			snake.rotateY = 0;
		} else if(event.keyCode == 40 && snake.rotateY != -1){ // 40 arrow down
			snake.rotateX = 0;
			snake.rotateY = 1;
		}
	}, 1)
	})

//// Manejo de Botones

// Manejo de niveles

levelOneButton.onclick = () => {
	$levelOneLabel.className = "btn btn-secondary active";
	$levelTwoLabel.className = "btn btn-secondary";
	$levelThreeLabel.className = "btn btn-secondary";
	$restartButton.disabled = true;
	FPS = 10;
}

levelTwoButton.onclick = () => {
	$levelOneLabel.className = "btn btn-secondary";
	$levelTwoLabel.className = "btn btn-secondary active";
	$levelThreeLabel.className = "btn btn-secondary";
	$restartButton.disabled = true;
	FPS = 15;
}

levelThreeButton.onclick = () => {
	$levelOneLabel.className = "btn btn-secondary";
	$levelTwoLabel.className = "btn btn-secondary";
	$levelThreeLabel.className = "btn btn-secondary active";
	$restartButton.disabled = true;	
	FPS = 20;
}

function startButtonsHandler(){
	$startButton.disabled = true;
	$restartButton.disabled = false;
	$levelOneButton.disabled = true;
	$levelTwoButton.disabled = true;
	$levelThreeButton.disabled = true;
}

function restartButtonsHandler(){
	$startButton.disabled = true;
	$levelOneButton.disabled = true;
	$levelTwoButton.disabled = true;
	$levelThreeButton.disabled = true;
}

function gameOverButtonsHandler(){
	$startButton.disabled = false;
	$levelOneButton.disabled = false;
	$levelTwoButton.disabled = false;
	$levelThreeButton.disabled = false;
}
