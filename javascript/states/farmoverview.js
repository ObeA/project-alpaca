var State = State || {};

State.FarmOverview = {
    Wool: {
        current: 0,
        max: Settings.MaxWool,
        getProgressString: function () {
            return this.current +  ' / ' + this.max;
        },
    },

    woolometer: null,
    woolomask: null,
    woolotext: null,
    alpacaGroup: null,
    alpacas: [],
    selected: null,
    selectedStats: {
        nameText: null,
        woolText: null,
    },
    create: function () {
        var backgroundGroup = game.add.group();
        var background = game.add.image(0, 0, 'background');
        var backgroundGrass = game.add.image(0, 0, 'grass');
        backgroundGroup.add(background);
        backgroundGroup.add(backgroundGrass);
        background.inputEnabled = true;
        background.events.onInputDown.add(this.deselectAlpaca, this);
        backgroundGrass.inputEnabled = true;
        backgroundGrass.events.onInputDown.add(this.deselectAlpaca, this);

        border = game.add.sprite(0, 0, 'border');
        var farm = game.add.image(9, 559, 'farm');

        var stats = game.add.image(620, 559, 'stats-background');
        this.selectedStats.woolText = game.add.text(620, 559, '');

        woolometer = game.add.sprite(58, 23, 'wool-o-meter');
        woolomask = game.add.graphics(0, 0);
        var woolooutline = game.add.image(58, 23, 'wool-o-outline');
        var woolotext = game.add.text(58, 23, 'Alpacawol verzameld: ' + this.Wool.getProgressString(), {
            font: 'italic 13px "Comic Sans MS"',
            boundsAlignH: 'center',
            boundsAlignV: 'middle',
        });
        woolotext.setTextBounds(0, 0, 904, 68);

        game.physics.arcade.setBounds(50, 100, 900, 425);

        this.alpacaGroup = game.add.group();
        for (var i = 0; i < 10; i++)
        {
            var alpaca = new Alpaca(this, this.alpacaGroup);
            alpaca.sprite.events.onInputDown.add(this.selectAlpaca, this);
            this.alpacas.push(alpaca);
        }
    },
    update: function () {
        woolomask.beginFill(0xffffffff);
        woolomask.drawRect(
            58,
            23,
            this.Wool.current > 0 ? (this.Wool.current / this.Wool.max) * 904 : 0,
            68
        );
        woolomask.endFill();
        woolometer.mask = woolomask;

        this.alpacas.forEach(function (alpaca) {
            alpaca.moveRandomly();
            alpaca.update();
        });

        if (this.selected !== null)
            this.selectedStats.woolText.text = 'Wol: ' + this.selected.wool;
    },

    selectAlpaca: function (alpaca) {
        this.deselectAlpaca();
        alpaca = this.findAlpacaBySprite(alpaca);

        alpaca.sprite.frame = 1;
        alpaca.freeze = true;
        this.selected = alpaca;

        this.selectedStats.woolText.text = 'Wol: ' + alpaca.wool;
    },
    deselectAlpaca: function () {
        if (this.selected !== null)
        {
            this.selected.sprite.frame = 0;
            this.selected.freeze = false;
        }
    },
    findAlpacaBySprite: function (sprite) {
        var result = null;
        this.alpacas.forEach(function (alpaca) {
            if (alpaca.sprite === sprite)
            {
                result = alpaca;
                return;
            }
        });
        return result;
    }
};
