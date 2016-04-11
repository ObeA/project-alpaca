var game  = new Phaser.Game(1020, 780, Phaser.AUTO, 'game-container');

game.state.add('bootstrap', State.Bootstrap);
game.state.add('loader', State.Loader);
game.state.add('menu', State.Menu);
game.state.add('farmoverview', State.FarmOverview);

game.state.start('bootstrap');
