const canvas = document.querySelector("#jsCanvas");
const ctx = canvas.getContext('2d');

const colors = document.querySelectorAll(".jsColor");

const range = document.querySelector("#jsRange");

const mode = document.querySelector("#jsMode");
const saveButton = document.querySelector("#jsSave");

const INITIAL_COLOR = "black"

canvas.width = canvas.offsetWidth;
canvas.height = canvas.offsetHeight;

ctx.strokeStyle = INITIAL_COLOR;
ctx.fillStyle = INITIAL_COLOR;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;


function startPainting(){
    painting = true;
}

function stopPainting(){
    painting = false;
}


function onMouseMove(event){
    const x = event.offsetX;
    const y = event.offsetY;

    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    }else{
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}

function handleRangeChange(event){
    ctx.lineWidth = event.target.value;
}

function handleColorClick(event){
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx.fillStyle = color;
}

function handleModeClick(event){
    if(filling === true){
        filling = false;
        mode.innerText = "Fill";
    }else{
        filling = true;
        mode.innerText = "Paint";
    }
}

function handleCanvasClick(event){
    if(filling)
        ctx.fillRect(0, 0, canvas.width, canvas.height);
}

function handleContextMenu(event){
    event.preventDefault(); // 기존 정의되어있던 것을 실행하지 않음
}

function handleSaveClick(event){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "paintJS_image";
    link.click();
}


if(canvas){
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleaver", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
    canvas.addEventListener("contextmenu", handleContextMenu);
}

colors.forEach(color => color.addEventListener("click", handleColorClick));

if(range)
    range.addEventListener("input", handleRangeChange);

if(mode)
    mode.addEventListener("click", handleModeClick);

if(saveButton)
    saveButton.addEventListener("click", handleSaveClick);