const gameState = {
    maze: null,
    playerPosition: null,
    playerDirection: ['up', 'down', 'left', 'right'][(Math.random() * 4 >> 0)],
    exitPosition: null
};

function loadMaze(maze) {
    const lines = maze.split('\n')
        .map(line => line.split(''));
    gameState.maze = lines;

    lines
        .forEach((line, y) => line.forEach((cell, x) => {
            switch (cell) {
                case 'b':
                    lines[y][x] = '-';
                    gameState.playerPosition = {x, y};
                    break;
                case 'e':
                    gameState.exitPosition = {x, y};
                    break;
            }
        }));

    if (!gameState.exitPosition) {
        throw new Error('Cannot find exit cell')
    } else if (!gameState.playerPosition) {
        throw new Error('Cannot find player cell')
    }
}

function getCurrentFieldView() {
    const field = getViewField();
    const {playerDirection} = gameState;
    switch (playerDirection) {
        case 'up':
            return field;
        case 'left':
            return rotateFieldLeft(field);
        case 'right':
            return rotateFieldRight(field);
        case 'down':
            return rotateFieldDown(field);
    }
}

function getViewField() {
    const {maze, playerPosition: {x, y}} = gameState;
    return maze
        .slice(y - 1, y + 2)
        .map(line => line.slice(x - 1, x + 2));
}

function rotateFieldRight(field) {
    return field[0].map((_, i) => field
        .slice()
        .reverse()
        .map(row => row[i])
    );
}

function rotateFieldLeft(field) {
    return field[0]
        .map((_, i) => field
            .map(row => row
                .slice()
                .reverse()
            )
            .map(row => row[i])
        );
}

function rotateFieldDown(field) {
    return field
        .slice()
        .reverse()
        .map(row => row
            .slice()
            .reverse()
        );
}

function rotateField(direction) {
    if (direction === 'up') {
        return getCurrentFieldView();
    }

    const field = getViewField();
    const {playerDirection} = gameState;

    //right
    if (playerDirection === 'up' && direction === 'right' ||
        playerDirection === 'left' && direction === 'down' ||
        playerDirection === 'down' && direction === 'left'
    ) {
        gameState.playerDirection = 'right';
        return rotateFieldRight(field);
    }

    //left
    if (playerDirection === 'up' && direction === 'left' ||
        playerDirection === 'right' && direction === 'down' ||
        playerDirection === 'down' && direction === 'right'
    ) {
        gameState.playerDirection = 'left';
        return rotateFieldLeft(field);
    }

    //down
    if (playerDirection === 'up' && direction === 'down' ||
        playerDirection === 'right' && direction === 'right' ||
        playerDirection === 'left' && direction === 'left'
    ) {
        gameState.playerDirection = 'down';
        return rotateFieldDown(field);
    }

    //Up
    if (playerDirection === 'right' && direction === 'left' ||
        playerDirection === 'left' && direction === 'right' ||
        playerDirection === 'down' && direction === 'down'
    ) {
        gameState.playerDirection = 'up';
        return field;
    }
}

function checkWin() {
    const {playerPosition, exitPosition} = gameState;
    return playerPosition.x === exitPosition.x && playerPosition.y === exitPosition.x;
}

function moveUp() {
    const {maze, playerDirection, playerPosition: {x, y}} = gameState;
    if (maze[y + 1][x] !== '#') {
        gameState.playerPosition.y++;
    }
    if (checkWin()) return 'WIN';
    return rotateField('up');
}

function moveRight() {
    const {maze, playerPosition: {x, y}} = gameState;
    if (maze[y][x + 1] !== '#') {
        gameState.playerPosition.x++;
    }
    if (checkWin()) return 'WIN';
    return rotateField('right');
}

function moveLeft() {
    const {maze, playerPosition: {x, y}} = gameState;
    if (maze[y][x - 1] !== '#') {
        gameState.playerPosition.x--;
    }
    if (checkWin()) return 'WIN';
    return rotateField('left');
}

function moveDown() {
    const {maze, playerPosition: {x, y}} = gameState;
    if (maze[y - 1][x] !== '#') {
        gameState.playerPosition.y--;
    }
    if (checkWin()) return 'WIN';
    return rotateField('down');
}

function getMazeWithPlayer() {
    const {maze, playerPosition: {x, y}} = gameState;
    const mazeWithPlayer = maze.map(row => row.slice());
    mazeWithPlayer[y][x] = 'b';
    return mazeWithPlayer;
}

module.exports = {
    gameState,
    getCurrentFieldView,
    getMazeWithPlayer,
    getViewField,
    moveUp,
    moveRight,
    moveLeft,
    moveDown,
    loadMaze
};