
const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');


canvas.width = window.innerWidth
canvas.height = window.innerHeight



const clear = () => {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
}

const stop = () => {
    window.cancelAnimationFrame(requestId)
  }
  
  let startBackgroundImg = new Image();

const start = () => {
  startBackgroundImg.src = 'images/background.jpg'
  startBackgroundImg.onload = () => {
  ctx.drawImage(startBackgroundImg,0,0,canvas.width,canvas.height)}
  
}

let winImg = new Image();
let gameOverImg = new Image();

let audioElement = new Audio();
audioElement.src = './audio/2-08-The-Beast.mp3';
window.onload = () => {
  audioElement.autoplay = true;
  audioElement.play()
}
  console.log(audioElement);


let belaImg = new Image();

class Heroes {
    constructor(width, height, color, x, y) {
        this.width = width;
        this.height = height;
        this.color = color;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = 0;
    }
    
    updateBela() {
        
        belaImg.src = './images/Bela.png';
        ctx.drawImage(belaImg,this.x, this.y,this.width,this.height)
    
      }
    
    newPos() {
        this.x += this.speedX;
        this.y += this.speedY;
    }
    
    left() {
        return this.x;
      }
    
      right() {
        return this.x + this.width;
      }
    
      top() {
        return this.y;
      }
    
      bottom() {
        return this.y + this.height;
      }
    
      crashWith(obstacle) {
        return !(
          this.bottom() < obstacle.top() ||
          this.top() > obstacle.bottom() ||
          this.right() < obstacle.left() ||
          this.left() > obstacle.right()
        );
      }

      collect(obj) {
        return !(
          this.bottom() < obj.top() ||
          this.top() > obj.bottom() ||
          this.right() < obj.left() ||
          this.left() > obj.right()
        );
      }
}


let bela = new Heroes(100,100,'yellow',40,canvas.height*0.80) 


//Bela ande em todas as direcoes


document.onkeydown = function(e) {
    switch (e.keyCode) {
      case 38: // up arrow
      if (bela.y > 400) {
        bela.speedY -= 2
      }else {
        bela.speedY = 0;
      }
        break;
      case 40: // down arrow
      if (bela.y + bela.height < canvas.height) {
      bela.speedY += 2;
      } else {
      bela.speedY = 0;
      }
        break;
      case 37: // left arrow
      if (bela.x > 0) {
        bela.speedX -= 2;
      } else {
        bela.speedX = 0;
      }
        break;
      case 39: // right arrow
      if (bela.x + bela.width < canvas.width){
        bela.speedX += 2;
      } else {
        bela.speedX = 0;
      }
      break;
      case 32: //start
      if (frames === 0) {
        upDateGameArea();

      }

      if (restart) {
        restart = false
        // villainsArry.pop()
        villainsArry.splice(0,villainsArry.length)
        frames = 0;
        bela.x = 0;
        objectsCollected.splice(0,objectsCollected.length)
        objectsArr.forEach(function(item) {
          let newY = canvas.height*(Math.random()*(0.9 - 0.75) + 0.75)
          item.y = newY
        } ) 
        console.log(objectsArr.length)
        upDateGameArea();
      }
      break;
      
    }
  };

  document.onkeyup = function(e) {
    bela.speedX = 0;
    bela.speedY = 0;
  };

  
  //criar coiotes
  
  
  
  class Villains {
      constructor(x, y, width,height, speed){
        this.width = width;
        this.height = height;
        this.speed = speed;
        this.x = x;
        this.y = y;
        this.speedX = 0;
        this.speedY = -3;  
     }
        newPos = function() {
        this.y += this.speed;
        }
                
        left() {
        return this.x;
        }
                
        right() {
        return this.x + this.width;
        }
                
        top() {
        return this.y;
        }
                
        bottom() {
        return this.y + this.height;
        }
        
        updateCoyote() {
        let coyoteImg = new Image();
        coyoteImg.src = './images/wolf.png';
        ctx.drawImage(coyoteImg,this.x, this.y,this.width,this.height)
                    
        }
        
    }
    let villainsArry = []
    
    
    
    let frames = 0;
    
    const coyoteRun = () => {
      if (frames % 250 === 0) {
        villainsArry.push(new Villains(canvas.width,canvas.height*(Math.random()*(0.9 - 0.75) + 0.75),100,50,7))
      }


    villainsArry.forEach(function(e,idx) {
        e.x -= e.speed

    return e.updateCoyote()
  })
}


let cupImg = new Image();
let teaPotImg = new Image();
let fireImg = new Image();
let clockImg = new Image();

class Object  {
  constructor(x,y,width,height) {
    this.x = x;
    this.y = y;
    this.width = width;
    this.height = height;
  }
  left() {
    return this.x;
  }
  
  right() {
    return this.x + this.width;
  }
  
  top() {
    return this.y;
  }
  
  bottom() {
    return this.y + this.height;
  }
  
  upDateCup() {
    cupImg.src = './images/cup.png';
    ctx.drawImage(cupImg,this.x, this.y,this.width,this.height)
}

  updateTeapot() {
    teaPotImg.src = './images/teaPot.png';
    ctx.drawImage(teaPotImg,this.x,this.y,this.width,this.height)
  }

  upDateFire() {
    fireImg.src = './images/fire.png';
    ctx.drawImage(fireImg,this.x,this.y,this.width,this.height)
  }

  updateClock() {
    clockImg.src = './images/clock.png';
    ctx.drawImage(clockImg,this.x,this.y,this.width,this.height)
  }
}

let cup = new Object(300,canvas.height*(Math.random()*(0.9 - 0.75) + 0.75),40,40)
let teaPot = new Object(600,canvas.height*(Math.random()*(0.9 - 0.75) + 0.75),60,60)
let fire = new Object(900, canvas.height*(Math.random()*(0.9 - 0.75) + 0.75),70,70)
let clock = new Object(1200, canvas.height*(Math.random()*(0.9 - 0.75) + 0.75),80,80)

let objectsArr = []

objectsArr.push(cup,teaPot,fire,clock)

let objectsCollected = []
let restart = false

function checkGameOver() {
  let crashed = villainsArry.some(function(obstacle) {
    return bela.crashWith(obstacle);
  });
  
  if (crashed) {
    restart = true
    window.cancelAnimationFrame(requestId)

    gameOverImg.src = './images/gameOver.png'
    gameOverImg.onload = () => {
      
    ctx.drawImage(gameOverImg,350,100,760,311)
    }

    //tela preta
    ctx.fillStyle = 'rgba(0, 0, 0, 0.85)';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // texto
    ctx.font = "70px serif";
    ctx.fillStyle = "rgb(181,195,189)";
    ctx.fillText("Game Over!", 550, 490);

    ctx.font = "40px serif";
    ctx.fillStyle = "rgb(166,147,141)"
    ctx.fillText("Try again", 660, 550);

    ctx.font = "20px serif";
    ctx.fillStyle = "rrgb(166,147,141)";
    ctx.fillText("Press space", 695, 580);
  }
}

function collectObjects() {
  let collectAll = objectsArr.forEach(e => {
    if (bela.collect(e)) { 
      e.y = 10000
      objectsCollected.push(e)
    
    }
  });
}



function checkWin() {
  if (bela.x > 1000 && bela.y < 400 && objectsCollected.length === 4) {
    window.cancelAnimationFrame(requestId)
    restart = true
    winImg.src = './images/win.jpg'
    winImg.onload = () => {
      
    ctx.drawImage(winImg,400,100,640,360)
  }
    ctx.fillStyle = 'rgb(234,154,1, 0.5)';
    ctx.fillRect(0, 0, canvas.width, canvas.height)
    // texto
    ctx.font = "50px serif";
    ctx.fillStyle = "rgb(48,93,136)";
    ctx.fillText('All are saved!', 580, 530);
    
    ctx.font = "25px serif";
    ctx.fillStyle = "rgb(48,93,136)";
    ctx.fillText('Press space for play again', 590, 570);
    
  }
}




const upDateGameArea = () => {
    clear()
    audioElement.play()
    fire.upDateFire()
    teaPot.updateTeapot()
    cup.upDateCup()
    clock.updateClock()
    bela.newPos()
    bela.updateBela()
    coyoteRun()
    collectObjects()
    requestId = requestAnimationFrame(upDateGameArea)
    checkGameOver()
    checkWin()
    frames += 1

}

start()

// let requestId = requestAnimationFrame(upDateGameArea)




    
    //desenhar as petalas e definir a localizacao
    //fazer as petalas cairem em determinado tempo
    //definir gameover com a queda da ultima petala
    

