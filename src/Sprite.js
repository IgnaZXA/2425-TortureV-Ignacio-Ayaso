import { Collision } from "./constants.js";

export default class Sprite{

    // constructor(id, state, xPos, yPos, imageSet, frames, physics, hitBox){
    //     this.id                                     =   id;       // Tipo del Sprite
    //     this.state                                  =   state;    // Estado de la animación del Sprite
    //     this.xPos                                   =   xPos;     // Posición en X en Canvas
    //     this.yPos                                   =   yPos;     // Posición en Y en Canvas
    //     this.imageSet                               =   imageSet; // Datos de las imágenes del sprite
    //     this.frames                                 =   frames;   // Datos de los frames de animación
    //     this.physics                                =   physics;  // Datos de las físicas.
    //     this.hitBox                                 =   hitBox;   // Datos del hitbox
    //     this.isCollidingWithPlayer                  =   false;    // Variable que indica si ha habido colisión con el player
    //     this.isCollidingWithObstacleOnTheTop        =   false;
    //     this.isCollidingWithObstacleOnTheLeft       =   false;
    //     this.isCollidingWithObstacleOnTheBottom     =   false;
    //     this.isCollidingWithObstacleOnTheRight      =   false;

    // }

    constructor(id, state, imageChar ,xCell, yCell, gridSize, physics, hitBox){
        this.id                                     =   id;       // Tipo del Sprite
        this.state                                  =   state;    // Estado de la animación del Sprite
        this.imageChar                              =   imageChar;//
        this.xCell                                 =   xCell;     // Posición en X en Canvas
        this.yCell                                  =   yCell;     // Posición en Y en Canvas
        this.gridSize                               =   gridSize;
        this.physics                                =   physics;
        this.hitBox                                 =   hitBox;   // Datos del hitbox
        this.isCollidingWithPlayer                  =   false;    // Variable que indica si ha habido colisión con el player
        this.isCollidingWithObstacleOnTheTop        =   false;
        this.isCollidingWithObstacleOnTheLeft       =   false;
        this.isCollidingWithObstacleOnTheBottom     =   false;
        this.isCollidingWithObstacleOnTheRight      =   false;
    }
}

//id: identificador de tipo de sprite. Los diferentes tipos se definitán en constrants.js

//state: estado de animación del sprite. Los diferentes estados se definirán en constants.js

// xPos, yPos: Posición del sprite en el CANVAS.

//imageSet: Objeto de la clase ImageSet, con los datos de las imágenes del sprite.

//frames: Objeto de la clase Frames, con los datos de los frames de animación.

// export class BouncingSprite extends Sprite{
//     constructor (id, state, xPos, yPos, imageSet, frames, physics, hitBox, isCollidingWithPlayer){

//         // Llamamos al constructor de la clase sprite
//         super(id, state, xPos, yPos, imageSet, frames, physics, hitBox, isCollidingWithPlayer);

//         this.collisionBorder = Collision.NO_COLLISION;          //Empezamos No collision
//     }
// }