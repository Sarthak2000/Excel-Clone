let toprow = document.querySelector(".top-row");
let topleftbox = document.querySelector(".top-right-cell");
let leftcol = document.querySelector(".left-col");
let cellz = document.querySelector(".cells");
let allcells = document.querySelectorAll(".cell");
let formulaInput = document.querySelector("#formula");
let rowno;
let colno;
let lastcellselected;

// fix the top & left colomns on scroll
cellgrid.addEventListener("scroll", function (e) {
    let nh = e.target.scrollTop;
    let nl = e.target.scrollLeft;
    toprow.style.top = nh + "px";
    topleftbox.style.top = nh + "px";
    topleftbox.style.left = nl + "px";
    leftcol.style.left = nl + "px";
})

cellz.addEventListener("click", function (e) {
    
    // 1.click and change color
    if (e.target.classList.contains("click-border")) {
        return;
    }
    if (document.querySelector(".click-border")) {
        document.querySelector(".click-border").classList.remove("click-border");
    }
    
    e.target.classList.add("click-border");
    
    // 2. Add address to the address bar
    rowno = Number(e.target.getAttribute("rowid"));
    let k = rowno + 1;
    colno = Number(e.target.getAttribute("colid"));
    colnos = String.fromCharCode(65 + colno);
    // set value of address
    let add = document.querySelector("#address");
    add.value = colnos + k;
    
    // 3. if i click on cell then display its formula in formula tab
    formulaInput.value = db[rowno][colno].formula;
})

// 3. make changes in the database if a valued is entered;
for (let i = 0; i < allcells.length; i++) {
    allcells[i].addEventListener("blur", function (e) {
        lastcellselected = e.target;
        // get value entered in cell
        let valuez = e.target.textContent;
        if (valuez != db[rowno][colno].value){
            // 1. IF FORMULA EXITS THEN DELETE THE FORMULA
            if(formulaInput.value){
                // parents ki dependency se muje hatao aur mere parents bi hatado
                deleteme(db[rowno][colno]);
                console.log(db);
            }
            // if value is same as that of what cell already has
            db[rowno][colno].value = valuez;
            updatedependencies(db[rowno][colno]);
        }
    })
}

// 4. calculate and store the formula entered by the user
formulaInput.addEventListener("blur", function (e) {
    if (formulaInput.value && lastcellselected) {
        if(db[rowno][colno].formula){
            deleteme(db[rowno][colno]);
        }
        let solvedvalue = solve(formulaInput.value, db[rowno][colno]);
        // update ui => put the solved value in lastcellselected
        lastcellselected.textContent = solvedvalue;
        //updata database
        db[rowno][colno].value = solvedvalue;
        db[rowno][colno].formula = formulaInput.value;
        updatedependencies(db[rowno][colno]);
        console.log(db);
    }
})
