class Bird{
    constructor(){      //push everything in this into GameObject
        this.x = 150;
        this.y = 200;
        
        //scrolling screen speed (velocity y)
        this.vy = 150;

        //size of the bird
        this.width = 20;
        this.height = 20;

        //the gravity to pull object down when player not press space
        this.weight = 1;   

    }
    update(){
        //to make bird shaking when reach the top or the bottom
        let curve = Math.sin(angle) * 15;

        //keep the bird not drop pass the bottom of canvas
        if (this.y > canvas.height - (this.height*3) + curve){
            this.y = canvas.height - (this.height*3) + curve;
            this.vy = 0;
        }else{
            //screen will keep scrolling, so keep adding
            this.vy += this.weight;
            // 'vy+=this weight;' alone is fly up too fast
            this.vy *= 0.9; // *=0.9 to slow the speed of flapping
            this.y += this.vy;
        }
        // the bird not flap pass the top of canvas
        if (this.y < 0 + this.height){
            this.y = 0 + this.height;
        }

        //if spacekey is pressed
        if (spacePressed && this.y > this.height * 3)
            this.flap();
        
    }
    draw(){
        ctx.fillStyle = 'red';
        ctx.fillRect(this.x, this.y, this.width, this.height);
    }
    flap(){
        this.vy -= 2;
    }
}
const bird = new Bird();