//script.js

import Friend from './friend.js';

document.addEventListener('DOMContentLoaded', function () {
    const button = document.getElementById('friendButton');
    button.addEventListener('click', createFriend);
});

function createFriend() {
    
    const buddy = new Friend(); //creates the friend
}