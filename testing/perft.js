function perftCaller(FENCode, depth) {
    const board = new BoardModel(FENCode);

    let totalNodes = 0; 
    const legalMoves = board.calculateLegalMoves(); 

    for (let i = 0; i < legalMoves.length; i++) {
        board.makeMove(legalMoves[i]);
        console.log(`${BoardModel.getFile(legalMoves[i].sourceSquare)}${BoardModel.getRank(legalMoves[i].sourceSquare)}->${BoardModel.getFile(legalMoves[i].targetSquare)}${BoardModel.getRank(legalMoves[i].targetSquare)}: ${totalNodes += perft(board, depth - 1)}`);
        board.unmakeMove(legalMoves[i]);
    }

    return totalNodes;
}

function perft(board, depth) {
    if (depth == 0) {
        return 1;
    }

    let totalNodes = 0; 
    const legalMoves = board.calculateLegalMoves(); 

    for (let i = 0; i < legalMoves.length; i++) {
        board.makeMove(legalMoves[i]);
        totalNodes += perft(board, depth - 1);
    
        board.unmakeMove(legalMoves[i]);
    }
    return totalNodes;
}


console.log(perftCaller(WHITE_START, 5));