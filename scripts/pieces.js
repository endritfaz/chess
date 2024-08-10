EMPTY = "";

class Piece {
    board;
    moves = [];
    white;

    constructor(board, white) {
        this.board = board;
        this.white = white;
    }

    isWhite() {
        return this.white;
    }

    getMoves() {
        return this.moves;
    }
    
    canMove(square) {
        return this.board.isEmpty(square);
    }

    canAttack(square) {
        return !this.board.isEmpty(square) && this.isWhite() != this.board.getPiece(square).isWhite()
    }
}

class Pawn extends Piece {
    // Boolean for whether a pawn has moved off home row, to determine eligibiltiy to move forward two squares 
    moved = false;
    multiplier; 

    constructor(board, white, multiplier) {
        super(board, white)
        this.multiplier = multiplier;
    }

    calculateMoves(square, isPlayingWhite) {
        
        // TODO: Change so that moves are only reset when a move is made, and only calculated once per move
        this.moves = []
      
        const forwardSquare = square + 8*this.multiplier;
        if (this.canMove(forwardSquare)) {
            this.moves.push(forwardSquare);
        }

        const twoForwardSquare = square + 2*8*this.multiplier;
        if (!this.moved && this.canMove(twoForwardSquare)) {
            this.moves.push(twoForwardSquare);
        }

        // Check rank to be attacked is one more than rank of pawn to avoid attacking pawn on other side of board.
        const leftDiagonal = square + 7*this.multiplier;
        if (this.canAttack(leftDiagonal) && (this.board.getRank(square) - this.multiplier == this.board.getRank(leftDiagonal))) {
            this.moves.push(leftDiagonal)
        }

        const rightDiagonal = square + 9*this.multiplier;
        if (this.canAttack(rightDiagonal) && (this.board.getRank(square) - this.multiplier == this.board.getRank(rightDiagonal))) {
            this.moves.push(rightDiagonal)
        }
    }
}

class Knight extends Piece {}

class Bishop extends Piece {}

class Rook extends Piece {}

class Queen extends Piece {}

class King extends Piece {}