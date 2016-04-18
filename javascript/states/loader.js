var State = State || {};

State.Loader = {
    preload: function () {
        var loadingAlpaca = this.add.sprite(472, 348, 'loading');
        loadingAlpaca.anchor.setTo(0, 0);
        var loadingText = game.add.text(510, 432, "Bezig met laden...", {
            font: "bold 18px 'Comic Sans MS'"
        });
        loadingText.anchor.x = 0.5;
        this.load.setPreloadSprite(loadingAlpaca);

        game.load.audio('menu-tune', Settings.Audio + '/menu.mp3');
        game.load.audio('button-click', Settings.Audio + '/button.wav');
        game.load.audio('ingame-1', Settings.Audio + '/game1.mp3');
        game.load.audio('ingame-2', Settings.Audio + '/game2.mp3');

        game.load.image('background', Settings.Images + '/background.png');
        game.load.image('grass', Settings.Images + '/grass.png');
        game.load.image('farm', Settings.Images + '/boerderij.png');
        game.load.image('stats-background', Settings.Images + '/stats-background.png');
        game.load.image('border', Settings.Images + '/struikjes.png');
        game.load.image('wool-o-meter', Settings.Images + '/wool-o-meter.png');
        game.load.image('wool-o-outline', Settings.Images + '/wool-o-meter-outline.png');
        game.load.spritesheet('alpaca', Settings.Images + '/alpaca.png', 82, 90);

        game.load.image('cloud-1', Settings.Images + '/clouds/cloud1.png');
        game.load.image('cloud-2', Settings.Images + '/clouds/cloud2.png');
        game.load.image('cloud-3', Settings.Images + '/clouds/cloud3.png');
        game.load.image('cloud-4', Settings.Images + '/clouds/cloud4.png');
        game.load.image('cloud-5', Settings.Images + '/clouds/cloud5.png');
        game.load.image('cloud-6', Settings.Images + '/clouds/cloud6.png');

        game.load.spritesheet('button', Settings.Images + '/knop.png', 100, 50);
        game.load.spritesheet('shears', Settings.Images + '/shears.png', 75, 75);
        loadingText.text = "Zwoele muziekjes worden voorbereid...";
    },
    update: function () {
        if (this.cache.isSoundDecoded('menu-tune') && this.cache.isSoundDecoded('button-click'))
            game.state.start('menu');
    }
};
