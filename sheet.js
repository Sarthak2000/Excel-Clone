let plus = document.querySelector(".add-sheet");
let sheetlst = document.querySelector(".sheet-list");
let allsheets = document.querySelectorAll(".sheet")
let sheetno = 0;

plus.addEventListener("click", function (e) {
    sheetno += 1;
    document.querySelector(".active-class").classList.remove("active-class");
    let div = document.createElement("div");
    div.classList.add("sheet");
    div.classList.add("active-class");
    div.setAttribute("sid", sheetno);
    div.textContent = `Sheet ${sheetno + 1}`;
    sheetlst.append(div);

    initdb();
    initUI();
    console.log(db);

})

sheetlst.addEventListener("click", function (e) {
    // 1.change active class
    if(e.target.classList.contains("active-class")){
        return;
    }
    document.querySelector(".active-class").classList.remove("active-class");
    let sn = e.target.getAttribute("sid");
    let elmt = document.querySelector(`div[sid="${sn}"]`);
    elmt.classList.add("active-class");
    
    
    //2. change db reference
    db=sheetdb[sn];
    //3.load prev db
    loadUI(db);
})

