var initial_table = [6, 3, 2, 1];
//var initial_table = [2, 1, 1, 1];

var table = [];
var symbols = "ABCDE";

var i, j;
for (i = 0; i < initial_table.length; i++) {
    for (j = 0; j < initial_table[i]; j++) {
        table.push({ icon: symbols[i], number: 1 });
    }
}

// table = [
//     { icon: 'A', number: 1 },
//     { icon: 'A', number: 1 },
//     { icon: 'B', number: 3 },
//     { icon: 'C', number: 2 },
//     { icon: 'D', number: 1 }
//   ];


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

function listPossibleMoves(t, l = 0, f = 0) {

    if (l > 5){return [];}

    let result = [];

    if (f + 1 < t.length) {

        let i = f + 1;
        for (i = f + 1; i < t.length; i++) {
            if (canBeMerged(t[f], t[i])) {

                let mt = mergeStacks(t, f, i);

                if (isMovePossible(mt)) {
                    listPossibleMoves(mt, l + 1).forEach(element => result.push([[f, i]].concat(element)));
                    if (l > 15) {
                        console.log("intermediate results:");
                        console.log(result);
                    }
                } else {
                    result.push([[f, i]]);
                }


                let mtr = mergeStacks(t, i, f);

                if (isMovePossible(mtr)) {
                    listPossibleMoves(mtr, l + 1).forEach(element => result.push([[i, f]].concat(element)));
                } else {
                    result.push([[i, f]]);
                }

            }
        }

        result = result.concat(listPossibleMoves(t, l, f + 1));

    }

    return result;
}


console.log(table);

let res = listPossibleMoves(table);
console.log("Resulting moves:");
console.log(res);

let lens = res.map(e => e.length);
console.log(lens);