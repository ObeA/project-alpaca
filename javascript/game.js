var game = new Phaser.Game(1020, 780, Phaser.AUTO, 'game-container', {
    preload: preload,
    create: create,
    update: update,
    render: render
});
var entities = [];

function preload() {
    console.log("Preloaded");

    // Laad alpaca's
    game.load.image('background', 'images/game/background.png');
    game.load.image('grass', 'images/game/grass.png');
    game.load.image('farm', 'images/game/boerderij.png');
    game.load.image('stats-background', 'images/game/stats-background.png');
    game.load.image('border', 'images/game/struikjes.png');
    game.load.image('wool-o-meter', 'images/game/wool-o-meter.png');
}

function create() {
    console.log("Created");

    var backgroundGroup = game.add.group();
    backgroundGroup.add('background');
    backgroundGroup.add('grass');
}

function update() {

}

function render () {

}
