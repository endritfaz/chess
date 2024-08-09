EMPTY = "";

class Piece {
    moves = {};
    white;

    constructor(white) {
        this.white = white;
    }

    isWhite() {
        return this.white;
    }
}

class Pawn extends Piece {
    calculateMoves() {
        console.log("cunt");
    }
}

class Knight extends Piece {}

class Bishop extends Piece {}

class Rook extends Piece {}

class Queen extends Piece {}

class King extends Piece {}