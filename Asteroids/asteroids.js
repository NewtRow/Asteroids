let canvas;
let ctx;
let canvasWidth = 1400;
let canvasHeight = 600;
let keys = [];

document.addEventListener('DOMContentLoaded', SetupCanvas);

function SetupCanvas() {
    canvas = document.getElementById('my-canvas');
    ctx = canvas.getContext('2d');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;
    ctx.fillStyle = 'black';
    ctx.fillRect(0,0,canvas.width, canvas.height);
    // store all key codes in an array (e)
    document.body.addEventListener("keydown", function(e){
        keys[e.keyCode] = true;
    });
        document.body.addEventListener("keyup", function(e){
        keys[e.keyCode] = false;
    });
    Render();

}

class Ship {
    constructor() {
        this.visible = true;
        this.x = canvasWidth / 2;
        this.y = canvasHeight / 2;
        this.movingForward = false;
        this.speed = 0.1;
        // vel = velocity 
        this.velX = 0;
        this.velY = 0;
        this.rotateSpeed = 0.001;
        this.radius = 15;
        this.angle = 0;
        this.strokeColor = "white";
    }  


    Rotate(dir) {
        this.angle += this.rotateSpeed * dir;
    }

    Update() {
        let radians = this.angle;
        // oldx + cos (radians) * distance
        // oldy + sin (radians) * distance
        if (this.movingForward) {
            // if you know the hypotenuse (radius) then sin & cos will give you the opposite side measurements
            this.velX += Math.cos(radians) * this.speed;
            this.velY += Math.sin(radians) * this.speed;
        }
        // if your ship leaves the side of the screen this will make it appear on the opposite side
        if(this.x < this.radius) {
            this.x = canvas.width;
        }
        if(this.x > canvas.width) {
            this.y = this.radius;
        }
        if(this.y < this.radius) {
            this.y = canvas.height;
        }
        if(this.y > canvas.height) {
            this.y = this.radius;
        }
        // this will control the slowing down of the ship.
        this.velX *= 0.99;
        this.velY *= 0.99;

        this.x -= this.velX;
        this.y -= this.velY;
    }
    // draw is how the ship will look
    Draw() {
        ctx.strokeStyle = this.strokeColor;
        ctx.beginPath();
        // work out the angle of the ship PI*2 = 360deg
        let vertAngle = ((Math.PI * 2) / 3);  //if you wanted to have more sides to your ship you can increase the / number
        let radians = this.angle / Math.PI * 180;
        for(let i = 0; i < 3; i++){
            ctx.lineTo(this.x - this.radius * Math.cos(vertAngle * i + 
            radians), this.y - this.radius * Math.sin(vertAngle * i +
            radians)); 
        }
        ctx.closePath();
        ctx.stroke();
    }
}

let ship = new Ship();



// render is to update all the images in the screen
function Render(){
    ship.movingForward = (keys[87]); //87 is the key code for W
    if(keys[68]){   //code for the D key
        ship.Rotate(1);
    }
    if(keys[65]){   //code for the A key
        ship.Rotate(-1);
    }
    ctx.clearRect(0,0,canvasWidth,canvasHeight);
    ship.Update();
    ship.Draw();
    requestAnimationFrame(Render);
}