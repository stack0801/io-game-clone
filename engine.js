class Engine {
    constructor() {
        this.objects = [];

        setInterval(this.update.bind(this), 1000 / 60);
    }

    update() {
        //console.log("!!!");
    }
}

module.exports = Engine;