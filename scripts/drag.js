let dragged;

// TODO: Will work with board representation to calculate where the piece being dragged is able to move (add dragover and drop event handlers)
function setDropZones() {}

function removeDropZones() {}

// For an element to be draggable it needs both the draggable tag and the dragstart event handler
function dragstartHandler(ev) {
    dragged = ev.target;
    setDropZones(dragged.parentNode);
}

// For an element to be a drop zone, it must listen to both dragover and drop events
function dragoverHandler(ev) {
    ev.preventDefault();
}

function dropHandler(ev) {
    ev.preventDefault();
    dragged.parentNode.removeChild(dragged);
    ev.target.appendChild(dragged);
}

function dragendHandler(ev) {
    removeDropZones(dragged.parentNode);
    console.log("dragend")
}

const piecesView = document.querySelectorAll(".piece");
for (let i = 0; i < pieces.length; i++) {
    piecesView[i].addEventListener("dragstart", dragstartHandler);
    piecesView[i].addEventListener("dragend", dragendHandler);
}
