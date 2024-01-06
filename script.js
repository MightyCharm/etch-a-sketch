function changeColor(e) {
    console.log("function hover(e)");
    //console.log(e.target);
    if(btnPress) {
        e.target.style.backgroundColor = "black";
    }
}

function buttonDown() {
    //console.log("function buttonDown()")
    btnPress = true;
    console.log(btnPress);
}


function buttonUp() {
    //console.log("function buttonUp");
    btnPress = false;
    console.log(btnPress);
}


  
function setGrid(number, sizeSquare) {
    console.log("function setGrid(number)");
    console.log("number: " + number)
    console.log("sizeSquare: " + sizeSquare);
    //let sizeSquare = setSquareSize(number);
    //console.log(sizeSquare);
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
            column.addEventListener("mouseover", changeColor);
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
    let sizeContainer = document.querySelector("#container").clientWidth;
    //console.group(sizeContainer);
    // 2.calculate square width/height
    let size = (sizeContainer / number);
    size = size +"px";
    console.log(size)
    return size;
};

function deleteOldGrid() {
    console.log("function deleteOldGrid()");
    // check if a grid is there, if so delete before new created
    if (container.lastElementChild != null) {
        let child = container.lastElementChild;
        console.log(child);
        while(child) {
            container.removeChild(child);
            child = container.lastElementChild;
        };
        console.log("====>")
        console.log(container.lastElementChild);   
    }
};


function getSquareCount() {
    console.log("function getSquareCount()");
    // get user input
    let number = +(window.prompt("How many squares in row and column?"));
    //console.log(number);
    
    // check if user input is a number and not bigger than 100
    if (number === number && number <= 100) {
        //setGrid(number);
        return number;
    }
}


function main() {
    console.log("function main()");
    // 1. get user inut
    let number = getSquareCount();
    console.log(number);
    // 2 check if a grid is there, if so delete old grid
    deleteOldGrid();
    // 3. calculate size of a square
    let sizeSquare = setSquareSize(number);
    // 3. create Grid
    setGrid(number, sizeSquare);
};

let btnGrid = document.querySelector("#btnGrid").addEventListener("click", main);
const container = document.querySelector("#container");


let body = document.querySelector("body");
console.log(body);

let btnPress = false;
body.addEventListener("mousedown", buttonDown) 
body.addEventListener("mouseup", buttonUp)


