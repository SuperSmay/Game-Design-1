let gameState = "start"

let toolSprite;
let currentTool;
let roundObjects;
let roundsGroups = []

let toolSpriteImages = {}

let cornSpriteImages = []


function preload() {
    toolSpriteImages.sickle = loadImage("/assets/Sickle.png")
    toolSpriteImages.wateringCan = loadImage("/assets/Watering_can.png")

    for (let i = 1; i <= 4; i++) {
        cornSpriteImages.push(`/assets/corn/Corn_state_${i}.png`)
    }
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

    class FarmCell extends Group {

        currentCrop = ''
        growthStage = 0
        timeForCompletion = 0  // Time in ms until crop is done
        currentTimeTowardsCompletion = 0  // Time in ms that the crop has been growing

        waterValue = 0
        organicMatValue = 0
        fertilizerValue = 0

        baseTile
        growingCrop

        constructor() {
            super()

            this.baseTile = new Sprite()
            this.growingCrop = new Sprite()
            this.add(this.baseTile)
            this.add(this.growingCrop)

            this.baseTile.width = 100
            this.baseTile.color = 'brown'
            this.baseTile.layer = 0
            this.baseTile.opacity = 0.1

            this.currentCrop = 'corn'
            this.timeUntilCompletion = 10000
        }

        onMouseLeftClick() {
            console.log("hi!!")
            if (currentTool === "wateringCan") {
                waterValue += 10
            } else if (currentTool === "sickle") {
                if (this.growthStage === 3) {
                    this.currentCrop = ''
                    this.growthStage = 0
                    this.currentTimeTowardsCompletion = 0
                }
            }
        }

        draw() {
            super.draw()
        }

        update() {
            if (this.currentCrop === "corn") {
                this.growingCrop.image = cornSpriteImages[this.growthStage]
            }

            if (this.currentCrop !== '') {
                this.currentTimeTowardsCompletion += deltaTime
            }

            this.growthStage = Math.min((this.currentTimeTowardsCompletion / this.timeForCompletion) * 3, 3)

            super.update()
        }

    }

	toolSprite = new PlayerTool()
    roundObjects.add(toolSprite)

    farmCellTest = new FarmCell()
    roundsGroups.push(farmCellTest)
    roundObjects.add(farmCellTest.baseTile)
    roundObjects.add(farmCellTest.growingCrop)

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

function update() {
    // From https://stackoverflow.com/questions/79411871/how-to-detect-a-click-on-a-sprite-in-p5play for easy click event
    if ( !mouse.presses('left') )
        return
    for ( let s of allSprites )
        if ( s.onMouseLeftClick !== undefined && s.mouse.hovering() )
            s.onMouseLeftClick()
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


    roundsGroups[0].update()
    roundsGroups[0].draw()

    roundObjects.update()
    roundObjects.draw()

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

