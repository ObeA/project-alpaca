var State = State || {};

State.Menu = {
    cloudGroup: null,
    preload: function () {

    },
    create: function () {
        cloudGroup = game.add.group();
        for (var i = 0; i < 10; i++)
            this.addRandomCloud();

        var startButton = game.add.button(game.world.centerX, game.world.centerY, 'button', this.start, this, 1, 0, 2);
        startButton.anchor.setTo(0.5, 0.5);
        var buttonText = game.add.text(startButton.x, startButton.y, "START", {
            font: "bold 22px 'Comic Sans MS'"
        });
        buttonText.anchor.setTo(0.5, 0.5);
    },

    start: function () {
        game.state.start('farmoverview');
    },
    addRandomCloud: function () {
        var cloud = game.add.sprite(
            game.rnd.integerInRange(-600, 1100),
            game.rnd.integerInRange(0, 780),
            'cloud-' + game.rnd.integerInRange(1, 3)
        );
        cloud.anchor.setTo(0.5, 0.5);

        var tween = game.add.tween(cloud).to({ x: 1200 }, game.rnd.integerInRange(20000, 40000), "Linear", true);
        tween.onComplete.add(function () {
            cloud.position.x = game.rnd.integerInRange(-250, -100);
            game.add.tween(cloud).to({ x: 1200 }, game.rnd.integerInRange(20000, 40000), "Linear", true);
        }, this);
    }
};
