
function changeColor(e) {
    console.log("function changeColor()");
    // logic for color and darkening mode
    if(colorMode === false && darkMode === false) {
        e.target.style.backgroundColor = "black";
    };

    // color mode
    if(colorMode === true && darkMode === false) {
        let red = Math.floor(Math.random() * 256);
        let green = Math.floor(Math.random() * 256);
        let blue = Math.floor(Math.random() * 256);
        e.target.style.backgroundColor = `rgb(${red},${green},${blue})`;
    };
    // dark mode
    if(colorMode === false && darkMode === true) {
        // variable saves color... 255 - 10%
        console.log(e.target.style.backgroundColor);
        // get color
        // color -10%
        console.log("uhhhh yeah  darkMode");
    };

};

// event column
// 1. if button is pressed an a new column is entered, call changeColor()
function mouseEnter(e) {
    //console.log("function mouseEnter()");
    mouseIn = true;
    if(btnPress) {
        changeColor(e);
    }
};

// event column
function mouseLeave() {
    //console.log("function mouseLeave()");
    mouseIn = false;
    //console.log("mouseIn: " + mouseIn);
};

// event body
//2. if button is pressed and mouse is in an column, call changeColor()
function btnDown(e) {
    //console.log("function btnDown()")
    // slider only works if there is not grid
    if(container.lastElementChild != null) {
        e.preventDefault();
    };
    btnPress = true;
    if(mouseIn) {
        changeColor(e);
    };
    //console.log("btnPress: " + btnPress);
};

// event body
function btnUp() {
    //console.log("function buttonUp()");
    btnPress = false;
    //console.log("btnPress: " + btnPress);
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
    };
};

function setSquareSize(number) {
    console.log("function setSquareSize()");
    // calculate size of squares
    // 1. get container width
    // 2.calculate square width/height
    let sizeContainer = document.querySelector("#container").clientHeight;
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
    };
};

function clearGrid() {
    //console.log("function clearGrid()");
    // get a nodelist of all columns
    let columns = document.querySelectorAll(".column");
    for(let i=0; i < columns.length; i++) {
        columns[i].style.backgroundColor = "white";
    };
};


function main(e) {

    console.log("function main()");
    // remove old grid if there is one
    deleteOldGrid();
    let number;
    if(e != 50) {
        number = e.target.value;
    } else {
        number = 50;
    };
    console.log("number: " + number);
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

const container = document.querySelector("#container");
const btnClear = document.querySelector("#btnClear");
const btnNormal = document.querySelector("#btnNormal");
const btnColor = document.querySelector("#btnColor");
const btnDark = document.querySelector("#btnDark");
const InputSlider = document.querySelector("#inputSlider");

container.addEventListener("mousedown", btnDown); 
container.addEventListener("mouseup", btnUp);

btnClear.addEventListener("click", clearGrid);


btnNormal.addEventListener("click", () => {
    normalMode = true;
    colorMode = false;
    darkMode = false;
});

btnColor.addEventListener("click", () => {
    normalMode = false;
    colorMode = true;
    darkMode = false;
    
});

btnDark.addEventListener("click", () => {
    normalMode = false;
    colorMode = false;
    darkMode = true;
});


InputSlider.addEventListener("change", (e) => {
    main(e);
})

// on first load grid will be created
main(initialGrid);

