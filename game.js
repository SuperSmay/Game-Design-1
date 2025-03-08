let gameState = "start"

let toolSprite;
let currentTool;
let roundObjects;

let toolSpriteImages = {}


function preload() {
    toolSpriteImages.sickle = loadImage("/assets/Sickle.png")
    toolSpriteImages.wateringCan = loadImage("/assets/Watering_can.png")
}


function setup() {
	new Canvas(1200, 800);
	displayMode('centered');

    roundObjects = new Group()

    class PlayerTool extends Sprite {

        draw() {
            if (currentTool === "wateringCan") {
                this.image = toolSpriteImages.wateringCan
            } else if (currentTool === "sickle") {
                this.image = toolSpriteImages.sickle
            }
            this.diameter = 100
            this.image.scale = 10
            super.draw()
        }
    }

	toolSprite = new PlayerTool()
    roundObjects.add(toolSprite)

    toolSprite.width = 20

    allSprites.autoDraw = false
    allSprites.autoUpdate = false
    world.autoStep = false
}

function draw() {

	if (gameState === "start") {
        drawMainMenu()
    } else if (gameState === "round") {
        drawRound()
    }
}

function switchToRound() {
    gameState = "round"
    currentTool = "wateringCan"
}

function drawRound() {
    background('brown')

    toolSprite.x = mouse.x
    toolSprite.y = mouse.y

    if(keyIsDown('1')) {
        currentTool = "wateringCan"
    } else if (keyIsDown('2')) {
        currentTool = "sickle"
    }




    roundObjects.update()
    roundObjects.draw()
    world.step()
}

function drawMainMenu() {
    background('skyblue');

    noStroke()
    fill('black')
    textAlign(CENTER)
    textSize(100)
    text("Click to start!", width/setup, height/2)

    if (mouse.pressed()) {
        switchToRound()
    }
}

