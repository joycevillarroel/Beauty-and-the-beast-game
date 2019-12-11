
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
        // console.log(belaImg.src)
        
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
        bela.speedY -= 4;
        break;
      case 40: // down arrow
        bela.speedY += 4;
        break;
      case 37: // left arrow
        bela.speedX -= 4;
        break;
      case 39: // right arrow
        bela.speedX += 4;
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
    
    
    // let coyote1 = new Villains(canvas.width,canvas.height*0.8,100,50,3)
    // let coyote2 = new Villains(canvas.width,canvas.height*0.75,100,50,5)
    // let coyote3 = new Villains(canvas.width,canvas.height*0.9,100,50,7)
    // let coyote4 = new Villains(canvas.width,canvas.height*0.8,100,50,4)
    // let coyote5 = new Villains(canvas.width,canvas.height*0.85,100,50,2)
 
    
    // villainsArry.push(coyote1,coyote2,coyote3,coyote4,coyote5)
    
    let frames = 0;
    
    const coyoteRun = () => {
      if (frames % 120 === 0) {
        villainsArry.push(new Villains(canvas.width,canvas.height*(Math.random()*(0.9 - 0.75) + 0.75),100,50,7))
      }


    villainsArry.forEach(function(e,idx) {
        e.x -= e.speed
  //       // if (ctx.frames % 200 === 0) {
        
  //   // }
    return e.updateCoyote()
  })
}


let cupImg = new Image();
let teaPotImg = new Image();
let fireImg = new Image();

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
    teaPotImg.src = './images/teaPot.jpg';
    ctx.drawImage(teaPotImg,this.x,this.y,this.width,this.height)
  }

  upDateFire() {
    fireImg.src = './images/fire.png';
    ctx.drawImage(fireImg,this.x,this.y,this.width,this.height)
  }

}

let cup = new Object(300,canvas.height*0.8,40,40)
let teaPot = new Object(600,canvas.height*0.9,60,60)
let fire = new Object(900, canvas.height*0.7,70,70)


let objectsArr = []

objectsArr.push(cup,teaPot,fire)

let objectsCollected = []

function checkGameOver() {
  let crashed = villainsArry.some(function(obstacle) {
    return bela.crashWith(obstacle);
  });
  
  if (crashed) {
    window.cancelAnimationFrame(requestId)
  }
}

function collectObjects() {
  let collectAll = objectsArr.forEach(e => {
    if (bela.collect(e)) { 
      e.x = 10000
      objectsCollected.push(e)
    
    }
  });
}


function checkWin() {
  if (bela.x > 970 && bela.y < 200) {
      console.log('win')
}
}


const upDateGameArea = () => {
    clear()
    // upDateCastle()
    fire.upDateFire()
    teaPot.updateTeapot()
    cup.upDateCup()
    bela.newPos()
    bela.updateBela()
    coyoteRun()
    collectObjects()
    requestId = requestAnimationFrame(upDateGameArea)
    checkGameOver()
    checkWin()
    frames += 1

}


let requestId = requestAnimationFrame(upDateGameArea)




    
    //fazer os coiotes atravessem aleatoriamente de um lado para o outro 
    //definir bordas do canvas
    //desenhar as petalas e definir a localizacao
    //fazer as petalas cairem em determinado tempo
    //definir gameover com a queda da ultima petala
    

