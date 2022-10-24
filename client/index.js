var canvas = document.getElementById('canvas');
var ctx = canvas.getContext('2d');

var socket = io()

function drawBall(x, y)
{
	ctx.beginPath();
	ctx.arc(x + 500, y + 500, 10, 0, Math.PI*2);
	ctx.fillStyle = "#FF0000";
	ctx.fill();
	ctx.closePath();
}

class Game {

    constructor (){
        this.objects = [];
    }

    start() {
        setInterval(this.update.bind(this), 1000 / 600);
    }

    update() {
		ctx.clearRect(0, 0, canvas.width, canvas.height);

        for (let i = 0; i < this.objects.length; i++) {
            this.objects[i].x += this.objects[i].dx;
            this.objects[i].y += this.objects[i].dy;

            if(this.objects[i].x > 500)
                this.objects[i].x *= -1;
            if(this.objects[i].y > 500)
                this.objects[i].y *= -1;

			drawBall(this.objects[i].x, this.objects[i].y)
        }
    }

    setObject(objects) {
        this.objects = objects;
    }
}

let e1 = new Game();
e1.start();

socket.on('location', (data) => {
    console.log(data);
	e1.setObject(data)
})