
var monkey , monkey_running,monkey_collide;
var banana ,bananaImage, obstacle, obstacleImage;
var FoodGroup, obstacleGroup;
var ground, groundImage;
var survivalTime = 0;
var PLAY = 1;
var END = 0;
var gameState = PLAY;
var score = 0;
var invisibleGround;

function preload(){
  
  
  monkey_running =            loadAnimation("sprite_0.png","sprite_1.png","sprite_2.png","sprite_3.png","sprite_4.png","sprite_5.png","sprite_6.png","sprite_7.png","sprite_8.png")
  
  monkey_collide = loadAnimation("sprite_0.png");
  
  bananaImage = loadImage("banana.png");
  obstacleImage = loadImage("obstacle.png");
 
  groundImage = loadImage("ground.png");
}



function setup() {
  
  createCanvas(400, 400);
  
  monkey = createSprite(140, 345, 20, 20);
  monkey.addAnimation("running", monkey_running);
  monkey.addAnimation("collide", monkey_collide)
  monkey.scale = 0.1;
  
  ground = createSprite(220, 355, 10, 20);
  ground.addImage(groundImage);
  ground.x = ground.width/2;
  ground.velocityX = -(4 + 3*survivalTime/30);
  ground.scale=0.9
  
  bananaGroup = new Group();
  obstacleGroup = new Group();
  
  monkey.setCollider("rectangle",0,0,monkey.width,monkey.height);
  //monkey.debug = true
  
  
  invisibleGround = createSprite(200,380,400,10);
  invisibleGround.visible = false;
  

}


function draw() {
  
  background(220);
   
  stroke("black");
  textSize(20);
  fill("black");
  text("Survival Time: " + survivalTime, 15,30);
  
    if(monkey.y < 220){
    monkey.velocityY = 8;
    } 
  
     ground.depth = monkey.depth;
     monkey.depth = monkey.depth + 1;
  
     //ground.depth = obstacleGroup.depth;
     obstacleGroup.depth = obstacleGroup .depth + 1;


if(gameState === PLAY){
  
  spawnBanana();
  spawnObstacle();
  monkey.collide(invisibleGround);
  
  survivalTime = Math.ceil(frameCount/frameRate())
  
 monkey.collide(invisibleGround);
  
     if(keyDown("space") && monkey.y >= 339) {
     monkey.velocityY = -9;
      } 
  
    if (ground.x < 0){
    ground.x = ground.width/2;
    }  
    
    if(monkey.isTouching(bananaGroup)){
    bananaGroup.destroyEach();
    }
    
    if(monkey.isTouching(obstacleGroup)){
    gameState = END;
    }
  }
  
  
else if(gameState===END){
  
    ground.velocityX = 0; 
    monkey.changeAnimation("collided", monkey_collide);
    monkey.velocityY = 0;
  
 obstacleGroup.setVelocityXEach(0);
 bananaGroup.setVelocityXEach(0); 
  
    obstacleGroup.setLifetimeEach(-1);
    bananaGroup.setLifetimeEach(-1);
  
  }
  
   

  drawSprites();
}


function spawnBanana() {
  if (frameCount % 160 === 0) {
    var banana = createSprite(350,340,40,10);
    banana.y = Math.round(random(230,310));
    banana.addImage(bananaImage);
    banana.scale = 0.1;
    banana.velocityX = -3;
    
     //assign lifetime to the variable
    banana.lifetime = 200;
    
    //adjust the depth
    banana.depth = monkey.depth;
    banana.depth = banana.depth + 1;
    
    //add each cloud to the group
    bananaGroup.add(banana);
  }
  
}

function spawnObstacle() {
  if (frameCount % 300 === 0) {
    var obstacle = createSprite(350,350,40,10);
    obstacle.scale = Math.random(0.1,2);
    obstacle.addImage(obstacleImage);
    obstacle.scale = 0.15;
    obstacle.velocityX = -(3 + 3*survivalTime/30);
    
     //assign lifetime to the variable
    obstacle.lifetime = 200;
    
  obstacle.setCollider("circle",0,0,200);
  //obstacle.debug = true;
    
    //add each cloud to the group
    obstacleGroup.add(obstacle);
  }
  
}




