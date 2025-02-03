import globals from "./globals.js";
import {Game, State, SpriteID, GRAVITY, Collision, TimerIndex} from "./constants.js";
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

    updateLevelTime();

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

        // Otros
        default:
            console.error("Error: SpriteID invalid");
            break;
    }



}


// Función que actualiza al player
function updatePlayer(sprite){
  //////////////////////////////////////////////////////////////////////////////
  //  LECTURA DE TECLADO
  //////////////////////////////////////////////////////////////////////////////

  readKeyboardAndAssignState(sprite);
  // console.log("----------------------------------------------------------");
  // console.log("Player State: " + sprite.state);

  switch (sprite.state) {
    //===========================================================
    // Move States
    //
    case (State.STILL):

    break;
    
    //===========================================================
    default:
      console.error("Error: Player state invalid");
  }


  // sprite.xPos += sprite.physics.vx * globals.deltaTime;


  // // Calculamos distancia que se mueve (Y = Y + Vt)
  // // Ypos seguirá un movimiento unif. acelerado
  // sprite.yPos += sprite.physics.vy * globals.deltaTime;


  // console.log(sprite.isCollidingWithObstacleOnTheBottom);


  // if( sprite.isCollidingWithObstacleOnTheBottom){
  //   sprite.physics.isOnGround = true;
  // }else{
  //   sprite.physics.isOnGround = false;
  // }

  // sprite.physics.vy += sprite.physics.ay * globals.deltaTime;


  // //Limitar velocidad hacia abajo para que no caiga tan rápido que pudiera atravesar 1 bloque entero en un instante de tiempo
  // if(sprite.physics.vy > sprite.vLimit){ // cambiar vLimit si me da problemas
  //   sprite.physics.vy = sprite.vLimit;
  // }

  // //Asegurar que el personaje se mueve al menos 1 píxel cuando cae, para así que siempre pueda detectar lcolisión con los bloques en el suelo
  // if(sprite.physics.vy > 0){
  //   sprite.yPos += Math.max(sprite.physics.vy * globals.deltaTime, 1);
  // }else{
  //   sprite.yPos += sprite.physics.vy * globals.deltaTime;
  // }


  //NO HAY ANIMACIÓN

  // console.log("Is player Attacking?: " + ((sprite.state === State.PLAYER_TO_LEFT_ATTACK_RAISED) ||(sprite.state === State.PLAYER_TO_RIGHT_ATTACK_RAISED) ));


}







// Timer
function updateGameTime(){
    //Incrementamos el contrador
    globals.gameTime += globals.deltaTime;
}

function updateLevelTime(){

    // Incrementamos el contador de cambio de valor
    globals.timers[TimerIndex.LEVEL_TIMER].timeChangeCounter += globals.deltaTime;

    // Si ha pasado el tiempo necesario, cambiamos el valor del timer
    if(globals.timers[TimerIndex.LEVEL_TIMER].timeChangeCounter > globals.timers[TimerIndex.LEVEL_TIMER].timeChangeValue){
      globals.timers[TimerIndex.LEVEL_TIMER].value--;

        // Reseteamos timeChangeCOunter
        globals.timers[TimerIndex.LEVEL_TIMER].timeChangeCounter = 0;
    }


}

function updateReloadTimer(){
  // Contador que espera a acabar de contar (cuando llegue a cero) para que el player pueda lanzar otra cruz.


    // Incrementamos el contador de cambio de valor
  globals.timers[TimerIndex.PLAYER_THROWABLE_RELOAD].timeChangeCounter += globals.deltaTime;

        // Si ha pasado el tiempo necesario, cambiamos el valor del timer
  if(globals.timers[TimerIndex.PLAYER_THROWABLE_RELOAD].timeChangeCounter > globals.timers[TimerIndex.PLAYER_THROWABLE_RELOAD].timeChangeValue){

    if(globals.timers[TimerIndex.PLAYER_THROWABLE_RELOAD].value > 0){
      globals.timers[TimerIndex.PLAYER_THROWABLE_RELOAD].value--;
    }
    
            // Reseteamos timeChangeCOunter
    globals.timers[TimerIndex.PLAYER_THROWABLE_RELOAD].timeChangeCounter = 0;
  }

          
  if(globals.timers[TimerIndex.PLAYER_THROWABLE_RELOAD].value === 0){
    globals.player.isReloading = false;
  }

}





function readKeyboardAndAssignState(sprite){  
}





// //From bouncing movement tutorial
// // ¿No tiene más sentido que se encuentre este código en physics o incluso en alguna clase que lo herede?
// function calculateCollisionWithFourBorders(sprite){

//   if      (sprite.xPos + sprite.imageSet.xSize > globals.canvas.width){
//     sprite.collisionBorder = Collision.BORDER_RIGHT;
//   }

//   else if (sprite.xPos < 0){
//     sprite.collisionBorder = Collision.BORDER_LEFT;
//   }
//   else if (sprite.yPos < 0){
//     sprite.collisionBorder = Collision.BORDER_UP;

//   }
//   else if (sprite.yPos + sprite.imageSet.ySize > globals.canvas.height){
//     sprite.collisionBorder = Collision.BORDER_DOWN;

//   }
//   else{
//     sprite.collisionBorder = Collision.NO_COLLISION;

//   }
// }

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


