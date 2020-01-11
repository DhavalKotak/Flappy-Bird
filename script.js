var cvs = document.getElementById("canvas");
var ctx = cvs.getContext("2d");

//setting up the images

var bird = new Image();
var bg = new Image();
var floor = new Image();
var pipeUpper = new Image();
var pipeLower = new Image();

bird.src = "images/bird.png";
bg.src = "images/bg1.png";
floor.src = "images/floor.png";
pipeUpper.src = "images/pipeUpper.png";
pipeLower.src = "images/pipeLower.png";

var gap = 85;
var constant;
var bX = 10;
var bY = 150;
var gravity = 1;
var score = 0;

document.addEventListener("keydown",moveUp);

function moveUp(){
    bY -= 20;
}

//setting up the pipes coordinates

var pipe = [];

pipe[0] = {
    x : cvs.width,
    y : 0
};

// draw images
function draw(){

    ctx.drawImage(bg,0,0,cvs.width,cvs.height);

    for(var i = 0; i < pipe.length; i++){

        constant = pipeUpper.height+gap;
        ctx.drawImage(pipeUpper,pipe[i].x,pipe[i].y);
        ctx.drawImage(pipeLower,pipe[i].x,pipe[i].y+constant);

        pipe[i].x--;

        if( pipe[i].x == 100 ){
            pipe.push({
                x : cvs.width,
                y : Math.floor(Math.random()*pipeUpper.height)-pipeUpper.height
            });
        }
        // detect collision
        if( bX + bird.width >= pipe[i].x && bX <= pipe[i].x + pipeUpper.width && (bY <= pipe[i].y + pipeUpper.height || bY+bird.height >= pipe[i].y+constant) || bY + bird.height >=  cvs.height - floor.height){
            location.reload(); // reload the page
        }
        if(pipe[i].x == 5){
            score+=10;
        }
    }
    ctx.drawImage(floor,0,cvs.height - floor.height);
    ctx.drawImage(bird,bX,bY);
    ctx.fillStyle = "#000";
    ctx.font = "20px Serif";
    ctx.fillText("Score : "+score,10,cvs.height-45);
    bY += gravity;
    requestAnimationFrame(draw);
}
draw();
