let dragged;

function setDropZones() {
    const a7 = document.querySelector(".target");
    a7.addEventListener("drop", dropHandler);
    a7.addEventListener("dragover", dragoverHandler);
}

function removeDropZones() {
    const a7 = document.querySelector(".target");
    a7.removeEventListener("drop", dropHandler);
    a7.removeEventListener("dragover", dragoverHandler);
}
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

const pawn = document.querySelector(".piece");
pawn.addEventListener("dragstart", dragstartHandler);
pawn.addEventListener("dragend", dragendHandler);

