
function setBtnColor() {
    //console.log("function setBtnColor()");
    btnNormal.style.backgroundColor = btnCol;
    btnColor.style.backgroundColor = btnCol;
    btnDark.style.backgroundColor = btnCol;
    if(normalMode) {
        btnNormal.style.backgroundColor = btnBgColActive;
    };
    if(colorMode) {
        btnColor.style.backgroundColor = btnBgColActive;
    };
    if(darkMode) {  
        btnDark.style.backgroundColor = btnBgColActive;
    };
};


function changeColor(e) {
    //console.log("function changeColor()");
    // logic for color and darkening mode
    if(normalMode === true &&colorMode === false && darkMode === false) {
        e.target.style.backgroundColor = "black";
    };

    // color mode
    if(normalMode === false && colorMode === true && darkMode === false) {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
    };
    // dark mode
    if(normalMode === false && colorMode === false && darkMode === true) {
        // variable saves color... 255 - 10%
        // use regular Expression to get a list of colors (red, green, blue)
        let colorStr = getComputedStyle(e.target).backgroundColor;
        let regex = /\d+/g;
        let result = colorStr.match(regex);
        // creating new string with every color value set to - 25.5
        let newColorStr = "rgb(";
        for(let i=0; i < result.length; i++) {
            let num = +result[i] // string into number
            num -= 26;
            if(num < 0) { // if the result is smaller than 0, set 0
                num = 0;
            }
            //console.log(num);
            if(i === result.length - 1) { // last iteration
                newColorStr += num + ")";
                break;
            };
            newColorStr += num + ", ";

        };
        e.target.style.backgroundColor = newColorStr;
    };

};

// event column
// 1. if button is pressed an a new column is entered, call changeColor()
function mouseEnter(e) {
    //console.log("function mouseEnter()");
    mouseIn = true;
    if(btnPress) {
        changeColor(e);
    };
};

function mouseLeave() {
    //console.log("function mouseLeave()");
    mouseIn = false;
};

// event body
//2. if button is pressed and mouse is in an column, call changeColor()
function btnDown(e) {
    //console.log("function btnDown()")
    btnPress = true;
    if(mouseIn) {
        changeColor(e);
    };
};

// event body
function btnUp() {
    //console.log("function btnUp()");
    btnPress = false;
};

function setGrid(number, sizeSquare) {
    //console.log("function setGrid(number)");

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
            column.style.backgroundColor = "rgb(255,255,255)";
            // add event listener to every column;
            //column.addEventListener("mouseenter", changeColor);
            column.addEventListener("mouseenter", mouseEnter);
            column.addEventListener("mouseleave", mouseLeave);
            // append column to row
            row.appendChild(column);
        }
        // append row to container
        container.appendChild(row);
    };
};

function setSquareSize(number) {
    //console.log("function setSquareSize()");
    // calculate size of squares
    // 1. get container width
    // 2.calculate square width/height
    let sizeContainer = document.querySelector("#container").clientHeight;
    let size = sizeContainer / number;
    size = size +"px";
    return size;
};

function deleteOldGrid() {
    //console.log("function deleteOldGrid()");
    // check if a grid is there, if so delete before new created
    if (container.lastElementChild != null) {
        let child = container.lastElementChild;
        while(child) {
            container.removeChild(child);
            child = container.lastElementChild;
        };   
    };
};

function clearGrid() {
    //console.log("function clearGrid()");
    // get a node list of all columns
    let columns = document.querySelectorAll(".column");
    for(let i=0; i < columns.length; i++) {
        columns[i].style.backgroundColor = "white";
    };
};

function main(e) {  
    //console.log("function main()");
    // 1. remove old grid if there is one
    deleteOldGrid();
    let number;
    if(e != 50) {
        number = e.target.value;
    } else {
        number = 50;
        normalMode = true;
    };
    // 2. calculate size of a square
    let sizeSquare = setSquareSize(number);
    // 3. create Grid
    setGrid(number, sizeSquare);
};


let btnPress = false;
let mouseIn = false;
let normalMode = false;
let colorMode = false;
let darkMode = false;
let initialGrid = 50;
let btnCol = "rgb(56, 56, 58)";
let btnBgColActive = "rgb(0, 0, 0)";

const container = document.querySelector("#container");
const btnClear = document.querySelector("#btnClear");
const btnNormal = document.querySelector("#btnNormal");
const btnColor = document.querySelector("#btnColor");
const btnDark = document.querySelector("#btnDark");
const inputSlider = document.querySelector("#inputSlider");
const html = document.querySelector("html");

html.addEventListener("mousedown", btnDown); // container. 
html.addEventListener("mouseup", btnUp); // container.

btnClear.addEventListener("click", clearGrid); // container.

btnNormal.addEventListener("click", () => {
    normalMode = true;
    colorMode = false;
    darkMode = false;
    setBtnColor();
});

btnColor.addEventListener("click", () => {
    normalMode = false;
    colorMode = true;
    darkMode = false;
    setBtnColor();
    
});

btnDark.addEventListener("click", () => {
    normalMode = false;
    colorMode = false;
    darkMode = true;
    setBtnColor();
});

inputSlider.addEventListener("change", (e) => {
    main(e);
});

container.addEventListener("mousedown", (e) => { // prevent drag and drop behavior
    e.preventDefault();
});


// drag and drop behavior should only allowed over slider because of text selection bug
html.addEventListener("mousemove", (e) => {
    if(e.target != inputSlider) {
        e.preventDefault()
    };
});

// on first load grid will be created
main(initialGrid);
btnNormal.style.backgroundColor = btnBgColActive;