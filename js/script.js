//script.js

import Friend from './friend.js';

//will call createFriend function when a button with the id friendButton is pressed
document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('friendButton');
    button.addEventListener('click', createFriend);
});

function createFriend() {
    
    const buddy = new Friend(); //creates the friend
}