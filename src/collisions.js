import globals from "./globals.js";
import { Block, State } from "./constants.js";

//Este archivo contendrá toda la lógica de las colisiones


function rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2){
    let isOverlap;

    if(x2 > w1 + x1 || x1 > w2 + x2 || y2 > h1 + y1 || y1 > h2 + y2){
        isOverlap = false;
    }else{
        isOverlap = true;
    }

    return isOverlap;
}



export default function detectCollisions(){
    for (let i = 1; i < globals.sprites.length; i++){
        const sprite = globals.sprites[i];
        detectCollisionsBetweenPlayerAndSprite(sprite);
    }

    //Calculamos colision del player con los obstáculos del mapa
    detectCollisionBetweenPlayerAndMapObstacles();
}

function detectCollisionsBetweenPlayerAndSprite(sprite){

    //Reset collision state
    sprite.isCollidingWithPlayer = false;

    //Nuestro player está en la posición 0 del array de sprites
    const player = globals.sprites[0];

    //Datos del player
    const x1 = player.xPos + player.hitBox.xOffset;
    const y1 = player.yPos + player.hitBox.yOffset;
    const w1 = player.hitBox.xSize;
    const h1 = player.hitBox.ySize;

    //Datos del otro sprite
    const x2 = sprite.xPos + sprite.hitBox.xOffset;
    const y2 = sprite.yPos + sprite.hitBox.yOffset;
    const w2 = sprite.hitBox.xSize;
    const h2 = sprite.hitBox.ySize;


    const isOverlap = rectIntersect(x1, y1, w1, h1, x2, y2, w2, h2);

    if (isOverlap){ //TODO poner la función dentro del if en vez de crear el la  variable isOverlap
        //Existe Colisión
        sprite.isCollidingWithPlayer = true;
    }

}

function getMapTiledId(xPos, yPos){
    const brickSize = globals.level.imageSet.gridSize;
    const levelData = globals.level.data;

    const fil = Math.floor(yPos / brickSize);
    const col = Math.floor(xPos / brickSize);

    return levelData[fil][col];
}


function isCollidingWithObstacleAt(xPos, yPos, level1GroundTile1){
    let isColliding;

    const id = getMapTiledId(xPos, yPos);

    if (id === level1GroundTile1){
        isColliding = true;
    }else{
        isColliding = false;
    }

    return isColliding;
}


function detectCollisionBetweenPlayerAndMapObstacles(){
    const player = globals.sprites[0];

    // //Reset collision state
    // player.isCollidingWithObstacleOnTheRight = false;

    let xPos;
    let yPos;

    let isCollidingOnPos1;
    let isCollidingOnPos2;
    let isCollidingOnPos3;
    let isCollidingOnPos4;
    let isCollidingOnPos5;
    let isCollidingOnPos6;

    let isColliding;
    let overlap;

    const brickSize = globals.level.imageSet.gridSize;
    const direction = player.state;

    //ID del obstáculo;

    const level1GroundTile1 = Block.X1; //Suelo base del mapa 1
    const level1GroundTile2 = Block.X2; //Suelo base del mapa 1
    const level1GroundTile3 = Block.X3; //Suelo base del mapa 1



    //Reset collision state
    player.isCollidingWithObstacleOnTheBottom   =   false;
    player.isCollidingWithObstacleOnTheRight    =   false;
    player.isCollidingWithObstacleOnTheLeft     =   false;
    player.isCollidingWithObstacleOnTheTop      =   false;


    // Colisiones  (6 puntos posibles)
    // 6----------------1
    // ------------------
    // ------------------
    // ------------------
    // 5----------------2
    // ------------------
    // ------------------
    // ------------------
    // 4----------------3

    let overlapX;
    let overlapY;

    //Calculamos colisiones en los 6 puntos del personaje
    if(player.physics.vx > 0){ //Cuando se mueve a la derecha

        //Punto 6
        // Primera colisión en (xPos, yPos)
        xPos = player.xPos + player.hitBox.xOffset;
        yPos = player.yPos + player.hitBox.yOffset;

        isCollidingOnPos6 = isCollidingWithObstacleAt(xPos, yPos, level1GroundTile1);

        if (isCollidingOnPos6){

            // Se trata de una esquina. Puede haber overlap en X y en Y.

            //Calculamos overlap solo en Y
            overlapY = brickSize - Math.floor(yPos) % brickSize;

            //Calculamos overlap sólo en Y
            overlapY = brickSize - Math.floor(yPos) % brickSize;

            player.yPos += overlapY;
            player.physics.vy = 0;
        }

        // punto 4
        //Última colisión en (xPos, yPos + ySize - 1)
        xPos = player.xPos + player.hitBox.xOffset;
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
        isCollidingOnPos4 = isCollidingWithObstacleAt(xPos, yPos, level1GroundTile1);

        if(isCollidingOnPos4){ // Hay colisión en punto 4
            //Se trata de una esquina. Puede haber overlap en X y en Y

            //Calculamos overlap sólo en Y
            overlapY = Math.floor(yPos) % brickSize + 1;

            //Colisión en el eje Y
            player.yPos -= overlapY;
            player.isCollidingWithObstacleOnTheBottom = true;
            player.physics.vy = 0;

        }

        //Punto 2
        //  ... A COMPLETAR

        // Punto 1
        // Vemos si hay colsión en (xPos + xSize - 1, yPos)
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
        yPos = player.yPos + player.hitBox.yOffset;
        isCollidingOnPos1 = isCollidingWithObstacleAt(xPos,yPos, level1GroundTile1);

        if (isCollidingOnPos1){ // Hay colision en punto 1
            //Calculamos overlap en x y en y con el player
            overlapX = Math.floor(xPos) % brickSize + 1;
            overlapY = brickSize - Math.floor(yPos) % brickSize;

            if (overlapX <= overlapY) {
                //Colisión en eje X
                player.xPos -= overlapX;
                player.physics.vx = 0;
            }else{

                //Colisión en eje Y
                if (player.physics.vy > 0){
                    player.yPos -= overlapY;
                }else{
                    player.yPos += overlapY;
                    player.physics.vy = 0;
                }
            }

        }

        //Punto 3
        // ... A COMPLETAR
        // Vemos si hay colsión en (xPos + xSize - 1, yPos + ySize - 1)
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
        yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
        isCollidingOnPos3 = isCollidingWithObstacleAt(xPos,yPos, level1GroundTile1);

        if (isCollidingOnPos3){ // Hay colision en punto 1
            //Calculamos overlap en x y en y con el player
            overlapX = Math.floor(xPos) % brickSize + 1;
            overlapY = brickSize - Math.floor(yPos) % brickSize;

            if (overlapX <= overlapY) {
                //Colisión en eje X
                player.xPos -= overlapX; // El player se va hacia atrás 
                player.physics.vx = 0;
            }else{

                //Colisión en eje Y
                if (player.physics.vy > 0){
                    player.yPos -= overlapY; //El player sube
                }else{
                    player.yPos += overlapY; 
                    player.physics.vy = 0;
                }
            }

        }

    }else{ // Movimiento izquierda (palyer.physics. vx < 0 OJO! que tambien vx = 0)

        // Punto 1
        // Primera colisión en (xPos + xSize - 1, yPos)
        xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
        yPos = player.yPos + player.hitBox.yOffset;
        isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, level1GroundTile1);


    }


    // switch (direction){
    //     case State.PLAYER_TO_RIGHT_MOVE:

    //         // Primera colisión en (xPos + xSize - 1, yPos)
    //         xPos = player.xPos + player.hitBox.xOffset + player.hitBox.xSize - 1;
    //         yPos = player.yPos + player.hitBox.yOffset;
    //         isCollidingOnPos1 = isCollidingWithObstacleAt(xPos, yPos, level1GroundTile1);

    //         // Segunda colisión en (xPos + xSize - 1, yPos + brickSize)
    //         yPos = player.yPos + player.hitBox.yOffset + brickSize;
    //         isCollidingOnPos2 = isCollidingWithObstacleAt(xPos, yPos, level1GroundTile1);

    //         // Última colisión en (xPos + xSize - 1, yPos + ySize - 1)
    //         yPos = player.yPos + player.hitBox.yOffset + player.hitBox.ySize - 1;
    //         isCollidingOnPos3 = isCollidingWithObstacleAt(xPos, yPos, level1GroundTile1);

    //         // Habrá colisión si toca alguno de los 3 bloques.
    //         isColliding = isCollidingOnPos1 || isCollidingOnPos2 || isCollidingOnPos3;

    //         if (isColliding) {
    //             player.isCollidingWithObstacleOnTheRight = true;

    //             //AJUSTE: Calculamos solapamiento (overlap)y lo eliminamos
    //             // moviendo el personaje tantos píxeles como overlap a la izda

    //             overlap = Math.floor(xPos)  % brickSize + 1;
    //             player.xPos -= overlap;
    //         }

    //     break;

    //     default:
    //         // resto de estados a rellenar
    //         break;
    // }

    player.isCollidingWithObstacleOnTheBottom   =   (isCollidingOnPos4 || isCollidingOnPos3);
    player.isCollidingWithObstacleOnTheRight    =   (isCollidingOnPos1 || isCollidingOnPos2 || isCollidingOnPos3);
    player.isCollidingWithObstacleOnTheLeft     =   (isCollidingOnPos4 || isCollidingOnPos5 || isCollidingOnPos6);
    player.isCollidingWithObstacleOnTheTop      =   (isCollidingOnPos1 || isCollidingOnPos6);

}