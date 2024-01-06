
function createGrid() {

    for(let i=0; i < 16; i++) {
        console.log("loop 1 start");
        // create one row
        row = document.createElement("div");
        row.setAttribute("class", "row");
        for(let j=0; j < 16; j++) {
            // create column
            let column = document.createElement("div");
            column.setAttribute("class", "column")
            // add event listener to every column;
            column.addEventListener("mouseover", hover)
            // append column to row
            row.appendChild(column);
        }
        // append row to container
        container.appendChild(row);
    }
}

function hover(e) {
    console.log(e.target);
    e.target.style.backgroundColor = "black";

}

const container = document.querySelector("#container");
let row; // create row outside of loop because namespace
createGrid();
console.log(row);


