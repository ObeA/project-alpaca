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
    game.load.image('wool-o-outline', 'images/game/wool-o-meter-outline.png');
    game.load.image('alpaca', 'images/game/alpaca.png');
}

var woolometer;
var woolomask;
var border;
var maxWool = 500;
var currentWool = 0;

var alpacaGroup;
function create() {
    console.log("Created");

    game.physics.startSystem(Phaser.Physics.P2JS);

    var backgroundGroup = game.add.group();
    var background = game.add.image(0, 0, 'background');
    var backgroundGrass = game.add.image(0, 0, 'grass');
    backgroundGroup.add(background);
    backgroundGroup.add(backgroundGrass);

    border = game.add.sprite(0, 0, 'border');
    var farm = game.add.image(9, 559, 'farm');

    var stats = game.add.image(620, 559, 'stats-background');

    woolometer = game.add.sprite(58, 23, 'wool-o-meter');
    woolomask = game.add.graphics(0, 0);
    var woolooutline = game.add.image(58, 23, 'wool-o-outline');

    var alpacaGroup = game.add.group();
    for (var i = 0; i < 10; i++)
    {
        var rndX = game.rnd.integerInRange(76 + 50, 1020 - 76 - 50);
        var rndY = game.rnd.integerInRange(78 + 50, 780 - 78 - 50);
        var alpaca = alpacaGroup.create(rndX, rndY, 'alpaca');
        game.physics.p2.enable(alpaca, false);
    }
}

function update() {
    woolomask.beginFill(0xffffffff);
    woolomask.drawRect(
        58,
        23,
        currentWool > 0 ? (currentWool / maxWool) * 904 : 0,
        68
    );
    woolomask.endFill();
    woolometer.mask = woolomask;
}

function render () {

}
