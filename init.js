// 1. dynamically append 2600 cells
let cellgrid = document.querySelector(".cell-content");
let cells = "";
cells += `<div class="top-right-cell"></div>`
cells += `<div class="top-row">`
for (let i = 0; i < 26; i++) {
    cells += `<div class="top-row-cell">${String.fromCharCode(65 + i)}</div>`
}
cells += `</div>`;
cells += `<div class="left-col">`
for (let i = 0; i < 100; i++) {
    cells += `<div class="left-col-cell">${i + 1}</div>`
}
cells += `</div>`;
cells += `<div class="cells">`
for (let i = 0; i < 100; i++) {
    cells += `<div class="row">`;
    for (let j = 0; j < 26; j++) {
        cells += `<div class="cell" rowid="${i}" colid="${j}" contenteditable="true"></div>`;
    }
    cells += `</div>`;
}
cells += `</div>`;
// convert string to html
cellgrid.innerHTML = cells;


// 2. Initialise a local database

let sheetdb=[];
let db;

function initdb(){
    let newdb=[];
    for (let i = 0; i < 100; i++) {
        let row = [];
        for (let j = 0; j < 26; j++) {
            // name = A1 => i decides no and j decides alphabet
            let rowno=i+1;
            let colno=String.fromCharCode(65+j);
            let a=colno+rowno;
            
            let object = {
                "name":a,
                "value":"",
                "formula":"",
                "dependencies":[],
                "parents":[]
            }
            row.push(object);
        }
        newdb.push(row);
    }
    db=newdb;
    sheetdb.push(newdb);
}
initdb();

function initUI(arr){
    for(let i=0;i<allcells.length;i++){
       allcells[i].textContent="";
    }
}

// function loadUI(arr){for(let i=0;i<100;i++){for(let j=0;j<26;j++){document.querySelector(`div[rowid="${i}"][colid="${j}"]`).textContent=arr[i][j].value;}}}

function loadUI(arr){
    for(let i=0;i<allcells.length;i++){
        // bring rowid and colid from ith cell
        let rowz = allcells[i].getAttribute("rowid");
        let colz= allcells[i].getAttribute("colid");
        // set textcontent
        allcells[i].textContent=db[rowz][colz].value;
    }
}