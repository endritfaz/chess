const isWhiteTurn = true;
const pieces = "42356324";

// First three bits represent piece
const EMPTY = 0; 
const PAWN = 1;
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

    for (let i = 8; i < 16; i++) {
        board[i] = 1 + color;   
    }

    for (let i = 16; i < 48; i++) {
        board[i] = 0; 
    }

    color = isPlayingWhite ? BLACK : WHITE;

    for (let i = 48; i < 56; i++) {
        board[i] = 1 + color;
    }

    for (let i = 56; i < 64; i++) {
        board[i] = parseInt(pieces[i - 56]) + color;
    }
}

function convertSquareTo1D(square) {
    return parseInt(square[0]) + (parseInt(square[1]) - 1) * 8;
}

function convertSquareTo2D(square) {
    column = (square + 1) % 8
    column = column == 0 ? 8 : column;
    
    row = Math.floor(square/8) + 1;
    return `${column}${row}`;
}

function isWhite(piece) {
    return (piece > 6);
}

function isEmpty(square) {
    return (board[square] == EMPTY);
}

// Returns 1 for white piece and 0 for black piece
function getColor(piece) {
    return piece >> 3;
}

function calculateMoves(square) {
    // Squares have 'XY' coordinate style IDs in the HTML 
   
    // convertSquareTo1D returned the 'n'th square, which is one more than the actual position of the square in the board array
    square = convertSquareTo1D(square) - 1;
    
    const piece = board[square];
  
    // Only calculate moves if it is players' turn
    if (!(isWhite(piece) && isWhiteTurn) || (!isWhite(piece) && !isWhiteTurn)) {
        return;
    }
   
    const pieceWithoutColor = isWhite(piece) ? (piece - 8) : piece;
  
    let moves;

    switch (pieceWithoutColor) {
        case(PAWN):
            moves = calculatePawnMoves(square, piece);
            break;
        case(KNIGHT):
            moves = calculateKnightMoves(piece);
            break;
        case(BISHOP):
            moves = calculateBishopMoves(piece);
            break;
        case(ROOK):
            moves = calculateRookMoves(piece);
            break;
        case(QUEEN):
            moves = calculateQueenMoves(piece);
            break;
        case(KING):
            moves = calculateKingMoves(piece);
            break;

    }

    for (let i = 0; i < moves.length; i++) {
        moves[i] = convertSquareTo2D(moves[i]);
    }
  
    return moves;
}

function updateBoardModel(startSquare, endSquare) {
    startSquare = convertSquareTo1D(startSquare) - 1;
    endSquare = convertSquareTo1D(endSquare) - 1;

    let movingPiece = board[startSquare];
    board[startSquare] = EMPTY;
    board[endSquare] = movingPiece;
  
}
placePieces();