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
    
    legaliseMoves() {
        let legalMoves = [];
        for (let i = 0; i < this.moves.length; i++) {
            if (this.board.isLegalMove(this.moves[i])) {
                legalMoves.push(this.moves[i])
            }
        }
        this.moves = legalMoves;
    }

    addMove(targetSquare) {
        this.moves.push(targetSquare)
    }

    canMove(square) {
        return BoardModel.inRange(square) && this.board.isEmpty(square);
    }

    canAttack(square) {
        return BoardModel.inRange(square) && !this.board.isEmpty(square) && this.isWhite() != this.board.getPiece(square).isWhite()
    }

    // Methods here rather than in a seperate 'DiagonalMover' or 'StraightMover' abstract class because Javascript doesn't support multiple inheritance as required for queen
    calculateDiagonalMoves(square) {
        const nwDirection = -9;
        const swDirection = 7;
        const neDirection = -7;
        const seDirection = 9;

        const westLimit = BoardModel.getFile(square);
        const eastLimit = 9 - BoardModel.getFile(square);

        let diagonalMoves = [];

        diagonalMoves = diagonalMoves.concat(this.directionalMoves(westLimit, nwDirection, square));
        diagonalMoves = diagonalMoves.concat(this.directionalMoves(westLimit, swDirection, square));
        diagonalMoves = diagonalMoves.concat(this.directionalMoves(eastLimit, neDirection, square));
        diagonalMoves = diagonalMoves.concat(this.directionalMoves(eastLimit, seDirection, square));

        return diagonalMoves;
    }

    calculateDirectMoves(square) {
        const northDirection = -8;
        const eastDirection = 1; 
        const southDirection = 8; 
        const westDirection = -1;

        const northLimit = 9 - BoardModel.getRank(square);
        const eastLimit = 9 - BoardModel.getFile(square);
        const southLimit = BoardModel.getRank(square);
        const westLimit = BoardModel.getFile(square);

        let directMoves = [];

        directMoves = directMoves.concat(this.directionalMoves(northLimit, northDirection, square));
        directMoves = directMoves.concat(this.directionalMoves(eastLimit, eastDirection, square));
        directMoves = directMoves.concat(this.directionalMoves(southLimit, southDirection, square));
        directMoves = directMoves.concat(this.directionalMoves(westLimit, westDirection, square));

        return directMoves;
    }

    directionalMoves(limit, direction, square) {
        let directionalMoves = []
        for (let i = 1; i < limit; i++) {
            let directionalMove = square + (direction)*i;
            if (this.canMove(directionalMove)) {
                directionalMoves.push(directionalMove);
                continue;
            }

            else if (this.canAttack(directionalMove)) {
                directionalMoves.push(directionalMove);
            }
            break;
        }
        return directionalMoves;
    }
}

class Pawn extends Piece {
    // Boolean for whether a pawn has moved off home row, to determine eligibiltiy to move forward two squares 
    moved = false;
    moveCounter = 0; 
    multiplier; 

    constructor(board, white, multiplier) {
        super(board, white)
        this.multiplier = multiplier;
    }

    calculateMoves(square) {
        this.moves = []
      
        const forwardSquare = square + 8*this.multiplier;
        if (this.canMove(forwardSquare)) {
            const forwardMove = new Move(square, forwardSquare, this, this.board.getPiece(forwardSquare))
            this.addMove(forwardMove);
        }

        const twoForwardSquare = square + 2*8*this.multiplier;
        if (!this.moved && this.canMove(twoForwardSquare)) {
            const twoForwardMove = new Move(square, twoForwardSquare, this, this.board.getPiece(twoForwardSquare))
            this.addMove(twoForwardMove);
        }

        // Check rank to be attacked is one more than rank of pawn to avoid attacking pawn on other side of board.
        const leftDiagonal = square + 7*this.multiplier;
        if (this.canAttack(leftDiagonal) && (BoardModel.getRank(square) - this.multiplier == BoardModel.getRank(leftDiagonal))) {
            const leftDiagonalMove = new Move(square, leftDiagonal, this, this.board.getPiece(leftDiagonal))
            this.addMove(leftDiagonalMove)
        }

        const rightDiagonal = square + 9*this.multiplier;
        if (this.canAttack(rightDiagonal) && (BoardModel.getRank(square) - this.multiplier == BoardModel.getRank(rightDiagonal))) {
            const rightDiagonalMove = new Move(square, rightDiagonal, this, this.board.getPiece(rightDiagonal))
            this.addMove(rightDiagonalMove)
        }
    }
}

class Knight extends Piece {

    static KNIGHT_MOVES = [-17, -15, -10, -6, 6, 10, 15, 17];

    calculateMoves(square) {
        this.moves = [];

        // Assuming that a move that teleports to the otherside of the board can't be 3 squares away from the source 
        for (let i = 0; i < Knight.KNIGHT_MOVES.length; i++) {
            const targetSquare = square + Knight.KNIGHT_MOVES[i];
    
            if ((BoardModel.manhattenDistance(square, targetSquare) == 3) &&(this.canMove(targetSquare) || this.canAttack(targetSquare))) {
                const knightMove = new Move(square, targetSquare, this, this.board.getPiece(targetSquare));
                this.addMove(knightMove);
            }
        }
    }
}

class Bishop extends Piece {
    calculateMoves(square) {
        this.moves = [];

        const diagonalMoves = this.calculateDiagonalMoves(square)
        for (let i = 0; i < diagonalMoves.length; i++) {
            const diagonalMove = new Move(square, diagonalMoves[i], this, this.board.getPiece(diagonalMoves[i]));
            this.addMove(diagonalMove);
        }
    }
}

class Rook extends Piece {
    calculateMoves(square) {
        this.moves = [];

        const directMoves = this.calculateDirectMoves(square)
        for (let i = 0; i < directMoves.length; i++) {
            const directMove = new Move(square, directMoves[i], this, this.board.getPiece(directMoves[i]));
            this.addMove(directMove);
        }
    }
}

class Queen extends Piece {
    calculateMoves(square) {
        this.moves = [];

        const directMoves = this.calculateDirectMoves(square)
        const diagonalMoves = this.calculateDiagonalMoves(square);
        
        for (let i = 0; i < directMoves.length; i++) {
            const directMove = new Move(square, directMoves[i], this, this.board.getPiece(directMoves[i]));
            this.addMove(directMove);
        }

        for (let i = 0; i < diagonalMoves.length; i++) {
            const diagonalMove = new Move(square, diagonalMoves[i], this, this.board.getPiece(diagonalMoves[i]));
            this.addMove(diagonalMove);
        }
    }
}

class King extends Piece {
    static KING_MOVES = [-9, -8, -7, 1, 9, 8, 7, -1];
    
    calculateMoves(square) {
        this.moves = [];

        for (let i = 0; i < King.KING_MOVES.length; i++) {
            const targetSquare = square + King.KING_MOVES[i];
            
            if ((BoardModel.manhattenDistance(square, targetSquare) <= 2) &&(this.canMove(targetSquare) || this.canAttack(targetSquare))) {
                const kingMove = new Move(square, targetSquare, this, this.board.getPiece(targetSquare))
                this.addMove(kingMove);
            }
        }
    }
}