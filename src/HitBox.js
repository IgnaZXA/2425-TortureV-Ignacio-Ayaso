
export default class HitBox {
    constructor(xSize, ySize, xOffset, yOffset){
        this.xSize      = xSize;        // Tamaño en píxeles del hitbox (x)
        this.ySize      = ySize;        // Tamaño en píxeles del hitbox (y)
        this.xOffset    = xOffset;      // Offset en X de comienzo de dibujo del HitBox respecto de xPos.
        this.yOffset    = yOffset;      // Offset en Y de comienzo de dibujo del HitBox respecto de yPos.
    }
}