var height = 20, width = 10;

var state = new Array(height);
for (var h = 0; h < height; h++) {
    state[h] = new Array(width);
    for (var w = 0; w < width; w++) {
        state[h][w] = 0;
    }
}
state.locked = false;

var shape1 = [
    [
        [2, 2, 2],
        [2, 0, 0]
    ],
    [
        [2, 2],
        [0, 2],
        [0, 2]
    ],
    [
        [0, 0, 2],
        [2, 2, 2]
    ],
    [
        [2, 0],
        [2, 0],
        [2, 2]
    ]
];

var shape2 = [
    [
        [2, 2],
        [2, 2]
    ]
];

var shape3 = [
    [
        [2, 2, 2],
        [0, 0, 2]
    ],
    [
        [0, 2],
        [0, 2],
        [2, 2]
    ],
    [
        [2, 0, 0],
        [2, 2, 2]
    ],
    [
        [2, 2],
        [2, 0],
        [2, 0]
    ]
];

var shape4 = [
    [
        [2],
        [2],
        [2],
        [2]
    ],
    [
        [2, 2, 2, 2]
    ]
];

var shape5 = [
    [
        [2, 2, 0],
        [0, 2, 2]
    ],
    [
        [0, 2],
        [2, 2],
        [2, 0]
    ]
];

var shape6 = [
    [
        [2, 2, 2],
        [0, 2, 0]
    ],
    [
        [0, 2],
        [2, 2],
        [0, 2]
    ],
    [
        [0, 2, 0],
        [2, 2, 2]
    ],
    [
        [2, 0],
        [2, 2],
        [2, 0]
    ]
];

var shape7 = [
    [
        [0, 2, 2],
        [2, 2, 0]
    ],
    [
        [2, 0],
        [2, 2],
        [0, 2]
    ]
];

var shapes = [shape1, shape2, shape3, shape4, shape5, shape6, shape7];

var shape = [];
var shapeIndex = 0;

var nextShape = shapes[Math.floor(Math.random() * shapes.length)];

var point = null;

(function () {
    var style = document.createElement('style');
    style.innerHTML += 'table { height: 100%; border-collapse: collapse}\n';
    style.innerHTML += 'td { border: 1px solid lightgray; padding: 0px}\n';
    document.getElementsByTagName('head')[0].appendChild(style);

    var tbody = document.createElement('tbody');
    for (var h = 0; h < height; h++) {
        var tr = document.createElement('tr');
        for (var w = 0; w < width; w++) {
            var td = document.createElement('td');
            tr.appendChild(td);
        }
        tbody.appendChild(tr);
    }
    var table = document.createElement('table');
    table.appendChild(tbody);
    document.getElementById('tetris').appendChild(table);

    // TODO: Make it responsive
    var clientHeight = document.getElementsByTagName('td')[0].clientHeight;
    style.innerHTML += 'td { width: ' + clientHeight + 'px}';

    // TODO: Think about this listener
    document.onkeydown = function (event) {
        switch (event.keyCode) {
            case 37:
                left();
                break;
            case 38:
                rotate()
                break;
            case 39:
                right()
                break;
            case 40:
                fall();
                break;
        }
    };
})();

function redrawState() {
    for (var h = 0; h < height; h++) {
        for (var w = 0; w < width; w++) {
            if (state[h][w] == 0)
                document.getElementsByTagName('tr')[h].getElementsByTagName('td')[w].style.backgroundColor = 'white';
            else
                document.getElementsByTagName('tr')[h].getElementsByTagName('td')[w].style.backgroundColor = 'black';
        }
    }
}

function left() {
    if (!state.locked) {
        var canMove = true;
        for (var h = 0; h < height; h++) {
            for (var w = 0; w < width; w++) {
                if (state[h][w] == 2) {
                    if (w == 0 || state[h][w - 1] == 1) {
                        canMove = false;
                        break;
                    }
                }
            }
        }
        if (canMove) {
            state.locked = true;
            point[1]--;
            for (var h = 0; h < height; h++) {
                for (var w = 1; w < width; w++) {
                    if (state[h][w] == 2) {
                        state[h][w - 1] = 2;
                        state[h][w] = 0;
                    }
                }
            }
        }
        state.locked = false;
        redrawState();
    }
}

function rotate() {
    if (!state.locked) {
        var canRotate = true;
        var previousShape = shape[shapeIndex];
        if (shapeIndex >= shape.length - 1) {
            shapeIndex = 0;
        } else {
            shapeIndex++;
        }
        var rotatedShape = shape[shapeIndex];
        var difference = rotatedShape[0].length - previousShape[0].length;
        var distance = (width - 1) - (point[1] + (previousShape[0].length - 1));
        if (distance < difference) {
            point[1] -= difference - distance;
        }
        for (var h = 0; h < rotatedShape.length; h++) {
            for (var w = 0; w < rotatedShape[0].length; w++) {
                if (rotatedShape[h][w] == 2 && state[h + point[0]][w + point[1]] == 1) {
                    canRotate = false;
                    break;
                }
            }
        }
        if (canRotate) {
            state.locked = true;
            for (var h = point[0]; h < point[0] + 4; h++) {
                for (var w = point[1]; w < point[1] + 4; w++) {
                    if (state[h][w] == 2) {
                        state[h][w] = 0;
                    }
                }
            }
            for (var h = point[0]; h < point[0] + rotatedShape.length; h++) {
                for (var w = point[1]; w < point[1] + rotatedShape[0].length; w++) {
                    if (rotatedShape[h - point[0]][w - point[1]] == 2) {
                        state[h][w] = 2;
                    }
                }
            }
        }
        state.locked = false;
        redrawState();
    }
}

function right() {
    if (!state.locked) {
        var canMove = true;
        for (var h = 0; h < height; h++) {
            for (var w = 0; w < width; w++) {
                if (state[h][w] == 2) {
                    if (w == width - 1 || state[h][w + 1] == 1) {
                        canMove = false;
                        break;
                    }
                }
            }
        }
        if (canMove) {
            state.locked = true;
            point[1]++;
            for (var h = 0; h < height; h++) {
                for (var w = width - 2; w >= 0; w--) {
                    if (state[h][w] == 2) {
                        state[h][w + 1] = 2;
                        state[h][w] = 0;
                    }
                }
            }
        }
        state.locked = false;
        redrawState();
    }
}

function fall() {
    if (!state.locked) {
        var canMove = true;
        var isEmpty = true;
        for (var h = 0; h < height; h++) {
            for (var w = 0; w < width; w++) {
                if (state[h][w] == 2) {
                    isEmpty = false;
                    if (h == height - 1 || state[h + 1][w] == 1) {
                        canMove = false;
                        break;
                    }
                }
            }
        }
        if (isEmpty) {
            canMove = false;
        }
        state.locked = true;
        if (canMove) {
            point[0]++;
            for (var h = height - 2; h >= 0; h--) {
                for (var w = 0; w < width; w++) {
                    if (state[h][w] == 2) {
                        state[h + 1][w] = 2;
                        state[h][w] = 0;
                    }
                }
            }
        } else {
            for (var h = 0; h < height; h++) {
                for (var w = 0; w < width; w++) {
                    if (state[h][w] == 2)
                        state[h][w] = 1;
                }
            }

            var ready = [];
            for (var h = 0; h < height; h++) {
                var isReady = true;
                for (var w = 0; w < width; w++) {
                    if (state[h][w] == 0) {
                        isReady = false;
                        break;
                    }
                }
                if (isReady) {
                    ready.push(h);
                }
            }
            for (var i = 0; i < ready.length; i++) {
                var row = ready[i];
                for (var h = row; h > 0; h--) {
                    for (var w = 0; w < width; w++) {
                        state[h][w] = state[h - 1][w];
                    }
                }
                for (var w = 0; w < width; w++) {
                    state[0][w] = 0;
                }
            }

            var startPoint = Math.floor(width / 2);
            point = [0, startPoint];

            shape = nextShape;
            shapeIndex = 0;
            nextShape = shapes[Math.floor(Math.random() * shapes.length)];
            var isFinished = false;
            for (var h = 0; h < shape[shapeIndex].length; h++) {
                for (var w = 0; w < shape[shapeIndex][0].length; w++) {
                    if (state[h][startPoint + w] != 0)
                        isFinished = true;
                }
            }
            if (isFinished)
                location.reload();
            for (var h = 0; h < shape[shapeIndex].length; h++) {
                for (var w = 0; w < shape[shapeIndex][0].length; w++) {
                    if (shape[shapeIndex][h][w] == 2)
                        state[h][startPoint + w] = 2;
                }
            }
        }
        state.locked = false;
        redrawState();
    }
}

setInterval(function () {
    fall();
}, 1000);