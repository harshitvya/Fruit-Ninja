var fruit1, fruit2, fruit3, fruit4, bowimg, f, cfruit1, cfruit2, cfruit3, cfruit4, bomb, bombimg,go,goimg,r,rimg;
var score = 0;
var sword, simg;
var PLAY = 1;
var END = 0;
var gamestate = PLAY;
var ssound,bsound;

function preload() {
  bombimg = loadImage("bomb.png");
  simg = loadImage("simg.png");
  fruit1 = loadImage("apple.png");
  fruit2 = loadImage("melon.png");
  fruit3 = loadImage("lemon.png");
  fruit4 = loadImage("orange.png");
  cfruit1 = loadImage("cutapple.png");
  cfruit2 = loadImage("cutmelon.png");
  cfruit3 = loadImage("cutlemon.png");
  cfruit4 = loadImage("cutorange.png");
  goimg = loadImage("go.png");
  rimg = loadImage("r.png");
  ssound = loadSound("sword.mp3");
  bsound = loadSound("bomb.mp3");
}

function setup() {
  createCanvas(500, 500);

  sword = createSprite(450, 250, 20, 20);
  sword.addImage(simg);
  sword.scale = 0.1;

  bombg = new Group();
  fruitg = new Group();

  go = createSprite(245,250);
  go.addImage(goimg);
  go.scale = 0.6;
  r = createSprite(92,249);
  r.addImage(rimg);
  r.scale = 0.22;
  go.visible = false;
  r.visible = false;
}

function draw() {
  background("lightblue");
  textSize(40);
  fill(0);
  text("Score : " + score, 170, 40);

  if (gamestate === PLAY) {
    go.visible = false;
    r.visible = false;
    Fruit();
    Bomb();
    drawSprites();
    
    sword.x = mouseX;
    sword.y = mouseY;
    if (fruitg.isTouching(sword)) {
      fruitg.destroyEach();
      ssound.play();
      score++;
    }
    if (bombg.isTouching(sword)) {
      gamestate = END;
      bsound.play();
    }
    
  }
  
  if (gamestate === END) {
    fruitg.setVelocityYEach(0);
    bombg.setVelocityYEach(0);
    go.visible = true;
    r.visible = true;
    text("Game Over !!",140,250)
    if(mousePressedOver(r)){
      gameState = PLAY;
    }
  }
  


}

function Bomb() {
  if (frameCount % 200 === 0) {
    bomb = createSprite(random(0, 500), 510, 20, 20);
    bomb.addImage(bombimg);
    bombg.add(bomb);
    bomb.velocityY = (-5+score/10);
    bomb.lifetime = 250;
    bomb.scale = 0.04;
  }
}

function Fruit() {
  if (frameCount % 60 === 0) {
    var f = createSprite(random(0, 500), 510, 20, 20);
    f.velocityY = -(5+score/10);


    // //generate random obstacles
    var rand = Math.round(random(1, 4));
    switch (rand) {
      case 1:
        f.addImage(fruit1);
        break;
      case 2:
        f.addImage(fruit2);
        break;
      case 3:
        f.addImage(fruit3);
        break;
      case 4:
        f.addImage(fruit4);
        break;
      default:
        break;
    }

    //assign scale and lifetime to the obstacle           
    f.scale = 0.22;
    f.lifetime = 300;

    //adding obstacles to the group
    fruitg.add(f);
  }
}