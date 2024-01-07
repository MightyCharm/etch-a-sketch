
// event column
// 1. if button is pressed an a new column is enter, set background color
function mouseEnter(e) {
    console.log("function mouseEnter()");
    mouseIn = true;
    if(btnPress) {
        e.target.style.backgroundColor = "black";
    }
    //console.log("mouseIn: " + mouseIn);
    
}

// event column
function mouseLeave() {
    //console.log("function mouseLeave()");
    mouseIn = false;
    //console.log("mouseIn: " + mouseIn);
}

// event body
//2. if button is pressed and mouse is in an column, set background color
function btnDown(e) {
    console.log("function btnDown()")
    //console.log("function buttonDown()")
    // preventDefault() should only be active if there is a Grid
    // because slider won't work
    if(container.lastElementChild != null) {
        e.preventDefault();
    }
    btnPress = true;
    if(mouseIn) {
        e.target.style.backgroundColor = "black";
    }
    console.log("btnPress: " + btnPress);
};

// event body
function btnUp() {
    //console.log("function buttonUp()");
    btnPress = false;
    console.log("btnPress: " + btnPress);
};

function setGrid(number, sizeSquare) {
    console.log("function setGrid(number)");

    for(let i=0; i < number; i++) {
        // create one row
        let row = document.createElement("div");
        row.setAttribute("class", "row");
        for(let j=0; j < number; j++) {
            // create column
            let column = document.createElement("div");
            column.setAttribute("class", "column")
            column.style.width = sizeSquare;
            column.style.height = sizeSquare;
            // add event listener to every column;
            //column.addEventListener("mouseenter", changeColor);
            column.addEventListener("mouseenter", mouseEnter);
            column.addEventListener("mouseleave", mouseLeave);
            // append column to row
            row.appendChild(column);
        }
        // append row to container
        container.appendChild(row);
    }
};

function setSquareSize(number) {
    console.log("function setSquareSize()");
    // calculate size of squares
    // 1. get container width
    //let sizeContainer = document.querySelector("#container").clientWidth;
    console.group(document.querySelector("#container").clientHeight);
    // 2.calculate square width/height
    let sizeContainer = 800;
    let size = sizeContainer / number;
    size = size +"px";
    return size;
};

function deleteOldGrid() {
    console.log("function deleteOldGrid()");
    // check if a grid is there, if so delete before new created
    if (container.lastElementChild != null) {
        let child = container.lastElementChild;
        while(child) {
            container.removeChild(child);
            child = container.lastElementChild;
        };
        console.log("====>")
        console.log(container.lastElementChild);   
    }
  
    // button Grid active button clear inactive
    btnGrid.disabled = false;
    btnClear.disabled = true;
    console.log("xxx")
};


function getSquareCount() {
    console.log("function getSquareCount()");
    // get user input
    //let number = +(window.prompt("How many squares in row and column?"));
    let number = document.querySelector("#inputSlider").value;
    // check if user input is a number and not bigger than 100
    if (number === number && number <= 100) {
        //setGrid(number);
        return number;
    }
}


function main() {
    console.log("function main()");
    // btnClear now active
    btnClear.disabled = false;
    // 1. get user input
    let number = getSquareCount();
    // 2 check if a grid is there, if so delete old grid
    //deleteOldGrid();
    // 3. calculate size of a square
    let sizeSquare = setSquareSize(number);
    // 3. create Grid
    setGrid(number, sizeSquare);
};


let btnPress = false;
let mouseIn = false;
const btnClear = document.querySelector("#btnClear");
btnClear.addEventListener("click", deleteOldGrid);
btnClear.disabled = true;
const btnGrid = document.querySelector("#btnGrid")
btnGrid.addEventListener("click", (e) => {
    // disable btnGird
    e.target.disabled = true;
    main()
});

const container = document.querySelector("#container");
//container.style.height = "900px";
//container.style.width = "900px";


let body = document.querySelector("body");
body.addEventListener("mousedown", btnDown); 
body.addEventListener("mouseup", btnUp);
