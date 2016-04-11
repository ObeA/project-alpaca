var Alpaca = function (context, group) {
    this.ctx = context;
    this.group = group;
    this.idleTimer = 0;
    this.freezed = false;
    this.wool = 0;

    var rndX = this.ctx.game.rnd.integerInRange(75, 925);
    var rndY = this.ctx.game.rnd.integerInRange(100, 550);
    this.sprite = this.ctx.game.add.sprite(rndX, rndY, 'alpaca');
    this.sprite.anchor.setTo(0.5, 0.5);
    this.sprite.inputEnabled = true;
    this.sprite.events.onInputDown.add(this.onClick, this);

    game.physics.arcade.enable(this.sprite);
    this.sprite.body.allowRotation = false;
    this.sprite.body.collideWorldBounds = true;
    this.group.add(this.sprite);

    this.growWool();
};

Alpaca.prototype.sheer = function (amount) {
    if (amount === undefined || amount === 0)
        amount = this.wool;
    this.ctx.Wool.current += amount;
    this.wool -= amount;
};
Alpaca.prototype.growWool = function () {
    this.wool += this.ctx.game.rnd.integerInRange(1, 5);
    this.ctx.game.time.events.add(this.ctx.game.rnd.integerInRange(10000, 30000), this.growWool, this);
};
Alpaca.prototype.moveRandomly = function () {
    var r = game.rnd.integerInRange(0, 100);
    if (!this.freeze &&
        this.idleTimer < this.ctx.game.time.totalElapsedSeconds() &&
        this.sprite.body.velocity.x === 0 &&
        this.sprite.body.velocity.y === 0)
    {
        if (r === 1)
        {
            this.sprite.body.velocity.set(this.ctx.rnd.integerInRange(-5, 5), this.ctx.game.rnd.integerInRange(-2, 2));
        }
        else if (r === 50)
        {
            this.idleTimer = this.ctx.game.time.totalElapsedSeconds() + this.ctx.game.rnd.integerInRange(3, 10);
        }
        else if (r === 100)
        {
            this.ctx.game.physics.arcade.moveToXY(this.sprite, this.ctx.rnd.integerInRange(100, 800), this.ctx.game.rnd.integerInRange(200, 375), this.ctx.game.rnd.integerInRange(10, 20));
        }
    }
};
Alpaca.prototype.update = function () {
    var self = this;
    this.group.forEach(function (alpaca) {
        self.group.forEach(function (other) {
            if (alpaca === other)
                return;
            self.ctx.game.physics.arcade.collide(alpaca, other);
        });
    });

    if(this.sprite.body.velocity.x > 0)
        this.sprite.scale.setTo(-1, 1);
    else if (this.sprite.body.velocity.x < 0)
        this.sprite.scale.setTo(1, 1);
};
Alpaca.prototype.onClick = function () {
    this.sprite.body.velocity.setTo(0, 0);
};
