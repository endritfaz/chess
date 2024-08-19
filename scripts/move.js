class Move {
    sourceSquare;
    targetSquare;
    sourcePiece;
    targetPiece;

    initialPawnMove;
    
    constructor(sourceSquare, targetSquare, sourcePiece, targetPiece) {
        this.sourceSquare = sourceSquare;
        this.targetSquare = targetSquare;
        this.sourcePiece = sourcePiece;
        this.targetPiece = targetPiece;
    }
}