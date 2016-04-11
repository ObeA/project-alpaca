var State = State || {};

State.Bootstrap = {
    preload: function () {
        game.load.image('loading', Settings.Images + '/alpaca.png');
    },
    create: function () {
        game.stage.backgroundColor = "#2FBCEB";
        game.physics.startSystem(Phaser.Physics.ARCADE);

        game.state.start('loader');
    }
};
