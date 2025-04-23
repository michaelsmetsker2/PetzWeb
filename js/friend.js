/*
class definition for friend, a buddy that will follow around the mouse

todo: 
    fix sprite jumping when it first starts moving
*/

const STOPTHRESHHOLD = 150; //the distance the friend will stop moving towards the mouse
const FOLLOW_THRESHHOLD = 300; //the distance the friend will fresume following the moues
const SPEED = 3; //speed in which the friend will move each update

class Friend {
    constructor() {
        //Position of the friend
        this.posX = 250;
        this.posY = 250;

        //position position of the mouse
        this.mouseX;
        this.mouseY;

        this.direction = 0; //angle of the mouse from the friend in radians
        this.distance = 0; //distance from the mouse in px
        
        this.moving = false; //whether the friends is currently moving

        // Create a DOM element to represent the friend
        this.element = document.createElement('img');
        this.element.src = 'images/still.jpg'
        this.element.style.position = 'fixed';
        this.element.style.left = `${this.posX}px`; //offest is wierd so this causes it to to a jump when it starts moving
        this.element.style.top = `${this.posY}px`;
        this.element.style.width = '100px'
        this.element.style.zIndex = '9999'; //keeps the image above everything else on the page

        document.body.appendChild(this.element); //add the newly created element to the end of <body>

        // Adds an event listener that will call the updateMousePosition function every time the mouse moves
        document.addEventListener('mousemove', this.updateMousePosition.bind(this));

        // Start the animation loop
        this.animate();
    }

    /*
    Calls the update position function and repeats itself at a frequency depending on the refresh rate if of the client
    */
    animate() {
        this.updatePosition();
        requestAnimationFrame(this.animate.bind(this));
    }

    /*
    handles the momement of the friend toward the mouse
    */
    updatePosition() {

        let differenceX = this.mouseX - this.posX;
        let differenceY = this.mouseY - this.posY;

        //calculates the distance from the mouse
        this.distance = Math.sqrt(differenceX ** 2 + differenceY ** 2)

        //get the angle in radians
        this.direction = Math.atan2(differenceY, differenceX);

        //determines whether or not the object should continue to move
        if (this.distance < STOPTHRESHHOLD && this.moving) {
            this.moving = false;
            this.element.src = 'images/still.jpg'
        }
        if (this.distance > FOLLOW_THRESHHOLD && !this.moving) {
            this.moving = true;
            console.log("test");
            this.element.src = 'images/walking.gif'
        }

        if (this.moving) { 
            //moves the element towards the mouse in the correct direction
            this.posX += Math.cos(this.direction) * SPEED;
            this.posY += Math.sin(this.direction) * SPEED;

            //makes the element follow from the center of the image instead of the top left
            this.element.style.left = `${this.posX - this.element.offsetWidth / 2}px`;
            this.element.style.top = `${this.posY - this.element.offsetHeight / 2}px`;
        }

        this.updateSprite();
    }

    /*
    updates variables containing the position of the mouse

    @param event - mousemove event to read data from
    */
    updateMousePosition(event) {
        this.mouseX = event.clientX;
        this.mouseY = event.clientY;
    }

    /*
    updates the image of the friend depending on it's state and its direction
    */
    updateSprite() {

        //flips horozontally depending on mouse position
        if (this.direction < Math.PI / 2 || this.direction > -1.5708) {
            this.element.style.transform = 'scaleX(-1)'
        }
        if (this.direction > Math.PI / 2 || this.direction < -1.5708) {
            this.element.style.transform = 'scaleX(1)'
        }

        //still need to add animation changes depending on whether or not the friend is moving
    }
}

export default Friend;
