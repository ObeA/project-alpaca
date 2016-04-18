var Settings = Settings || {};

Settings.Names = {
    random: function (context) {
        var firstname = this.firstname[context.game.rnd.integerInRange(0, this.firstname.length - 1)];
        var lastname = this.lastname[context.game.rnd.integerInRange(0, this.lastname.length - 1)];

        return firstname + (lastname.length > 0 ? " " : "") + lastname;
    },
    firstname: [
        "Hans", "Harold", "Jan", "Leon",
        "Mo", "Dennis", "Michel", "Romeo",
        "Jaap", "Karin", "Tienke", "Sjackelientje",
        "Emma", "G.", "Marijke", "Marieke",
        "Oliver", "Yvan", "Elbrich", "Joyce",
        "Meneer", "Mevrouw",
    ],
    lastname: [
        "von Bruck", "Deykstreat", "de Oud",
        "van Dijk", "Ametta", "Bakkerstra", "de Kippenboer",
        "de Alpacavriend", "", "", "de Bruijn", "de Wit"
    ],
}
