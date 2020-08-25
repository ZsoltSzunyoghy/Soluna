var initial_table = [6, 3, 2, 1];

var table = [];
var symbols = "ABCDE";

var i, j;
for (i = 0; i < initial_table.length; i++) {
    for (j = 0; j < initial_table[i]; j++) {
        table.push({ icon: symbols[i], number: 1 });
    }
}

// situation with a solution:
table = [
    { icon: 'A', number: 1 },
    { icon: 'A', number: 1 },
    { icon: 'A', number: 1 },
    { icon: 'B', number: 1 },
    { icon: 'B', number: 1 },
    { icon: 'B', number: 1 },
    { icon: 'C', number: 2 },
    { icon: 'C', number: 1 },
    { icon: 'C', number: 1 },
    { icon: 'C', number: 1 },
    { icon: 'C', number: 1 }
];

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

    //preserve previous state for unmerge action:
    tables.push(t);

    return result;
}

function unmergeStacks() {
    table = tables.pop();
    return table;
}

// when it is my turn:
// I can win if there is one move which makes me win
function canIWinInThisSituation(t, l = 0) {

    if (!isMovePossible(t)) {
        return [];
    }

    let i = 0, j = 0;
    for (i = 0; i < t.length; i++) {
        for (j = i + 1; j < t.length; j++) {
            if (canBeMerged(t[i], t[j])) {

                let mt = mergeStacks(t, i, j);
                if (canIWinWithThisMove(mt, l + 1)) {
                    t = unmergeStacks();
                    return [i, j];
                }
                t = unmergeStacks();


                //check the reverse direction only if the symols are different:
                if (t[i].icon != t[j].icon) {
                    let mtr = mergeStacks(t, j, i);
                    if (canIWinWithThisMove(mtr, l + 1)) {
                        t = unmergeStacks();
                        return [j, i];
                    }
                    t = unmergeStacks();
                }

            }
        }
    }

    return [];
}

// when it is the opponents turn
// I can win if all the moves of the opponent fail
// Consequently if there is a move for my opponent which leads to a situation I cannot win, I cannot win with this move
function canIWinWithThisMove(t, l = 0) {

    if (!isMovePossible(t)) {
        return true;
    }

    let i = 0, j = 0;
    for (i = 0; i < t.length; i++) {
        for (j = i + 1; j < t.length; j++) {
            if (canBeMerged(t[i], t[j])) {

                let mt = mergeStacks(t, i, j);
                if (canIWinInThisSituation(mt, l + 1).length == 0) {
                    t = unmergeStacks();
                    return false;
                }
                t = unmergeStacks();


                //check the reverse direction only if the symols are different:
                if (t[i].icon != t[j].icon) {
                    let mtr = mergeStacks(t, j, i);
                    if (canIWinInThisSituation(mtr, l + 1).length == 0) {
                        t = unmergeStacks();
                        return false;
                    }
                    t = unmergeStacks();
                }

            }
        }
    }

    return true;
}

console.log(table);
console.log("The winning move is:");
console.log(canIWinInThisSituation(table));
