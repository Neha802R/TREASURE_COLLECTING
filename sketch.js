//creating variables
var path,boy,cash,diamonds,jwellery,sword;
var pathImg,boyImg,cashImg,diamondsImg,jwelleryImg,swordImg;
var treasureCollection = 0;
var cashG,diamondsG,jwelleryG,swordGroup,gameOverImg;
var coinSound,gameOverSound;

//Game States
var PLAY=1;
var END=0;
var gameState=1;

function preload(){
  //loading all the necessary animation , sounds and images
  pathImg = loadImage("Road.png");
  boyImg = loadAnimation("Runner-1.png","Runner-2.png");
  cashImg = loadImage("cash.png");
  diamondsImg = loadImage("diamonds.png");
  jwelleryImg = loadImage("jwell.png");
  swordImg = loadImage("sword.png");
  endImg =loadAnimation("gameOver.png");
  gameOverImg = loadImage("PngItem_214429.png");
  coinSound = loadSound("coin-drop-4 (1).mp3");
  gameOverSound = loadSound("mixkit-sad-game-over-trombone-471.wav");
}

function setup(){
  
  createCanvas(windowWidth,windowHeight);
// Moving background
path=createSprite(width/2,200);
path.addImage(pathImg);
path.velocityY = 5;


//creating boy running
boy = createSprite(width/2,height-20,20,20);
boy.addAnimation("SahilRunning",boyImg);
boy.scale=0.08;
boy.velocityY = 5;
  
  //creating groups
cashG=new Group();
diamondsG=new Group();
jwelleryG=new Group();
swordGroup=new Group();

}

function draw() {
  background(0);
  
  //creating game over image
  gameOver = createSprite(width/2,height/2);
  gameOver.addImage(gameOverImg);
  gameOver.scale=0.3;

  if(gameState===PLAY){
    
//telling my computer to don't display game over in playState
    gameOver.visible = false;
    
   boy.x = mouseX;

       //code to reset the background
  if(path.y > height){
    path.y = height/2;
  }
  
    createCash();
    createDiamonds();
    createJwellery();
    createSword();

    //if the boy touches cash , diamonds , jwellery increase my score , play the coin sound and destroy the cash image
    if (cashG.isTouching(boy)) {
      cashG.destroyEach();
      treasureCollection = treasureCollection+50;
      coinSound.play();
    }
    else if (diamondsG.isTouching(boy)) {
      diamondsG.destroyEach();
      treasureCollection = treasureCollection+100;
      coinSound.play();

      
    }else if(jwelleryG.isTouching(boy)) {
      jwelleryG.destroyEach();
      treasureCollection = treasureCollection+150;
      coinSound.play();
      
    }
    //if the boy touches sword end the game by destroying all the groups , play game over sound and make all the sprite's velocity 0
    else{
      if(swordGroup.isTouching(boy)) {
        swordGroup.destroyEach();
        swordGroup.destroyEach();
        jwelleryG.destroyEach();
        diamondsG.destroyEach();
        cashG.destroyEach();
        boy.destroy();
        gameOver.visible = true;
        path.velocityY = 0;
        gameOverSound.play();
        gameState = END;
    }
  }
    }
    else if(gameState === END){
      cashG.setVelocityYEach(0);
      diamondsG.setVelocityYEach(0);
      jwelleryG.setVelocityYEach(0);
      swordGroup.setVelocityYEach(0);
    }
    
  //make my edges strong
  edges= createEdgeSprites();
  
  // make the boy collide with the edges
  boy.collide(edges);
  
 
  
  drawSprites();
  //make my score visible in the preview
  textSize(20);
  fill("blue");
  text("Treasure: "+ treasureCollection,width/2,30);

}

function createCash() {
  //creating cash
  if (World.frameCount % 200 == 0) {
  var cash = createSprite(Math.round(random(50, width-50),40, 10, 10));
  cash.addImage(cashImg);
  cash.scale=0.12;
  cash.velocityY = 5;
  cash.lifetime = 150;
  cashG.add(cash);
  }
}

function createDiamonds() {
  //creating diamods
  if (World.frameCount % 320 == 0) {
  var diamonds = createSprite(Math.round(random(50, width-50),40, 10, 10));
  diamonds.addImage(diamondsImg);
  diamonds.scale=0.03;
  diamonds.velocityY = 5;
  diamonds.lifetime = 150;
  diamondsG.add(diamonds);
}
}

function createJwellery() {
 // creating jwellery
  if (World.frameCount % 410 == 0) {
  var jwellery = createSprite(Math.round(random(50, width-50),40, 10, 10));
  jwellery.addImage(jwelleryImg);
  jwellery.scale=0.13;
  jwellery.velocityY = 5;
  jwellery.lifetime = 150;
  jwelleryG.add(jwellery);
  }
}

function createSword(){
  //creating sword
  if (World.frameCount % 530 == 0) {
  var sword = createSprite(Math.round(random(50, width-50),40, 10, 10));
  sword.addImage(swordImg);
  sword.scale=0.1;
  sword.velocityY = 5;
  sword.lifetime = 150;
  swordGroup.add(sword);
  }
}