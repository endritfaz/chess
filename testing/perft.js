function perftCaller(FENCode, depth) {
    const board = new BoardModel(FENCode);
    return perft(board, depth);
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


console.log(perftCaller(WHITE_START, 4));