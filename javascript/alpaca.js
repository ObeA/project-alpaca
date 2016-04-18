var Alpaca = function (context, group) {
    this.ctx = context;
    this.group = group;
    this.idleTimer = 0;
    this.freezed = false;
    this.wool = 0;
    this.happiness = 1;
    this.satisfaction = 1;
    this.name = Settings.Names.random(this.ctx);

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

Alpaca.prototype.updateHappiness = function () {
    var satisfactionFactor = 1;
    if (this.satisfaction >= 0.75)
        satisfactionFactor += 0.1;
    else
        satisfactionFactor = this.satisfaction;

    this.happiness *= satisfactionFactor;
    this.happiness = Math.round(this.happiness * 10) / 10;
    if (this.happiness > 1)
        this.happiness = 1;
    else if (this.happiness < 0)
        this.happiness = 0;
};
Alpaca.prototype.shear = function (amount) {
    if (amount === undefined || amount === 0)
        amount = this.wool;
    this.ctx.Wool.current += amount;
    this.wool -= amount;
    this.satisfy();
};
Alpaca.prototype.satisfy = function () {
    this.satisfaction += Math.max(Math.round(this.ctx.game.rnd.frac() * 100) / 100, 0.25); // TODO: random
    if (this.satisfaction > 1)
        this.satisfaction = 1;
};
Alpaca.prototype.dissatisfy = function () {
    this.satisfaction -= Math.max(Math.round(this.ctx.game.rnd.frac() * 100) / 100, 0.1); // TODO: random
    if (this.satisfaction < 0)
        this.satisfaction = 0;
};
Alpaca.prototype.growWool = function () {

    if (this.wool < 20)
        this.wool += this.ctx.game.rnd.integerInRange(1, 5);
    if (this.wool >= 10)
        this.dissatisfy();

    this.updateHappiness();
    var growthSpeedFactor = this.satisfaction > 0.75 ? this.satisfaction : 1 + (1 - this.satisfaction);
    this.ctx.game.time.events.add(Math.floor(this.ctx.game.rnd.integerInRange(10000, 30000) * growthSpeedFactor), this.growWool, this);
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
