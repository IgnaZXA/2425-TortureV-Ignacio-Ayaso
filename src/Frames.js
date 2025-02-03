
export default class Frames {

    constructor(framesPerState, speed = 1){
        this.framesPerState     = framesPerState;   //  Número de frames por estado de animación
        this.frameCounter       = 0;                //  Contador de frames
        this.speed              = speed;            // Velocidad de cambio de frame (Mínimo: 1. A mayor número, más lento)
        this.frameChangeCounter = 0;                // Contador de velocidad de cambio de frame
    }

}