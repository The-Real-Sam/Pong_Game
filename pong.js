let xBall = 300;
let yBall = 200;
let dBall = 15;
let speedBallx = 6;
let speedBally = 6;
let radius = dBall / 2;
let xmyRacket = 5;
let ymyRacket = 150;
let xopponentRacket = 585;
let yopponentRacket = 150;
let widthRacket = 10;
let heightRacket = 90;
let collided = false;
let speedyopponentRacket;
let myScore = 0;
let opponentScore = 0;
let soundracket;
let soundscore;
let backgroundsound;
let chanceOpmissball = 0;

function preload() {
    soundracket = loadSound("soundracket.mp3");
    soundscore = loadSound("soundscore.mp3");
    backgroundsound = loadSound("backgroundsound.mp3")
}

function setup() {
    createCanvas(600, 400);
    backgroundsound.loop();
}

function draw() {
    background(0);
    drawBall();
    moveBall();
    collisionBorder();
    Rackets(xmyRacket, ymyRacket);
    Rackets(xopponentRacket, yopponentRacket);
    movemyRacketup();
    movemyRacketdown();
    moveOpponentracket();
    //racketCollision ();
    racketCollisionlib(xmyRacket, ymyRacket); //you can use this function imported from p5.collide2d file or racketCollision (function created on line 64)
    racketCollisionlib(xopponentRacket, yopponentRacket);
    showScore();
    addScore();
    calculatechanceOpmissball();
    noStuckball()
}

function noStuckball() {
    if (xBall - radius < 0) {
        xBall = 23
    }
    if (xBall + radius > 600) {
        xBall = 580
    }
}

function drawBall() {
    circle(xBall, yBall, dBall);
}

function moveBall() {
    xBall += speedBallx;
    yBall += speedBally;
}

function collisionBorder() {
    if ((xBall + radius) > width || (xBall - radius) < 0) {
        speedBallx *= -1;
    }

    if ((yBall + radius) > height || (yBall - radius) < 0) {
        speedBally *= -1;
    }
}

function Rackets(x, y) {
    rect(x, y, widthRacket, heightRacket);
}

function movemyRacketup() {
    if (keyIsDown(UP_ARROW)) {
        ymyRacket -= 10
    }
}

function movemyRacketdown() {
    if (keyIsDown(DOWN_ARROW)) {
        ymyRacket += 10
    }
}

function racketCollision() {
    if (xBall - radius < xmyRacket + widthRacket
        &&
        yBall - radius < ymyRacket + heightRacket
        &&
        yBall + radius > ymyRacket) {
        speedBallx *= -1;
        soundracket.play();
    }
}

function racketCollisionlib(x, y) {
    collided = collideRectCircle(x, y, widthRacket, heightRacket, xBall, yBall, radius);
    if (collided) {
        speedBallx *= -1;
        soundracket.play();
    }
}

function moveOpponentracket() {
    speedyopponentRacket = yBall - yopponentRacket - widthRacket / 2 - 30;
    yopponentRacket += speedyopponentRacket + chanceOpmissball;
    calculatechanceOpmissball();
}

function calculatechanceOpmissball() {
    if (opponentScore >= myScore) {
        chanceOpmissball += 1;
        if (chanceOpmissball >= 39) {
            chanceOpmissball = 40
        }
    }

    else {
        chanceOpmissball -= 1;
        if (chanceOpmissball <= 35) {
            chanceOpmissball = 35
        }
    }
}

function showScore() {
    stroke(255);
    textAlign(CENTER);
    textSize(16);
    fill(color(255, 140, 0));
    rect(150, 10, 40, 20, 5);
    fill(255);
    text(myScore, 170, 26);
    fill(color(255, 140, 0));
    rect(450, 10, 40, 20, 5);
    fill(255);
    text(opponentScore, 470, 26);
}

function addScore() {
    if (xBall + radius > 600) {
        myScore += 1;
        soundscore.play();
    }
    if (xBall - radius < 0) {
        opponentScore += 1;
        soundscore.play();
    }
}
