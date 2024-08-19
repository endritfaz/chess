const WHITE_START = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 0";
const TEST = "8/2p5/3p4/KP5r/1R3p1k/8/4P1P1/8 w - -";
const WHITE_START_PIECES = WHITE_START.split(" ")[0];
const TEST_PIECES = TEST.split(" ")[0];

const container = document.querySelector(".container");

const boardModel = new BoardModel(WHITE_START);
console.log(boardModel.board);
const boardView = new BoardView();
boardView.placePieces(WHITE_START_PIECES);
container.append(boardView.board);

const boardController = new BoardController(boardView, boardModel, true);