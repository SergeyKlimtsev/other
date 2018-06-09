let engine;

const {stdin, stdout} = process;


function writeField(field) {
    if (typeof field === 'string') {
        stdout.write(field);
        return;
    }
    const {playerDirection} = engine.gameState;
    stdout.write('Direction: ' + playerDirection + '\n');
    const viewField = fieldToString(field);
    stdout.write(viewField);
    stdout.write('\n');
    const allMaze = fieldToString(engine.getMazeWithPlayer());
    stdout.write(allMaze);
}

function fieldToString(field) {
    return field
        .map(row => row.join(''))
        .reduce((prev, next) => prev + next + '\n', '');
}

function moveController(data) {
    switch (data.toString()[0]) {
        case 'u':
            writeField(engine.moveUp());
            break;
        case 'r':
            writeField(engine.moveRight());
            break;
        case 'l':
            writeField(engine.moveLeft());
            break;
        case 'd':
            writeField(engine.moveDown());
            break;
    }
}

function init(enRef) {
    engine = enRef;
    stdin.on('data', moveController);
    writeField(engine.getCurrentFieldView());
}

module.exports = {init};