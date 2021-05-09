function solve(expression, selfobject) {
    // say solve => (A1 + A2)
    let elemts = expression.split(" ");
    // ['(', A1, '+' , 'A2' , ')']
    for (x in elemts) {
        let comp = elemts[x];
        if (comp[0] >= "A" && comp[0] <= "Z") {
            //get value of A1 from db 
            // I have found a parent !!
            if(selfobject) selfobject.parents.push(comp);
            let col = comp.charCodeAt(0) - 65;
            let row = Number(comp.substring(1)) - 1;
            let value = db[row][col].value;
            if (selfobject) { db[row][col].dependencies.push(selfobject.name); }
            expression = expression.replace(comp, value);
        }
    }
    let result = eval(expression);
    return result;
}

function updatedependencies(myobject) {
    // my object => B1;
    for (let i = 0; i < myobject.dependencies.length; i++) {
        // tum sab dubara calculate hoke aao
        // c1 c2 c3 .. c1 ko bolunga solve ursefl
        // get address of c1
        let child = myobject.dependencies[i];
        let col = child.charCodeAt(0) - 65;
        let row = Number(child.substring(1)) - 1;
        // c1 ke forumala ko dubara calculate kro

        let newval = solve(db[row][col].formula);
        //update ui
        document.querySelector(`div[rowid="${row}"][colid="${col}"]`).textContent = newval;

        // update db
        db[row][col].value = newval;
        updatedependencies(db[row][col]);
    }
}

function deleteme(myobject){
    
    db[rowno][colno].formula="";
    for(let i=0;i<myobject.parents.length;i++){
        let parnt = myobject.parents[i]; // A1
        let col = parnt.charCodeAt(0) - 65;
        let row = Number(parnt.substring(1)) - 1;
        // parnt ki dependency se mujko hatao
        db[row][col].dependencies=db[row][col].dependencies.filter(child =>{
            return child != myobject.name;
        })
    }
    //2. 
    myobject.parents=[];
}