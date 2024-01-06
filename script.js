function hover(e) {
    console.log("function hover()");
    //console.log(e.target);
    e.target.style.backgroundColor = "black";

}


function setSquareSize(number) {
    console.log("function setSquareSize()");

    // calculate size of squares
    // 1. get container width
    let sizeContainer = document.querySelector("#container").clientWidth;
    console.group(sizeContainer);
    // 2.calculate square width/height
    let size = (sizeContainer / number);
    size = size +"px";
    console.log(size)
    return size;

}


function setGrid(number) {
    console.log("function setGrid()");
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

    let sizeSquare = setSquareSize(number);
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
            column.addEventListener("mouseover", hover)
            // append column to row
            row.appendChild(column);
        }
        // append row to container
        container.appendChild(row);
    }
}

function getSquareCount() {
    console.log("function getSquareCount()");
    // get user input
    let number = +(window.prompt("How many squares in row and column?"));
    //console.log(number);
    
    // check if user input is a number and not bigger than 100
    if (number === number && number <= 100) {
        setGrid(number);
    }
}




let btnGrid = document.querySelector("#btnGrid").addEventListener("click", getSquareCount);
//btnGrid.window.prompt("How many squares per side?")

const container = document.querySelector("#container");
 // create row outside of loop because namespace
//setGrid();



