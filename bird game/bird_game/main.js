const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

canvas.width = 600;
canvas.height = 400;

let spacePressed = false;
let angle = 0;
let frame = 0;
let score = 0;
let gamespeed = 2;

//let randomNumber = Math.floor(Math.random() * 11) + 2;

function animate(){
    ctx.clearRect(0,0, canvas.width, canvas.height);
    //ctx.fillRect(10, canvas.height - 90 ,50,50);
    handleObstacles();
    bird.update(); 
    bird.draw();
    
    handleCollisions();
    if (handleCollisions()) return;

    requestAnimationFrame(animate);

    angle+=0.12; //incearse every frame to adjust auto flap in same spot

    //add frame for every time this function run
    // if frame > 600 : gamespeed change random from 2 to 12
    if (frame > 600){
        frame = 0;
        gamespeed = Math.floor(Math.random() * 11) + 2;
        console.log("frame: " + frame);
        console.log("gamespeed: " + gamespeed);
    }else{  //if frame <= 600, frame++. If frame >= 400 and <= 500 then show warning
        frame++;
        if (frame >= 400 && frame <= 520){
            ctx.font = "50px Georgia";
            ctx.fillStyle = "yellow";
            ctx.fillText('WARNING!!', 160, canvas.height/2-100);
        }
        console.log("frame: " + frame);
        console.log("gamespeed: " + gamespeed);
    }
    //gamespeed += 0.005;
}
animate();

window.addEventListener('keydown', function(e){
    if (e.code ==='Space') spacePressed = true;
});
window.addEventListener('keyup', function(e){
    if (e.code === 'Space') spacePressed = false;
});

function handleCollisions(){
    //loop through all obstacles array
    for (let i = 0; i < obstaclesArray.length; i++){
            //if bird hit obstacles (top and bottom range including space between)
        if (bird.x < obstaclesArray[i].x + obstaclesArray[i].width 
            && bird.x + bird.width > obstaclesArray[i].x 
                //check collision for top and bottom obstacles (make the space between safe)
            && ((bird.y < 0 + obstaclesArray[i].top && bird.y + bird.height > 0) 
                || (bird.y > canvas.height - obstaclesArray[i].bottom 
                    && bird.y + bird.height <canvas.height))){
                        // set font and color
                        ctx.font = "50px Georgia";
                        ctx.fillStyle = "red";
                        ctx.fillText('GAME OVER', 160, canvas.height/2+15);
                        return true;
                    }
    }
}