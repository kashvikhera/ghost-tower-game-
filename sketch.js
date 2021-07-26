var ghost, ghostImg,towerImg, tower, climberImg, climber, door, doorImg, invisibleBlock

var climberGroup, doorGroup, invisibleBlockGroup

var spookySound

var gameState = "play";

function preload(){
  
  climberImg = loadImage("climber.png")
  doorImg = loadImage("door.png")
  towerImg = loadImage("tower.png")
  ghostImg = loadImage("ghost-standing.png")
  spookySound = loadSound("spooky.wav")
  
}

function setup(){
  
  createCanvas  (600,600);
  
  spookySound.play();
  
  tower = createSprite(300,300)
  tower.addImage(towerImg)
  tower.velocityY = 1;
  
  ghost = createSprite(300,300)
  ghost.addImage(ghostImg)
  ghost.scale = 0.5;
  
  doorGroup = new Group()
  climberGroup = new Group()
  invisibleBlockGroup = new Group()
}

function draw(){
  background(0);
  
  if(gameState === "play"){
    
    if(tower.y>400){  
    tower.y = 300 
     }
    
    if(keyDown("left")){
      ghost.x = ghost.x - 3
    }
    
    if(keyDown("right")){
      ghost.x = ghost.x + 3
    }
    
    if(keyDown("space")){
      ghost.velocityY = -10
    }
    
    ghost.velocityY = ghost.velocityY+0.8
    
    
    if(invisibleBlockGroup.isTouching(ghost)|| ghost.y>600){
      
      ghost.destroy()
      gameState = "end"
       }
    
    if (climberGroup.isTouching(ghost)){
      ghost.velocityY = 0
        }
    spawnDoor();
  drawSprites();
  }
  
  
  if(gameState === "end"){
    stroke("yellow")
    fill("yellow")
    textSize(40)
    text("GAME OVER",180,330)
    
  }
  
 
}

function spawnDoor(){
  if(frameCount%240===0){
    door = createSprite(200,100)
    climber = createSprite(200,150)
    invisibleBlock = createSprite(200,climber.y+5,climber.width,2)
    
   
    invisibleBlock.debug = true;
    
    door.velocityY= 1
    climber.velocityY = 1
    invisibleBlock.velocityY = 1
    
    door.lifetime = 800
    climber.lifetime = 800
    invisibleBlock.lifetime = 800
    
    door.addImage(doorImg)
    climber.addImage(climberImg)
    
    door.x = Math.round(random(120,400))
    climber.x = door.x
    invisibleBlock.x = door.x
    
    ghost.depth = door.depth+1
    ghost.depth = climber.depth +1
    ghost.depth = invisibleBlock.depth + 1
    
    doorGroup.add(door)
    climberGroup.add(climber)
    invisibleBlockGroup.add(invisibleBlock)
     }
}