var tower, towerImage;
var ghost, ghIm;
var door, dIm;
var cl, clIm;
var invi;
var dG, cG, iG;
var PLAY=1;
var END=0;
var gamestate=PLAY;
var sound;

function preload() {
  towerImage = loadImage("tower.png");
  ghIm = loadImage("ghost-jumping.png");
  dIm = loadImage("door.png");
  clIm = loadImage("climber.png");
  sound=loadSound('spooky.wav');
}

function setup() {
  createCanvas(600, 600);
  tower = createSprite(300, 300, 600, 600);
  tower.addImage("ti", towerImage);
  tower.velocityY = 5;
  ghost = createSprite(300, 300, 20, 20);
  ghost.addImage(ghIm);
  ghost.scale = 0.3;
  ghost.velocityY = 3;
  dG = new Group();
  cG = new Group();
  iG = new Group();
}

function draw() {
  
  background("white");
  sound.loop();
  if(gamestate===PLAY){
    if (tower.y > 600) {
    tower.y = 300;
  }
  if (keyDown("space") && ghost.y > 50) {
    ghost.velocityY = -6;

  }
  if (keyDown("left")) {
    ghost.x = ghost.x - 3;
  }
  if (keyDown("right")) {
    ghost.x = ghost.x + 3;
  }
  ghost.velocityY = ghost.velocityY + 0.8;
  doorSpawn();
  drawSprites();
if(ghost.y>600){
 gamestate=END; 
}
    if(iG.isTouching(ghost)){
     gamestate=END;
    }
    if(ghost.isTouching(cG)){
      ghost.velocityY=0;
      
    }
  }
  else if(gamestate===END){
     background("black");
    stroke("white");
    fill("white");
    textSize(40);
    text("Game over!!",300,300);
    
   
    
  }
  

}

function doorSpawn() {
  if (frameCount % 200 === 0) {
    door = createSprite(Math.round(random(150, 450)), 0, 30, 30);
    door.addImage(dIm);
    door.velocityY = 3;
    door.lifetime = 200;
    dG.add(door);
    

    cl = createSprite(door.x, 50, 20, 20);
    cl.addImage(clIm);
    cl.velocityY = 3;
    cl.lifetime = 200;
    cG.add(cl);
    
    invi = createSprite(door.x, 70, 60, 10);
    invi.velocityY = 3;
    invi.visible = false;
    invi.lifetime = 200;
    iG.add(invi);
    
    door.depth = ghost.depth;
    ghost.depth = ghost.depth + 1;

    cl.depth = ghost.depth;
    ghost.depth = ghost.depth + 1
  }
}