var State = State || {};

State.Menu = {
    bgMusic: null,
    preload: function () {

    },
    create: function () {
        this.bgMusic = game.add.audio('menu-tune');
        this.bgMusic.fadeIn(4000);
        this.bgMusic.loop = true;

        this.cloudGroup = game.add.group();
        for (var i = 0; i < 15; i++)
            this.addRandomCloud();

        var startButton = game.add.button(game.world.centerX, game.world.centerY, 'button', this.start, this, 1, 0, 2);
        var buttonSound = game.add.sound('button-click');
        startButton.anchor.setTo(0.5, 0.5);
        startButton.onUpSound = buttonSound;
        var buttonText = game.add.text(startButton.x, startButton.y, "START", {
            font: "bold 22px 'Comic Sans MS'"
        });
        buttonText.anchor.setTo(0.5, 0.5);
    },

    start: function () {
        game.state.start('farmoverview', true, false, this.bgMusic);
    },
    addRandomCloud: function () {
        var cloudNo = game.rnd.integerInRange(1, 3);
        var random = game.rnd.integerInRange(1, 100);
        if (random > 95)
            cloudNo = 6;
        else if (random > 80)
            cloudNo = game.rnd.integerInRange(4, 5);

        var cloud = game.add.sprite(
            game.rnd.integerInRange(-600, 1100),
            game.rnd.integerInRange(0, 780),
            'cloud-' + cloudNo
        );
        cloud.anchor.setTo(0.5, 0.5);

        var tween = game.add.tween(cloud).to({ x: 1200 }, game.rnd.integerInRange(20000, 40000), "Linear", true);
        tween.onComplete.add(function () {
            cloud.position.x = game.rnd.integerInRange(-350, -100);
            game.add.tween(cloud).to({ x: 1200 }, game.rnd.integerInRange(20000, 40000), "Linear", true);
        }, this);
    }
};
