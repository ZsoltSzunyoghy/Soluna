var initial_table = [6, 3, 2, 1];
var initial_table = [2, 2];

var table = [];
var symbols = "ABCDE";

var i, j;
for (i = 0; i < initial_table.length; i++) {
    for (j = 0; j < initial_table[i]; j++) {
        table.push({ icon: symbols[i], number: 1 });
    }
}

// table = [
//     { icon: 'A', number: 3 },
//     { icon: 'A', number: 1 },
//     { icon: 'A', number: 1 },
//     { icon: 'A', number: 1 },
//     { icon: 'B', number: 2 },
//     { icon: 'B', number: 1 },
//     { icon: 'C', number: 2 },
//     { icon: 'C', number: 1 }
//   ];

var steps = [];
var tables = [];


function canBeMerged(a, b) {
    if (a.icon == b.icon) {
        return true;
    } else if (a.number == b.number) {
        return true;
    } else {
        return false;
    }

}

function isMovePossible(t, f = 0) {

    if (f + 1 < t.length) {
        let i = f + 1;
        for (i = f + 1; i < t.length; i++) {
            if (canBeMerged(t[f], t[i])) {
                return true;
            }
        }

        return isMovePossible(t, f + 1);
    } else {
        return false;
    }
}

function mergeStacks(t, x, y) {
    let result = [];

    let i = 0;
    for (i = 0; i < t.length; i++) {
        if (i == x) {

        } else if (i == y) {
            result.push({ icon: t[x].icon, number: t[x].number + t[y].number });
        } else {
            result.push(t[i]);
        }
    }

    return result;
}

function unmergeStacks() {
    table = tables.pop();
    steps.pop();
    return table;
}

var previousSteps = [];
var previousLens = [];

function showNewResult(l, s) {
    let i;
    for (i = 0; i < previousSteps.length; i++) {
        if ((l == previousLens[i]) && (s == previousSteps[i])) {
            return;
        }
    }
    console.log(`${l} steps from ${s}`);
    previousSteps.push(s);
    previousLens.push(l);


}

function listPossibleMoves(t, l = 0) {

    //if (l > 5){return [];}
    //console.log(l);

    let result = [];

    if (t.length > 1) {

        let i = 0;
        let j = 0;
        for (i = 0; i < t.length; i++) {
            for (j = i + 1; j < t.length; j++) {
                if (canBeMerged(t[i], t[j])) {

                    let mt = mergeStacks(t, i, j);

                    if (isMovePossible(mt)) {
                        tables.push(t);
                        steps.push([i, j]);
                        listPossibleMoves(mt, l + 1);//.forEach(element => result.push([[i, j]].concat(element)));
                        t = unmergeStacks();
                    } else {
                        //show steps:
                        // console.log(steps.concat([[i,j]]));                          
                        showNewResult(steps.length + 1, steps.concat([[i, j]])[0]);
                    }


                    //check the reverse direction only if the symols are different:
                    if (t[i].icon != t[j].icon) {
                        let mtr = mergeStacks(t, j, i);

                        if (isMovePossible(mtr)) {
                            tables.push(t);
                            steps.push([j, i]);
                            listPossibleMoves(mtr, l + 1);//.forEach(element => result.push([[j, i]].concat(element)));
                            t = unmergeStacks();
                        } else {
                            //show steps:
                            // console.log(steps.concat([[j,i]]));
                            showNewResult(steps.length + 1, steps.concat([[j, i]])[0]);
                        }
                    }

                }
            }
        }
    }

    return result;
}


console.log(table);

let res = listPossibleMoves(table);
// console.log("Resulting moves:");
// console.log(res);

// let lens = res.map(e => e.length);
// console.log(lens);


console.log("result with only one outcome:");

var i = 0, j = 1, skip = false;
while (i < previousSteps.length) {

    //skip = false;

    j = i + 1;
    while ((j < previousSteps.length) && (previousSteps[i] == previousSteps[j])) {
        j++;
    }

    if (j - i > 1) {
        // previousSteps.slice(i, j);
        // previousLens.slice(i, j);
        i = j;
    } else {
        console.log(`${previousLens[i]} steps from ${previousSteps[i]}`);
        i++;
    }
}

