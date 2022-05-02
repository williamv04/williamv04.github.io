let size = 20;

let audio = new Audio("sniggurd sound.wav");

let snake = [
  {
  x: 240,
  y: 240
  },
  {
  x: 240 + size,
  y: 240
  },
  {
  x: 240 + size * 2,
  y: 240
  },
  {
  x: 240 + size * 3,
  y: 240
  }
];   

const eatingSound = new Audio("Sniggurd sound.wav");
const deathSound = new Audio("4tniteDeath.mp3");

const canvas = document.getElementById("brett");
const ctx = canvas.getContext("2d");
const img = document.getElementById("bilde");
const mat = document.getElementById("mat");

ctx.shadowOffsetX = 3;
ctx.shadowOffsetY = 3;
ctx.shadowBlur = 10;
ctx.shadowColor = "black";

let scoreEl = document.querySelector("h1");
let score = 0;
let highScore = 0;
let highScoreEl = document.querySelector("h2");


let dx = 0;
let dy = 0;

window.onload = function() {
  main();       
  gen_food();       
};

const haarEl = document.getElementById("hår");
let hodet = 1;
let retning = 0;

function toRadians(degree){
  return degree * (Math.PI/180);
}

function snakePart(snakePart){
  if (hodet == 1){
    var X = snakePart.x;
    var Y = snakePart.y;
    if(retning == 90){
      Y -= size;
    }
    else if(retning == 180){
      X -= size;
      Y -= size;
    }
    else if(retning == 270){
      X -= size;
    }

    ctx.translate(snakePart.x, snakePart.y)
    ctx.rotate(toRadians(retning));
    ctx.translate(-snakePart.x, -snakePart.y);
    ctx.drawImage(img, X, Y, size, size);
    ctx.translate(snakePart.x, snakePart.y)
    ctx.rotate(toRadians(-retning));
    ctx.translate(-snakePart.x, -snakePart.y);
    hodet = 0;
  }
  else{
    ctx.drawImage(haarEl, snakePart.x, snakePart.y, size, size);
  }
}

function draw_snake(){
  snake.forEach(snakePart);
}

function move_snake(){
  const head = {x: snake[0].x + dx, y: snake[0].y + dy};
  snake.unshift(head);
  const has_eaten_food = snake[0].x === food_x && snake[0].y === food_y;
  if (has_eaten_food) {
    // Genererer ny mat
    gen_food();
    // Øker Score'en
    score++
    scoreEl.innerText = "Score: " + score;
    // Spiller av "Spise" lyd
    eatingSound.play();
  } 
  else {
    // Fjerner siste del av slangen
    snake.pop();
  }
}

document.addEventListener("keydown", change_direction)

let changingSnake = 0;

function change_direction(event) 
{  
  if (changingSnake == 1){
    return;
  }

  const LEFT_KEY = 37;
  const RIGHT_KEY = 39;
  const UP_KEY = 38;
  const DOWN_KEY = 40;

  const keyPressed = event.keyCode;
  const goingUp = dy === -size;
  const goingDown = dy === size;
  const goingRight = dx === size;  
  const goingLeft = dx === -size;

  if ((keyPressed === LEFT_KEY || event.key == "a") && !goingRight){  
    retning = 90; 
    dx = -size;
    dy = 0;  
    changingSnake = 1;
  }

  if ((keyPressed === UP_KEY || event.key == "w") && !goingDown){    
    retning = 180;
    dx = 0;
    dy = -size;
    changingSnake = 1;
  }

  if ((keyPressed === RIGHT_KEY || event.key == "d" )&& !goingLeft){    
    retning = 270;
    dx = size;
    dy = 0;
    changingSnake = 1;
  }

  if ((keyPressed === DOWN_KEY || event.key == "s") && !goingUp){    
    retning = 0;
    dx = 0;
    dy = size;
    changingSnake = 1;
  }
}

function has_game_ended(){  
  for (let i = 4; i < snake.length; i++){    
    const has_collided = snake[i].x === snake[0].x && snake[i].y === snake[0].y
    if (has_collided){
      if(score > highScore){
        highScore = score;
        highScoreEl.innerText = "High Score: " + highScore;
      }
      return true
    } 
  }
  const hitLeftWall = snake[0].x < 0;  
  const hitRightWall = snake[0].x > canvas.width - size;
  const hitToptWall = snake[0].y < 0;
  const hitBottomWall = snake[0].y > canvas.height - size;

  return hitLeftWall ||  hitRightWall || hitToptWall || hitBottomWall
}

function random_food(min, max){  
  return Math.round((Math.random() * (max-min) + min) / size) * size;
}

function gen_food(){  
  food_x = random_food(0, canvas.width - size);
  food_y = random_food(0, canvas.height - size);
  snake.forEach(function has_snake_eaten_food(part){
    const has_eaten = part.x == food_x && part.y == food_y;
    if (has_eaten) gen_food();
  });
}

function drawFood(){
  ctx.drawImage(mat, food_x, food_y, size, size);
}

let myTimeout = 0;

function main(){

  if (has_game_ended()){
    red_blink();
    deathSound.play();
    return;
  }

  myTimeout = setTimeout(function onTick(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    drawFood();
    move_snake();
    draw_snake();
    hodet = 1;
    if(score > highScore){
        highScore = score;
        highScoreEl.innerText = "High Score: " + highScore;
    }
    changingSnake = 0;
    main();
  }, 100);
}

function reset(){
  snake = [
  {
  x: 240,
  y: 240
  },
  {
  x: 240 + size,
  y: 240
  },
  {
  x: 240 + size * 2,
  y: 240
  },
  {
  x: 240 + size * 3,
  y: 240
  }
  ];   

  score = 0;
  scoreEl.innerText = "Score: " + score;
  dx = 0;
  dy = 0;

  canvas.style.color = "black";
  clearTimeout(myTimeout)
  main();
}

let buttonEl = document.querySelector("button");
buttonEl.addEventListener("click", reset);
document.addEventListener("keypress", function (e){
  if (e.key == "r"){
    reset();
  }
})

function red_blink(){
    canvas.style.color = "red";
    for(let i=1; i<5; i++){
      if(i%2 == 0){
        setTimeout(function (){canvas.style.color = "red"}, 100*i);
      }
      else{
        setTimeout(function (){canvas.style.color = "black"}, 100*i);
      }
    }
}

let hjelpV = 1;
let hjelpEl = document.getElementById("hjelp");

function hjelp(){
  if(hjelpV == 0){
    hjelpEl.style.display = "none";
    hjelpV = 1;
  }
  else{
    hjelpEl.style.display = "inline-block";
    hjelpV = 0;
  }
}

let closeEl = document.getElementById("close");
closeEl.addEventListener("click", hjelp);

document.addEventListener("keypress", function (e){
  if(e.key == "h"){
    hjelp();
  }
})