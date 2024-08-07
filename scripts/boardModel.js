const isWhiteTurn = true;
const pieces = "42356324";

// First three bits represent piece
const EMPTY = 0; 
const PAWN = 1
const KNIGHT = 2; 
const BISHOP = 3;  
const ROOK = 4; 
const QUEEN = 5; 
const KING = 6;

// Fourth bit set if piece is white
const WHITE = 8;
const BLACK = 0; 

// Board represented by a one dimensional array of 64 entries 
const board = [];

// TODO: TODO: Replace this function with a function that loads an arbitrary position from a string
function placePieces() {
    let color = isPlayingWhite ? WHITE : BLACK;

    for (let i = 0; i < 8; i++) {
        board[i] = parseInt(pieces[i]) + color;
    }

    for (let i = 8; i < 56; i++) {
        board[i] = 0; 
    }

    color = isPlayingWhite ? BLACK : WHITE;

    for (let i = 56; i < 64; i++) {
        board[i] = parseInt(pieces[i - 56]) + color;
    }
}

function convertSquareTo1D(square) {
    return parseInt(square[1])*8 + parseInt(square[2]);
}

function isWhite(piece) {
    return (piece > 6);
}

function calculateMoves(square) {
    // Squares have 'XY' coordinate style IDs in the HTML  
    square = convertSquareTo1D(square);

    // convertSquareTo1D returned the 'n'th square, which is one more than the actual position of the square in the board array
    const piece = board(square - 1);

    // Only calculate moves for the players' pieces
    if (!((isWhite(piece) && isPlayingWhite) || (!isWhite(piece) && !isPlayingWhite))) {
        return;
    }

    const pieceWithoutColor = isWhite(piece) ? (piece - 8) : piece;

    switch (pieceWithoutColor) {
        case(PAWN):
            calculatePawnMoves(piece);
        case(KNIGHT):
            calculateKnightMoves(piece);
        case(BISHOP):
            calculateBishopMoves(piece);
        case(ROOK):
            calculateRookMoves(piece);
        case(QUEEN):
            calculateQueenMoves(piece);
        case(KING):
            calculateKingMoves(piece)
    }
}

placePieces();