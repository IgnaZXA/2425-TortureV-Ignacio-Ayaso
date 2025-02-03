import globals from "./globals.js";
import { Tile, Game, SpriteID, TimerIndex } from "./constants.js";
// import {Tile} from "./constants.js";

//Función que renderiza los gráficos
export default function render() {

  //Change what the game is doing based on the game state
  switch (globals.gameState) {
    case Game.LOADING:
      // Draw loading spinner
      break;

    case Game.PLAYING:
      drawGame();
      break;

    default:
      console.error("Error: Game State Invalid.");
  }
}


///////////////////////////////////////////////////////////////////////////////
//  GAME STATE
///////////////////////////////////////////////////////////////////////////////

function drawGame() {
  // Borramos la pantalla entera (tanto la pantalla del juego como el HUD, recordemos que drawGame se ejecuta en el state PLAYING del videojuego).
  globals.ctx.clearRect(0, 0, globals.canvas.width, globals.canvas.height);
  globals.ctxHUD.clearRect(0, 0, globals.canvasHUD.width, globals.canvasHUD.height);


  // Dibujamos el mapa (nivel)
  renderMap();

  // Dibujamos los elementos
  drawSprites();

}

function drawSprites() {
  for (let i = 0; i < globals.sprites.length; i++) {
    const sprite = globals.sprites[i];

    //TEST: Dibuja un rectangulo alrededor del sprite
    // drawSpriteRectangle(sprite);

      renderSprite(sprite);

    //TEST: Dibuja el HitBox
    // drawHitBox(sprite);
  }
}

function renderSprite(sprite) {

  // Calculamos la posición de tile de inicio
  const xPosInit = sprite.imageSet.initCol * sprite.imageSet.gridSize;
  const yPosInit = sprite.imageSet.initFil * sprite.imageSet.gridSize;

  // Calculamos la posición en el tilemap a dibujar
  const xTile = xPosInit + sprite.frames.frameCounter * sprite.imageSet.gridSize + sprite.imageSet.xOffset; //FrameCounter va de 0 a framesPerState-1
  const yTile = yPosInit + sprite.state * sprite.imageSet.gridSize + sprite.imageSet.yOffset; // El sprite.state indica la fila del archivo spritesheet del que se busca dibujar el frame que se usa.

  const xPos = Math.floor(sprite.xPos);
  const yPos = Math.floor(sprite.yPos);
  
  globals.ctx.drawImage(
    // globals.tileSet,                             // The image file
    globals.tileSets[Tile.SIZE_16],                 // The image file
    xTile, yTile,                                   // The source x and y position
    sprite.imageSet.xSize, sprite.imageSet.ySize,   // The source height and width
    xPos, yPos,                                     // The destination x and y position
    sprite.imageSet.xSize, sprite.imageSet.ySize    // The destination height and width
  );


}

function renderMap() {
  const brickSize = globals.level.imageSet.gridSize; // 20
  const levelData = globals.level.data; //level3

  // Dibujamos el mapa
  const num_fil = levelData.length;
  const num_col = levelData[0].length;

  for (let i = 0; i < num_fil; ++i) {
    for (let j = 0; j < num_col; ++j) {
      const xTile = Math.floor((levelData[i][j] - 1) % 25) * brickSize;
      const yTile = Math.floor((levelData[i][j] - 1) / 25) * brickSize;

      const xPos = j * brickSize;
      const yPos = i * brickSize;

      // Dibujamos el nuevo fotograma del sprite en la posición adecuada
      globals.ctx.drawImage(
        globals.tileSets[Tile.SIZE_20], // The image file
        xTile, yTile,                   // The source x and y position in pixels
        brickSize, brickSize,           // The source height and width
        xPos, yPos,                     // The destination height and width
        brickSize, brickSize
      );
    }
  }
}




// function drawHitBox(sprite){
//   // Datos del sprite

//   // console.log(sprite.hitBox);
//   const x1 = Math.floor(sprite.xPos) + Math.floor(sprite.hitBox.xOffset);
//   const y1 = Math.floor(sprite.yPos) + Math.floor(sprite.hitBox.yOffset); 
//   const w1 = sprite.hitBox.xSize;
//   const h1 = sprite.hitBox.ySize;

//   globals.ctx.strokeStyle = "red";
//   globals.ctx.strokeRect(x1, y1, w1, h1);

// }


