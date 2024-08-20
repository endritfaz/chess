class BoardModel {
    board = [];
    whitePlayer;
    whiteActive;
    castling;
    enPassantTarget;
    halfMoveClock;
    fullMoveCount;

    whitePieces = [];
    blackPieces = [];

    constructor(FEN) {
        const boardInformation = FEN.split(" ");
        const piecePlacement = boardInformation[0];
        const activeColor = boardInformation[1];
        this.castling = boardInformation[2];
        this.enPassantTargets = boardInformation[3];
        this.halfMoveClock = boardInformation[4];
        this.fullMoveCount = boardInformation[5];

        this.placePieces(piecePlacement);

        this.whiteActive = activeColor == 'w' ? true : false;
        
        // TODO: Add to constructor and allow user to switch by button. Will probably need a "game manager" class that changes both the model and the display
        this.whitePlayer = true;

        // Initialise the moveset for the active player
        
        this.calculateLegalMoves();
        console.clear()
    }

    calculateLegalMoves() {
        const activePieces = this.whiteActive ? this.whitePieces : this.blackPieces; 
        return this.calculateMoves(activePieces, true);
    }

    // Calculates all moves for a set of pieces. Legal controls whether the moves calcualated are legal or pseudolegal
    calculateMoves(pieces, legal) {
        let moves = [];
        for (let i = 0; i < pieces.length; i++) {
            
            pieces[i].calculateMoves(this.getSquare(pieces[i]));
            
            if (legal) {
                pieces[i].legaliseMoves()
            }

            moves = moves.concat(pieces[i].getMoves());
        }
        return moves;
    }

    // Updates after a move is made
    updateBoard(sourceSquare, targetSquare) {
        
        const move = this.getPiece(sourceSquare).getMove(sourceSquare, targetSquare);

        this.makeMove(move);
        console.log(this.enPassantTarget)
        // Calculate the moves for the next player given the latest move from the active player
        let moves = this.calculateLegalMoves();
        
        // Check for checkmate or stalemate
        if (moves.length == 0) {
            this.checkForEnding();
        }
        
    }

    checkForEnding() {
        let activeKingSquare = this.getSquare(this.getActiveKing());
        const inactivePieces = this.whiteActive ? this.blackPieces : this.whitePieces;
        const inactivePlayerMoves = this.calculateMoves(inactivePieces, false);

        for (let i = 0; i < inactivePlayerMoves.length; i++) {
            if (inactivePlayerMoves[i] == activeKingSquare) {
                console.log("checkmate");
                return;
            }
        }
        console.log("stalemate");
    }

    makeMove(move) {
        this.enPassantTarget = undefined;
        // Update pawn two rank move privileges 
        if (move.sourcePiece instanceof Pawn) {
            if (move.newEnPassantTargetAvailable()) {
                this.enPassantTarget = move.newEnPassantTarget;
            }

            move.sourcePiece.moved = true;
            move.sourcePiece.moveCounter += 1;
        }

        this.board[move.targetSquare] = move.sourcePiece;
        this.board[move.sourceSquare] = EMPTY;

        if (move.targetPiece != EMPTY) {
            let pieceSet = move.targetPiece.isWhite() ? this.whitePieces : this.blackPieces;
           
            let targetPieceIndex = pieceSet.indexOf(move.targetPiece);
            pieceSet.splice(targetPieceIndex, 1);
        }
        this.updateActiveTurn();
    }

    unmakeMove(move) {
        this.enPassantTarget = move.oldEnPassantTarget;
        // Update pawn two rank move privileges 
        if (move.sourcePiece instanceof Pawn) {
            move.sourcePiece.moveCounter -= 1; 

            if (move.sourcePiece.moveCounter == 0) {
                move.sourcePiece.moved = false;
            }
        }

        this.board[move.sourceSquare] = move.sourcePiece;
        this.board[move.targetSquare] = move.targetPiece;

        if (move.targetPiece != EMPTY) {
            let pieceSet = move.targetPiece.isWhite() ? this.whitePieces : this.blackPieces;
            pieceSet.push(move.targetPiece);
        }

        this.updateActiveTurn();
    }

    updateActiveTurn() {
        this.whiteActive = !this.whiteActive;
    }

    placePieces(piecePlacement) {
        for (let i = 0; i < piecePlacement.length; i++) {
            let token = piecePlacement[i];
            // Ignore row tokens 
            if (token == '/') {
                continue;
            }

            if (isNaN(token)) {
                // TODO: Pawn directionality - move this somewhere else
                let multiplier;
                let moved;
                let moveCount; 
                if (token.toLowerCase() == 'p') {
                    // TODO: This currently assumes black pieces will be on top of board, allow this to be changed dynamically
                    if (token != token.toUpperCase()) {
                        multiplier = 1;
                        moved = !(this.board.length >= 8 && this.board.length <= 15)
                        moveCount = moved == true ? 1 : 0;
                    }

                    else {
                        multiplier = -1;
                        moved = !(this.board.length >= 48 && this.board.length <= 55);
                        moveCount = moved == true ? 1 : 0; 
                    }
                }

                let piece = this.decodeFENToken(token, multiplier, moved, moveCount);
                this.board.push(piece);

                if (token == token.toUpperCase()) {
                    this.whitePieces.push(piece);
                }
                else {
                    this.blackPieces.push(piece);
                }

            }
            else {
                for (let j = 0; j < parseInt(token); j++) {
                    this.board.push(EMPTY);
                }
            }
        }
    }

    decodeFENToken(token, multiplier, moved, moveCount) {
        const white = (token == token.toUpperCase()) ? true : false;
        
        switch(token.toLowerCase()) {
            case 'p':
                return new Pawn(this, white, multiplier, moved, moveCount);
            case 'n':
                return new Knight(this, white);
            case 'b':
                return new Bishop(this, white);
            case 'r':
                return new Rook(this, white);
            case 'q':
                return new Queen(this, white);
            case 'k':
                return new King(this, white);
        }
    }

    isEmpty(square) {
        return this.board[square] == EMPTY;
    }

    getPiece(square) {
        return this.board[square];
    }

    getSquare(piece) {
        for (let i = 0; i < this.board.length; i++) {
            if (this.board[i] == piece) {
                return i; 
            }
        }
    }

    static inRange(square) {
        return square >= 0 && square < 64;
    }

    static getRank(square) {
        return (9 - (Math.floor(square/8) + 1));
    }

    static getFile(square) {
        return ((square % 8) + 1);
    }

    // Takes two squares in 1D, converts to 2D and finds manhatten distance between them
    static manhattenDistance(squareOne, squareTwo) {
        const squareOne2D = [BoardModel.getRank(squareOne), BoardModel.getFile(squareOne)];
        const squareTwo2D = [BoardModel.getRank(squareTwo), BoardModel.getFile(squareTwo)];

        const manhattenDistance = Math.abs(squareOne2D[0] - squareTwo2D[0]) + Math.abs(squareOne2D[1] - squareTwo2D[1]);

        return manhattenDistance;
    }

    getActiveKing() {
        let activePieces = this.whiteActive ? this.whitePieces : this.blackPieces;

        for (let i = 0; i < activePieces.length; i++) {
            if (activePieces[i] instanceof King) {
                return activePieces[i];
            }
        }
    }

    // Simulate the move to see if it would put the player's king in check
    // TODO: Possibly optimise this so not all of the inacive player moves need to be recalculated
    // Bugged
    isLegalMove(move) {
        let legalMove = true;
        const inactivePieces = this.whiteActive ? this.blackPieces : this.whitePieces;
        
        // Make the move but don't change turn 
        this.makeMove(move);
        this.updateActiveTurn();

        const activeKingSquare = this.getSquare(this.getActiveKing());
        
        const inactivePlayerMoves = this.calculateMoves(inactivePieces, false);
       
        
        // Check if king is being attacked (king square is in inactive player's moves)
        // TODO: Seperate normal moves from attacks and only search attacks 
        for (let i = 0; i < inactivePlayerMoves.length; i++) {
            if (inactivePlayerMoves[i].targetSquare == activeKingSquare) {
                legalMove = false;
            }
        }

        this.unmakeMove(move)
        this.updateActiveTurn();
        
        return legalMove;
    }
}