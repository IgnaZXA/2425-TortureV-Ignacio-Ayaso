import globals from "./globals.js";
import {Game, State, SpriteID, GRAVITY, Collision, TimerIndex, MoneyStaticPos} from "./constants.js";
// import detectCollisions from "./collisions.js";
import Sprite from "./Sprite.js";




export default function update() {

  switch (globals.gameState){
    case Game.LOADING:
      console.log("Loading assets...");
    break;

    case Game.PLAYING:
      playGame();
    break;

    // case Game.OVER:
    //   playGameOver();
    // break;

    default:
        console.error("Error: Game State Unvalid");
  }
}


///////////////////////////////////////////////////////////////////////////////
//  GAME STATE
///////////////////////////////////////////////////////////////////////////////

//Se procede a cargar el juego
function playGame(){
    updateSprites();

    //Colisiones
    // detectCollisions();

    if(globals.player.isReloading){
      updateReloadTimer();
    }

    // updateTimers();
    
    //Player Life
    updateLife();
}

function updateSprites(){
    for (let i = 0; i < globals.sprites.length; i++) {
        const sprite = globals.sprites[i];
        updateSprite(sprite);
    }
}


function updateSprite(sprite) {
    const type = sprite.id; 

    switch (type){
        // Caso del jugador
        case SpriteID.PLAYER:
            updatePlayer(sprite);
          break;

          case SpriteID.SPIDER:
            updateSpider(sprite);
          break;

          case SpriteID.MONEY:
            updateMoney(sprite);
          break;

          case SpriteID.LIFE:
            updateLife(sprite);
          break;

        // Otros
        default:
            console.error("Error: SpriteID invalid");
            break;
    }



}


// Función que actualiza al player
function updatePlayer(sprite){
  // Reiniciar la velocidad en los ejes X e Y para que no se acumulen.
  
  if(globals.timers[TimerIndex.MOVEMENT_RELOAD].value === 0) {
    readKeyboardAndAssignState(sprite);
    globals.timers[TimerIndex.MOVEMENT_RELOAD].value = 1;
  }
  updateReloadTimer();

}



function updateSpider(sprite){

}

function updateMoney(sprite){
  let newPos;

  console.log("----------------------------------");
  console.log(sprite.xCell );
  console.log(globals.sprites[0].xCell );
  console.log(sprite.yCell );
  console.log(globals.sprites[0].yCell);

  if ( ( sprite.xCell === globals.sprites[0].xCell ) && ( sprite.yCell === globals.sprites[0].yCell ) ){
    let newIndex = Math.floor(Math.random() * 6 );

    console.log("Index" + newIndex);
    newPos = MoneyStaticPos[newIndex];

    sprite.xCell = newPos.XCELL;
    sprite.yCell = newPos.YCELL;

    globals.player.score
  }
}

//From Collisions between sprites tutorial
function updateLife(){
  for( let i = 0; i < globals.sprites.length; i++){
    const sprite = globals.sprites[i];

    if (sprite.isCollidingWithPlayer){
      // Si hay colisión reducimos la vida
      globals.life--;
    }
  }
}



// Timer
// function updateGameTime(){
//     //Incrementamos el contrador
//     globals.gameTime += globals.deltaTime;
// }



function updateReloadTimer(){
  // Contador que espera a acabar de contar (cuando llegue a cero) para que el player pueda lanzar otra cruz.


  // Incrementamos el contador de cambio de valor
  globals.timers[TimerIndex.MOVEMENT_RELOAD].timeChangeCounter += globals.deltaTime;

        // Si ha pasado el tiempo necesario, cambiamos el valor del timer
  if(globals.timers[TimerIndex.MOVEMENT_RELOAD].timeChangeCounter > globals.timers[TimerIndex.MOVEMENT_RELOAD].timeChangeValue){

    if(globals.timers[TimerIndex.MOVEMENT_RELOAD].value > 0){
      globals.timers[TimerIndex.MOVEMENT_RELOAD].value--;
    }
    
            // Reseteamos timeChangeCOunter
    globals.timers[TimerIndex.MOVEMENT_RELOAD].timeChangeCounter = 0;
  }

          
  if(globals.timers[TimerIndex.MOVEMENT_RELOAD].value === 0){
    globals.player.isReloading = false;
  }

}


function readKeyboardAndAssignState(sprite){  

  (globals.action.moveLeft)     ? (sprite.xCell--):
  (globals.action.moveRight)    ? (sprite.xCell++):
  (globals.action.moveUp)       ? (sprite.yCell--):
  (globals.action.moveDown)     ? (sprite.yCell++):
  true;

}






// 
// function isInACorridor(sprite){

//   const level = globals.level.data;
//   const blockSize = globals.level.blockSize;

//   console.log(level);
  
//   if (  
//       ( level[sprite.xCell][sprite.yCell + 1] === 1 && level[sprite.xCell][sprite.yCell - 1] === 1)
//       ||
//       ( level[sprite.xCell + 1][sprite.yCell] === 1 && level[sprite.xCell - 1][sprite.yCell] === 1)
//     ){
//       return true;

//   }else{
//     return false;
//   }

// }

// export function AskForACorridorCell(sprite){
//   let xCell;
//   let yCell;
//     while(!isInACorridor(sprite)){
//       xCell = Math.floor(Math.random() * (globals.level.data.length - 3)) + 3;// 3 a 17;
//       yCell = Math.floor(Math.random() * (globals.level.data[0].length - 3)) + 3;
//     }

//     sprite.xCell = xCell;
//     sprite.yCell = yCell;
// }

