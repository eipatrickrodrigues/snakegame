const canvas = window.document.getElementById('canvas')
const context = canvas.getContext('2d')

// request animation frame
//set interval x time per a second
// set time out

class SnakePart{

    constructor(x, y){
        this.x = x;
        this.y = y;
    }
}

let speed = 7;

let tileCounts = 20; // Quantidade de ladrinhos em uma direção
let tileSize = canvas.width / (tileCounts - 2);
let headX = 10;
let headY = 10;
const snakeParts = [];
let tailLength = 2;

let appleX = 5; 
let appleY = 5;

let xvelocity = 0;
let yvelocity = 0;

let score = 0;
const gulpSound = new Audio("108672173.mp3")


// Game loop
function drawGame(){
    changeSnakePosition()
    let result = isGameOver();
    if (result){
        return
    }

    clearScreen();
    checkAppleCollision();
    drawApple();
    drawSnake();
    drawScore();
    setTimeout(drawGame, 1000/speed);


    if (score>5){
        speed = 10;
    }
    if (score > 10){
        speed = 15;
    }




}

function isGameOver(){

    if (yvelocity === 0 && xvelocity === 0){
        return false; 
    }
       

    let gameOver = false;
    // Será verdade quando bater nas paredes ou no próprio corpo
    if (headX < 0){
        gameOver = true;

    }
    else if (headX == tileCounts){
        gameOver = true;
    
    }else if (headY < 0){
        gameOver = true;
    }else if (headY == 20){
        gameOver = true;
    }

    for(let i = 0; i < snakeParts.length; i++){
        let part = snakeParts[i];
        if (part.x === headX && part.y === headY){
            gameOver = true;
            break
        }
    }

    if (gameOver){
        context.fillStyle = 'brown'
        context.font = '50px Verdana'
        context.fillText('Game Over!', canvas.width / 6.5, canvas.height/2)
    }

    return gameOver;

}


function drawScore(){

    context.fillStyle = 'white';
    context.font = '12px Verdana'
    context.fillText('Score: ' + score, canvas.width-70, 20);
}

function clearScreen(){

    context.fillStyle = 'grey';
    context.fillRect(0,0,canvas.width, canvas.height);
}

function drawSnake(){

    context.fillStyle = 'green';
    context.fillRect(headX*tileCounts, headY*tileCounts, tileSize, tileSize)

    context.fillStyle = 'purple'
    for(let i = 0; i < snakeParts.length; i++){

        let part = snakeParts[i];
        context.fillRect(part.x * tileCounts, part.y * tileCounts, tileSize, tileSize)
    }

    snakeParts.push(new SnakePart(headX, headY));
    if (snakeParts.length > tailLength){
        snakeParts.shift();
    }

    while (snakeParts.length > tailLength){
        snakeParts.shift();
    }




}

function changeSnakePosition(){

    headX = headX + xvelocity // As velocidades são definida pelas setas.
    headY = headY + yvelocity


}

function drawApple(){

    context.fillStyle = 'red'
    context.fillRect(appleX*tileCounts, appleY*tileCounts, tileSize, tileSize)
    
}

function checkAppleCollision(){

    if(appleX == headX && appleY == headY){

        appleX = Math.floor(Math.random() * tileCounts); // Quando a cobra comer a maça, uma nova posição X será sorteada.
        appleY = Math.floor(Math.random() * tileCounts);
        tailLength++;
        score++;
        gulpSound.play();
    }
    
}

document.body.addEventListener('keydown', keyDown);

function keyDown(event){

    if(event.keyCode == 38){ //up
        if(yvelocity == 1) // Retorno de sinal contrário para que a cobra não volte na mesma direção, em cima do próprio corpo.
            return;
        yvelocity = -1 // Positivo é de cima para baixo
        xvelocity = 0
    }
    if(event.keyCode == 40){ // down
        if(yvelocity == -1)
            return;
        yvelocity = 1
        xvelocity = 0
    }
    if(event.keyCode == 37){ //left
        if(xvelocity == 1)
            return;
        yvelocity = 0
        xvelocity = -1
    }
    if(event.keyCode == 39){ //right
        if(xvelocity == -1)
            return;
        yvelocity = 0
        xvelocity = 1
    }


}


drawGame();
