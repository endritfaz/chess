const WHITE_START = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w - - 0 0";
const WHITE_START_PIECES = WHITE_START.split(" ")[0];

const container = document.querySelector(".container");

const boardModel = new BoardModel(WHITE_START);
console.log(boardModel.board);
const boardView = new BoardView();
boardView.placePieces("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR");
container.append(boardView.board);

const boardController = new BoardController(boardView, boardModel, true);