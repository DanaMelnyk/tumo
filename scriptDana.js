function setup() {
    createCanvas(400, 400)
    Game.addCommonBalloon()
}

function draw() {
    background('skyblue')

    for (const balloon of Game.balloons) {
        balloon.display()
        balloon.move(Game.score)

        if (balloon.y <= 25 && balloon.colour != 'black' && balloon.colour != 'purple') {
            noLoop()
            Game.balloons.length = 0
            background('violet')
            let score = Game.score
            Game.score = ''

            textSize(30)
            fill('white')
            textAlign(CENTER, CENTER)
            text('GAME OVER', 200, 200)
            textSize(25)
            text('Score: ' + score, 200, 300)
        }
    }

    textSize(20)
    fill('black')
    text(Game.score, 20, 40)

    if (frameCount % 70 == 0) {
        Game.addCommonBalloon()
    }
    if (frameCount % 70 == 0) {
        Game.addUniqBalloon()
    }
    if (frameCount % 75== 0) {
        Game.addAngryBalloon()
    }
    if (frameCount % 90 == 0) {
        Game.addDanasBalloon()
    }
}


function mousePressed() {
    if (!isLooping()) {
        loop()
        Game.score = 0
    }
    Game.checkIfBalloonBurst()
}

class Game {
    static balloons = []
    static score = 0

    static addCommonBalloon() {
        let balloon = new CommonBalloon('blue', 50)
        this.balloons.push(balloon)
    }

    static addUniqBalloon() {
        let balloon = new UniqBalloon('pink', 30)
        this.balloons.push(balloon)
    }

    static addAngryBalloon() {
        let balloon = new AngryBalloon('black', 50)
        this.balloons.push(balloon)
    }

    static addDanasBalloon() {
        let balloon = new DanasBalloon('purple', 25)
        this.balloons.push(balloon)
    }

    static checkIfBalloonBurst() {
        this.balloons.forEach((balloon, index) => {
            let distance = dist(balloon.x, balloon.y, mouseX, mouseY)
            if (distance <= balloon.size / 2) {
                balloon.burst(index)
            }
        });
    }
}


class CommonBalloon {
    constructor(colour, size) {
        this.x = random(width)
        this.y = random(height - 10, height + 50)
        this.colour = colour
        this.size = size
    }

    display() {
        fill(this.colour)
        ellipse(this.x, this.y, this.size)
        line(this.x, this.y + this.size / 2, this.x, this.y + 2 * this.size)
    }

    move(score) {
        if (score < 100) {
            this.y -= 1
        }
        else if (score > 100 && score < 200) {
            this.y -= 1.5
        }
        else {
            this.y -= 2
        }
    }

    burst(index) {
        Game.balloons.splice(index, 1)
        Game.score += 1
    }
}

class UniqBalloon extends CommonBalloon {
    constructor(colour, size) {
        super(colour, size)
    }
    burst(index) {
        Game.balloons.splice(index, 1)
        Game.score += 10
    }
}


class AngryBalloon extends CommonBalloon{
    constructor(colour, size) {
        super(colour, size)
    }
    burst(index) {
        Game.balloons.splice(index, 1)
        Game.score -= 10
    }
} 

function getRandomInt(min, max) {
    return Math.floor(Math.random()*(max - min) + min)
}

class DanasBalloon extends CommonBalloon{
    constructor(colour, size) {
        super(colour, size)
    }
    burst(index) {
        Game.balloons.splice(index, 1)
        Game.score =  getRandomInt(-10, 20);
    }
} 