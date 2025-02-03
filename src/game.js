import globals from "./globals.js";

import {initHTMLelements, loadAssets, initSprites, initVars, initLevel, initTimers, initEvents} from "./initialize.js";

import update from "./gameLogic.js";
import render from "./gameRender.js";

////////////////////////////////////////////////////////
//GAME INIT
////////////////////////////////////////////////////////


window.onload = init;


function init() {
    
    // Inicializamos los elementos HTML: Canvas, Context, Caja de texto de pruebas
    initHTMLelements();

    // Inicialización de variables del juego
    initVars();

    // Cargamos todos los activos: TILEMAPS, IMAGES, SOUNDS
    loadAssets();

    // Inicializamos los sprites
    initSprites();

    // Inicializamos el mapa del juego
    initLevel();

    // Inicializamos los temporizadores
    initTimers();

    // Inicializamos los eventos
    initEvents();

    // Start the first frame request
    // https://developer.mozilla.org/en-US/docs/Web/API/DedicatedWorkerGlobalScope/requestAnimationFrame
    window.requestAnimationFrame(gameLoop);

}


//TODO REFACTOR IDEA: ADD TWO NEW SPRITE IN THE "spritesheet.png" OF EMPTY POTION THAT WORKS AS RED OR BLUE TRASH.


////////////////////////////////////////////////////////
//GAME EXECUTE
////////////////////////////////////////////////////////


/**
 * Bucle principal de ejecución. 
 * @param {*} timeStamp tiempo en el ciclo de actualización actual (milisegundos)
 */
function gameLoop(timeStamp){

    //Keep requesting new frames
    window.requestAnimationFrame(gameLoop, globals.canvas);

    //Tiempo real de ciclo de ejecución
    const elapsedCycleSeconds = (timeStamp - globals.previousCycleMilliseconds) / 1000; //seconds

    //Tiempo anterior de ciclo de ejecución
    globals.previousCycleMilliseconds = timeStamp;

    //Variable que corrije el tiempo de frama debido a retrasos con respecto al tiempo objetico (frameTimeObj)
    globals.deltaTime += elapsedCycleSeconds;

    globals.cycleRealTime += elapsedCycleSeconds;

    //La variable deltaTime nunca será igual a frameTimeObj, sino que almacenará un exceso de tiempo por cada ciclo de juego.
    if(globals.cycleRealTime >= globals.frameTimeObj){

        //Update the game logic. gameLogic.js
        update();

        //Perform the drawing operation. gameRender.js
        render();

        //Corregimos los excesos de tiempo
        globals.cycleRealTime -= globals.frameTimeObj;
        globals.deltaTime = 0;
    }

}