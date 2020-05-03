// 13.A-assignment.js
//
// Natural emulation (of soap bubbles with the Acme Bubble Machine)
//
// Based on a p5.js particle system created by Daniel Shiffman and 
// appearing in his book, "The Nature of Code"
//

// initial declaration of variables
let system;

// preload font
function preload() {
    myFont = loadFont('fonts/AkzidenzGrotesk-BoldCond.otf');
}

function setup() {
    createCanvas(720, 400);
    // slowed frame rate because the default 60 is too fast for bubbles
    frameRate(45)
    // start particle system at 110 pixels from left of canvas, which is
    // front of Bubble Machine box
    system = new ParticleSystem(createVector(110, height / 2));
}

function draw() {
    // sky blue background
    background(140, 211, 241);
    noStroke();
    // change fill to grass green
    fill(140, 240, 0);
    // add a lawn for the some of the bubbles to fall onto
    rect(0, 325, 720, 135);


    // these two lines make the particle magic happen
    system.addParticle();
    system.run();

    // now we draw the bubble machine box so the bubbles happen
    // behind it

    // change fill to yellow and draw bubble machine box
    fill(255, 255, 0);
    rect(50, 175, 60, 60);
    // change stroke color to dark gray and thicken stroke for legs
    stroke(96)
    strokeWeight(4);
    // draw bubble maker legs and crossbrace
    line(55, 235, 55, 350);
    line(105, 235, 105, 350);
    line(55, 310, 105, 310);
    // turn off stroke and add lettering to bubble maker box
    noStroke();
    fill(255, 0, 0);
    textFont(myFont);
    textAlign(CENTER);
    textSize(17);
    text("ACME", 80, 195);
    text("BUBBLE", 80, 210);
    text("MACHINE", 80, 225);
}

// coding below from Daniel Shiffman with many value adjustments;
// originally particles bubbled up slightly at the top of the canvas
// and then fell, but I changed them to go left to right and float; 
// originally particles faded away, but I changed them to burst, i.e.
// disappear in an instant

// A simple Particle class
let Particle = function(position) {
// controls trajectory of bubbles: some up, but more down
    this.acceleration = createVector(0.001, 0.003);
// controls speed and spread of bubble cloud
    this.velocity = createVector(random(2, 3), random(-1, .3));
    this.position = position.copy();
// controls approximately when bubbles burst; adjusted so that 
// some bubbles will burst before leaving the screen while others 
// will leave the screen before bursting 
    this.lifespan = 425;
};

Particle.prototype.run = function() {
    this.update();
    this.display();
};

// Method to update position
Particle.prototype.update = function(){
    this.velocity.add(this.acceleration);
    this.position.add(this.velocity);
    this.lifespan -= 2;
};

// Method to display
Particle.prototype.display = function() {
    // thin white stroke around bubble
    stroke(255);
    strokeWeight(1);
    // white fill, mostly but not completely transparent
    fill(255, 255, 255, 35);
    // third ellipse value is size of circle
    ellipse(this.position.x, this.position.y, 15);
};

// Is the particle still useful?
Particle.prototype.isDead = function(){
    return this.lifespan < 0;
};

let ParticleSystem = function(position) {
    this.origin = position.copy();
    this.particles = [];
};

ParticleSystem.prototype.addParticle = function() {
    this.particles.push(new Particle(this.origin));
};

ParticleSystem.prototype.run = function() {
    for (let i = this.particles.length-1; i >= 0; i--) {
        let p = this.particles[i];
        p.run();
        if (p.isDead()) {
            this.particles.splice(i, 1);
        }
    }
};
