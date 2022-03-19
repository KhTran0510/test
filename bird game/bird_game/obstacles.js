const obstaclesArray = [];

class Obstacle{
    constructor(){      //push everything is this into GameObjects
        //random number relate to canvas height for top obstacle
        this.top = (Math.random() * canvas.height/3) + 20;
        //random number relate to canvas height for bottom obstacle
        this.bottom = (Math.random() * canvas.height/3) + 20;
        this.x = canvas.width;
        this.width = 20;
        this.color = "black";
    }

    draw(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x, 0, this.width, this.top);
        ctx.fillRect(this.x, canvas.height - this.bottom, this.width, this.bottom);
    }
    update(){
        this.x -= gamespeed;
        this.draw();
    }
}

function handleObstacles(){
    //every 50 frames add an obstacle (top and bottom)
    if (frame%50 === 0){
        obstaclesArray.unshift(new Obstacle);
    }
    for (let i = 0; i < obstaclesArray.length; i++){
        obstaclesArray[i].update();
    }
    if(obstaclesArray.length >20){
        obstaclesArray.pop(obstaclesArray[0]);
    }
}