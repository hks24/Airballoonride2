var balloon,balloonImg;
var database;
var balloonPosition;

function preload(){
balloonImg = loadAnimation("pro-C35+images/pro-C35 images/Hot Air Ballon-02.png","pro-C35+images/pro-C35 images/Hot Air Ballon-03.png","pro-C35+images/pro-C35 images/Hot Air Ballon-04.png")
backgroundImg = loadImage("pro-C35+images/pro-C35 images/Hot Air Ballon-01.png");
}

function setup() {
  createCanvas(800,500);

 balloon = createSprite(400, 250, 10, 10);
 balloon.addAnimation("colorChange",balloonImg);
 balloon.scale = 0.5;

 database = firebase.database();
 balloonPosition = database.ref("balloon/position");
 balloonPosition.on("value",readPosition,showError);
 
 

}

function draw() {
  background(backgroundImg); 
  
  textSize(15);
  stroke("black");
  fill("black");
  text("Use Arrow Keys To Move The Hot Air Balloon",20,20);

  if(keyDown(UP_ARROW)){
    updatePosition(0,-5);
  
  }

  if(keyDown(DOWN_ARROW)){
    updatePosition(0,5);
   
  }

  if(keyDown(LEFT_ARROW)){
    updatePosition(-5,0);
   
  }

  if(keyDown(RIGHT_ARROW)){
    updatePosition(5,-5);
 
  }

  drawSprites();
}

function updatePosition(x,y){
  database.ref("balloon/position").set({
    'x' : position.x + x,
    'y' : position.y + y
  })
}

function readPosition(data){
  position = data.val();
  balloon.x = position.x;
  balloon.y = position.y;
}

function showError(){
  console.log("error in writing to the database");
}