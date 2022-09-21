const fileInput = document.getElementById("file");
const textInput = document.getElementById("text");

const saveBtn = document.getElementById("save");
const destroyBtn = document.getElementById("destroy-btn");
const modeBtn = document.getElementById("mode-btn");
const eraserBtn = document.getElementById("eraser-btn");

const colorOptions = Array.from(document.getElementsByClassName("color-option"));
const color = document.querySelector("#color");

const lineWidth = document.querySelector("#line-width");
const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d"); //context

const CANVAS_WIDTH = 800;
const CANVAS_HEIGHT = 800;

canvas.width = CANVAS_WIDTH;
canvas.height = CANVAS_HEIGHT;
ctx.lineWidth = lineWidth.value;
ctx.lineCap = "round";


let isPainting = false;
let isFilling = false;




function onMove(event) {
    if (isPainting) {
        ctx.lineTo(event.offsetX, event.offsetY);
        ctx.stroke();
        return;
    }
    ctx.beginPath();
    ctx.moveTo(event.offsetX, event.offsetY);
    
}

function startPainting() {
    isPainting = true;
}

function cancelPainting() {
    isPainting = false;
}

function onLineWidthChange(event) {
    ctx.lineWidth = event.target.value;
}

function onColorChange(event) {
    ctx.strokeStyle = event.target.value;
    ctx.fillStyle = event.target.value;

}

function OnColorClick(event) {
    const colorValue = event.target.dataset.color;
    ctx.strokeStyle = colorValue;
    ctx.fillStyle = colorValue;
    color.value = colorValue;

}

function onModeClick() {
    if (isFilling) {
        isFilling = false;
        modeBtn.innerText = "Fill";
    }
    else {
        isFilling = true;
        modeBtn.innerText = "Draw";
    }
}

function onCanvasClick() {
    if(isFilling) {
        ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);

    }
}

function onDestroyClick() {
    if(confirm("Do you wanna remove your Meme?")) {
    ctx.fillStyle = "white";
    ctx.fillRect(0,0, CANVAS_WIDTH, CANVAS_HEIGHT);
    }
    
    
}

function onEraserClick() {
    ctx.strokeStyle = "white";
    isFilling = false;
    modeBtn.innerText = "Fill";
}

function onFileChange(event) {
    const file = event.target.files[0];
    const url = URL.createObjectURL(file); 
    const image = new Image();
    image.src = url;
    image.onload = function(){
        ctx.drawImage(image, 0, 0, 800, 800);
    }
    fileInput.value = null;
}

function onDoubleClick(event) {
    if (text !== ""){
        ctx.save();
    const text = textInput.value;
    ctx.lineWidth = 1;
    ctx.font = "68px serif";
    ctx.strokeText(text, event.offsetX, event.offsetY);
    ctx.restore();
    }
    
}

function onSaveClick() {
    const url = canvas.toDataURL();
    const a = document.createElement("a");
    a.href = url;
    a.download = "myDrawing.png";
    a.click();
}

canvas.addEventListener("dblclick", onDoubleClick); 
canvas.addEventListener("mousemove", onMove);
canvas.addEventListener("mousedown", startPainting);
canvas.addEventListener("mouseup", cancelPainting);
canvas.addEventListener("mouseleave", cancelPainting);
canvas.addEventListener("click", onCanvasClick);
lineWidth.addEventListener("change", onLineWidthChange);
color.addEventListener("change", onColorChange);

colorOptions.forEach(color => color.addEventListener("click", OnColorClick));
modeBtn.addEventListener("click", onModeClick);
destroyBtn.addEventListener("click", onDestroyClick);
eraserBtn.addEventListener("click", onEraserClick);
fileInput.addEventListener("change", onFileChange);
saveBtn.addEventListener("click", onSaveClick);