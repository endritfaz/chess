class Move {
    sourceSquare;
    targetSquare;
    sourcePiece;
    targetPiece;
    
    oldEnPassantTarget;
    newEnPassantTarget; 

    constructor(sourceSquare, targetSquare, sourcePiece, targetPiece) {
        this.sourceSquare = sourceSquare;
        this.targetSquare = targetSquare;
        this.sourcePiece = sourcePiece;
        this.targetPiece = targetPiece;
    }

    newEnPassantTargetAvailable() {
        return this.newEnPassantTarget != undefined; 
    }
}

class EnPassantMove extends Move {
    capturedSquare;
    capturedPiece;

    constructor(sourceSquare, targetSquare, capturedSquare, sourcePiece, capturedPiece) {
        super();
        this.sourceSquare = sourceSquare;
        this.targetSquare = targetSquare;
        this.capturedSquare = capturedSquare;
        this.sourcePiece = sourcePiece;
        this.capturedPiece = capturedPiece;
    }
}