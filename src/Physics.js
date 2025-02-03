
export default class Physics{

    constructor(vLimit, vx = 0, vy = 0,){
        this.vx         = vx;               // Velocidad actual en el eje X (pixels / second)
        this.vy         = vy;               // Velocidad actual en el eje Y (pixels / second)
        this.vLimit     = vLimit;           // Velocidad máxima a la que puede ir el sprite
    }
}