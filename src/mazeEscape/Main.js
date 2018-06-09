const engine = require('./Engine.js');
const controller = require('./Controller.js');

const maze =
    '#######\n' +
    '#--#--#\n' +
    '#--#-b#\n' +
    '#--#--#\n' +
    'e-----#\n' +
    '#-----#\n' +
    '#######';

function main() {
    engine.loadMaze(maze);
    controller.init(engine);
}

main();
