import globals from "./globals.js";
import { Game, SpriteID, State, FPS, TimerIndex, UniChars, BlockValue} from "./constants.js";
import Sprite from "./Sprite.js";
import Frames from "./Frames.js";
import { Level, level1} from "./Level.js";
import Timer from "./Timer.js";
import { keydownHandler, keyupHandler } from "./events.js";
// import { setEvilWizardPosition } from "./gameLogic.js";
import HitBox from "./HitBox.js";
import Physics from "./Physics.js";

//Función que inicializa los elementos HTML
function initHTMLelements() {
  // Canvas
  globals.canvas = document.getElementById("gameScreen");

  // Context
  globals.ctx = globals.canvas.getContext("2d");

  // // Canvas and context HUD
  // globals.canvasHUD = document.getElementById("gameHUD");
  // globals.ctxHUD = globals.canvasHUD.getContext("2d");

  // Eliminación del Anti-Aliasing
  globals.ctx.imageSmoothingEnable = false;

  //Caja de texto para pruebas
  globals.txtPruebas = document.getElementById("txtPruebas");
}

//Función que inicializa las variables del juego
function initVars() {
  //Inicializamos las variables de gestión de tiempo
  globals.previousCycleMilliseconds = 0;
  globals.deltaTime = 0;
  globals.frameTimeObj = 1 / FPS; //Frame time in seconds.

  //Inicializamos el estaod del juego
  globals.gameState = Game.LOADING;

  // //TEST: Inicializamos el estado a PLAYING para poder mostrar los FPS (COMENTAR LA LINES QUE HAY ENCIMA PARA HACER EL TEST)
  // globals.gameState = Game.PLAYING;

  //Inicializamos el contrador del juego
  globals.gameTime = 0;         //El contador se actualiza cada ciclo de ejecución (por delta time)

  globals.action = {
    moveLeft    : false,
    moveRight   : false,
    moveUp      : false,
    moveDown    : false,
  }


  console.log(globals.action);

  globals.player = {
    // animationCyclic             : true,
    // animationPaused             : false,
    // timesAnimation              : 0,
    // throwableReloadTime         : (1/2),  
    // isReloading                 : false,
    life  : 3,
    score : 0
  }

  // globals.life = 400;

}

//Timer
export function initTimers(){

  globals.timers[TimerIndex.MOVEMENT_RELOAD]    = new Timer(1, 0.2); // 5 casillas por segundo

}

export function initEvents(){

  // Add the keyboard event listeners

  window.addEventListener("keydown", keydownHandler, false);
  window.addEventListener("keyup", keyupHandler, false);


}

// UPDATE. Modificamos la función para que cargue las 2 imágenes.
// Carga de activos: TILEMAPS, IMAGES, SOUNDS
function loadAssets() {
  let tileSet;

  // Load the unicode character which will be uses as the map blocks
  tileSet = [UniChars.PLAYER, UniChars.SPIDER, UniChars.MONEY, UniChars.LIFE]; // SOLO HAY 4 SPRITES LOS CUALES NI SIQUIERA SON IMAGENES SINO QUE SON CARÁCTERES UNICODE
  globals.tileSets.push(tileSet);

  // Load the TileSet image
//   tileSet = new Image(); //No Imagen ahora es texto
  tileSet = [BlockValue.X1]; //EL MAPA SOLO LO FORMA UN TILE Y NI SI QUIERA ES UNA IMAGEN, ES UN CARACTER UNICODE
  globals.tileSets.push(tileSet);


  console.log("Assets finished loading");

  // Stat the game
  console.log("Game State: " + globals.gameState)
  globals.gameState = Game.PLAYING;
}


// UPDATE. Función que se llama cada vez que se carga un activo
function loadHandler() {
  globals.assetsLoaded++;

  //Una vez se han cargado todos los activos pasamos
  if (globals.assetsLoaded === globals.assetsToLoad.length) {

    for (let i = 0; i < globals.tileSets.length; i++) {
      // UPDATE. Remove the load event listener
      globals.tileSets[i].removeEventListener("load", loadHandler, false);
    }

  }

}


function initLevel() {
  // Creamos las propiedades de las imagenes del mapa: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
  // const imageSet = new ImageSet(0, 0, 20, 20, 20, 0, 0);

  const blockSize = 16;

  // Creamos y guardamos nuestro nivel
  globals.level = new Level(level1, blockSize);
}

//Inicializar los Sprites
function initSprites() {
  
  // Initialize Characters
  initPlayer();

  initMoney();

}

//Añade al array global "sprites"
function initPlayer() {

  const physics = new Physics(Math.floor(5 * 16));

  const hitBox = new HitBox(14, 14, 0, 0);

  // Creamos nuestro sprite
  const player = new Sprite(SpriteID.PLAYER, State.STILL, UniChars.PLAYER, 8, 7, 14, physics, hitBox); //Iy = 160 cuando termines con colisiones
  //                        id               state                         Ix Iy   Frame   Physics, hitbox


  // Añadimos el player al array de sprites
  globals.sprites.push(player);
}

function initSpider(){

}

function initMoney(){
  const physics = new Physics(0);

  const hitBox = new HitBox(14, 14, 0, 0);

  // Creamos nuestro sprite
  const money = new Sprite(SpriteID.MONEY, State.STILL, UniChars.MONEY, 11, 9, 14, physics, hitBox); //Iy = 160 cuando termines con colisiones
  //                        id               state                         Ix Iy   Frame   Physics, hitbox

  

  // Añadimos el player al array de sprites
  globals.sprites.push(money);

}


//Exportamos las funciones
export { initHTMLelements, initVars, loadAssets, initSprites, initLevel };