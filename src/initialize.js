import globals from "./globals.js";
import { Game, SpriteID, State, FPS, TimerIndex, UniChars, BlockValue} from "./constants.js";
import Sprite, { BouncingSprite } from "./Sprite.js";
import ImageSet from "./ImageSet.js";
import Frames from "./Frames.js";
import { Level, level1} from "./Level.js";
import Timer from "./Timer.js";
import Physics from "./Physics.js";
import { keydownHandler, keyupHandler } from "./events.js";
// import { setEvilWizardPosition } from "./gameLogic.js";
import HitBox from "./HitBox.js";

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
    moveUP      : false,
    moveDown    : false,
  }

  globals.player = {
    // animationCyclic             : true,
    // animationPaused             : false,
    // timesAnimation              : 0,
    // throwableReloadTime         : (1/2),  
    // isReloading                 : false,
  }

  globals.life = 400;

}

//Timer (tutorial 3)
export function initTimers(){

  globals.timers[TimerIndex.LEVEL_TIMER]                = new Timer(200, 1.0);
  globals.timers[TimerIndex.PLAYER_THROWABLE_RELOAD]    = new Timer(2, 0.5);

  // console.log(globals.timers);
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
  tileSet.addEventListener("load", loadHandler, false); //El tercer parámetro será siempre false (razón?)
  tileSet = [BlockValue.X1]; //EL MAPA SOLO LO FORMA UN TILE Y NI SI QUIERA ES UNA IMAGEN, ES UN CARACTER UNICODE
  globals.tileSets.push(tileSet);
  globals.assetsToLoad.push(tileSet);

  // Load the TileSet image
//   tileSet = new Image(); //No Imagen ahora es texto
  tileSet.addEventListener("load", loadHandler, false);
  tileSet = [UniChars.PLAYER, UniChars.SPIDER, UniChars.MONEY, UniChars.LIFE]; // SOLO HAY 4 SPRITES LOS CUALES NI SIQUIERA SON IMAGENES SINO QUE SON CARÁCTERES UNICODE
  globals.tileSets.push(tileSet);
  globals.assetsToLoad.push(tileSet);
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

    console.log("Assets finished loading");

    // Stat the game
    globals.gameState = Game.PLAYING;
  }

}

//Inicializar los Sprites
function initSprites() {
  
  // Initialize Characters
  initPlayer();

}

//Añade al array global "sprites"
function initPlayer() {
  //Fila 0 del SpriteSheet

  // Creamos las propiedades de la imagenes: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
  const imageSet = new ImageSet(0, 0, 60, 60, 60, 0, 0);

  // Creamos los datos de la animación. 8 frames / state
  const frames = new Frames(4, 2);

  //Creamos nuestro objeto physics con vLimit = 40 pixels / seconds
  const physics = new Physics(65,     0,      1,        -220);
  //                          vLimit  aLimit  Friction  jumpForce

  const hitBox = new HitBox(23, 45, 20, 15);

  // Creamos nuestro sprite
  const player = new Sprite(SpriteID.PLAYER, State.PLAYER_TO_RIGHT_STILL, 150, 460, imageSet, frames, physics, hitBox); //Iy = 160 cuando termines con colisiones
  //                        id               state                        Ix  Iy   ImageSet  Frame   Physics

  //Cuando cambie el state el numero de frames por animación es distinto por lo que hay que cambiar la
  // cantidad de frames dependiendo del estado en el que se encuentre el player

  // Añadimos el player al array de sprites
  globals.sprites.push(player);
}

function initSpider(){

}

function initMoney(){

}

function initLevel() {
  // Creamos las propiedades de las imagenes del mapa: initFil, initCol, xSize, ySize, gridSize, xOffset, yOffset
  const imageSet = new ImageSet(0, 0, 20, 20, 20, 0, 0);

  // Creamos y guardamos nuestro nivel
  globals.level = new Level(level1, imageSet);
}

//Exportamos las funciones
export { initHTMLelements, initVars, loadAssets, initSprites, initLevel };