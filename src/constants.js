//Los estados de cada elemento se definirán como constantes en el fichero 'costants.js'.

export const Game = {
    INVALID     :  -1,
    LOADING     :   0,
    PLAYING     :   1,
}
//Velocidad del juego
export const FPS = 30;

//Identificador del tipo  de Sprite (ID)
export const SpriteID = {
    PLAYER  :   0,
    SPIDER  :   1,
    MONEY   :   2,
    LIFE    :   3

}

//Identificador de estado  de Sprite (dirección)
export const State = {

    //No hay animaciones por lo que no hay estados más que STILL y OFF
    STILL                  :    0,
    OFF                    :    -1
}

export const TimerIndex = {
    MOVEMENT_RELOAD             :       0
}

// Indicar cual es el valor que tiene cada sprite (cada caracter UNICODE)
export const UniChars = {
    PLAYER  :   "\u{1F474}",
    SPIDER  :   "\u{1F577}",
    MONEY   :   "\u{1F4B5}",
    LIFE    :   "\u{1F49A}"
}



// Diferentes TileSets
export const Tile = {
    SIZE_14 :       0,     // Tiles de los Sprites (en realidad en este examen es un array de cadenas de carácteres con formato unicode)   
    SIZE_16 :       1,     // Tiles de mapa 16x16
}


// Id de bloque del mapa
export const Block = {
    //137 Tiles type
    EMPTY           :   0,  
    X1              :   1
}

export const BlockValue = {
    EMPTY   :   null,
    X1      :   "\u2B1C"
}

export const Key = {
    //  https://keyjs.dev/es/
    UP      :   38,         
    DOWN    :   40,         
    RIGHT   :   39,         
    LEFT    :   37,         

}

//Aceleration
// export const GRAVITY = 1280; IDEAL VALUE UNCOMMENT
export const GRAVITY = 300;

//
export const Collision = {
    NO_COLLISION            :   -1,
    BORDER_UP               :   0,
    BORDER_DOWN             :   1,
    BORDER_LEFT             :   2,
    BORDER_RIGHT            :   3,
}

export const MoneyStaticPos = [
    {
        XCELL   : 5,
        YCELL   : 9
    },
    {
        XCELL   : 6,
        YCELL   : 4
    },
    {
        XCELL   : 13,
        YCELL   : 3
    },
    {
        XCELL   : 11,
        YCELL   : 6
    },
    {
        XCELL   : 12,
        YCELL   : 8
    },
    {
        XCELL   : 4,
        YCELL   : 8
    }
];