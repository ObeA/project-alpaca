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
        happinessText: null,
        shearButton: null,
    },
    AmbientMusic: {
        tracks: [],
        current: -1,
        play: function (index) {
            this.stop();
            this.tracks[index].fadeIn(4000);
            this.current = index;
        },
        next: function () {
            if (this.current === this.tracks.length - 1)
                this.current = 0;
            else
                this.current++;

            this.play(this.current);
        },
        stop: function () {
            if (this.current >= 0)
                this.tracks[this.current].fadeOut();
        }
    },
    init: function (bgMusic) {
        bgMusic.fadeOut(750);
    },
    create: function () {
        this.AmbientMusic.tracks.push(game.add.sound('ingame-1'));
        this.AmbientMusic.tracks.push(game.add.sound('ingame-2'));
        this.AmbientMusic.next();

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
        var style = {
            font: "normal 30px 'Comic Sans MS'"
        };
        var nameStyle = {
            font: "italic 25px 'Comic Sans MS'",
            fill: '#333',
        }
        this.selectedStats.nameText = game.add.text(630, 565, '', nameStyle);
        this.selectedStats.woolText = game.add.text(630, 595, '', style);
        this.selectedStats.happinessText = game.add.text(630, 625, '', style);
        this.selectedStats.shearButton = game.add.button(897, 673, 'shears', this.shearAlpaca, this, 1, 0, 2);
        this.selectedStats.shearButton.visible = false;

        this.woolometer = game.add.sprite(58, 23, 'wool-o-meter');
        this.woolomask = game.add.graphics(0, 0);
        var woolooutline = game.add.image(58, 23, 'wool-o-outline');
        this.woolotext = game.add.text(58, 23, 'Alpacawol verzameld: ' + this.Wool.getProgressString(), {
            font: 'italic 13px "Comic Sans MS"',
            boundsAlignH: 'center',
            boundsAlignV: 'middle',
        });
        this.woolotext.setTextBounds(0, 0, 904, 68);

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
        this.woolomask.beginFill(0xffffffff);
        this.woolomask.drawRect(
            58,
            23,
            this.Wool.current > 0 ? (this.Wool.current / this.Wool.max) * 904 : 0,
            68
        );
        this.woolomask.endFill();
        this.woolometer.mask = this.woolomask;
        this.woolotext.text = 'Alpacawol verzameld: ' + this.Wool.getProgressString();

        this.alpacas.forEach(function (alpaca) {
            alpaca.moveRandomly();
            alpaca.update();
        });

        this.updateStats();
    },

    updateStats: function () {
        if (this.selected === null)
            return;

        this.selectedStats.nameText.text = this.selected.name;
        this.selectedStats.woolText.text = 'Wol: ' + this.selected.wool;
        this.selectedStats.happinessText.text = 'Blij: ' + this.selected.happiness * 100;
    },
    shearAlpaca: function () {
        if (this.selected === null)
            return;

        this.selected.shear();
    },
    selectAlpaca: function (alpaca) {
        this.deselectAlpaca();
        alpaca = this.findAlpacaBySprite(alpaca);

        alpaca.sprite.frame = 1;
        alpaca.freeze = true;
        this.selected = alpaca;

        this.selectedStats.shearButton.visible = true;
        this.updateStats();
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
