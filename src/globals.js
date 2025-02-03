import { Game } from "./constants.js";

export default {

    //Acceso al canvas y context
    canvas: {},
    ctx: {},

    // Estado del juego. Inicializamos a INVÁLIDO
    gameState: Game.INVALID,

    //Timepo de coclo anterior (millisecionds)
    previousCycleMilliseconds   :  -1,

    //Tiempo del ciclo de juego real (seconds)
    deltaTime                   :   0,

    //Timepo de ciclo objetivo (seconds, constante)
    frameTimeObj                :   0,

    //Caja de texto para mostrar datos de depuración
    txtPruebas                  :   {},

    // Datos de imagen (tileset)
    // Datos de imagen (tileset). Modificamos por ARRAY
    tileSets                     :  [],

    //Variables para gestionar la carga de activos
    assetsToLoad                :   [],
    assetsLoaded                :   0,
 
    // Array con datos de los sprites
    sprites                     :   [],

    cycleRealTime               :   0,

    level                       :   {},


    //HUD Part
    canvasHUD                   :   {},
    ctxHUD                      :   {},

    //Timer

    gameTime                    :   -1,

    //En este array es donde se deben añadir todos los temporizadores del juego, los index están indicados en el Objeto TimeraIndex del fichero constant
    timers                      :   [],

    // //Temporización nivel
    // levelTime                   :   {},

    action                      :   {},

    life                        :   0,

    player                      :   {},

    actualMenuOption            :   {}





   
  

};