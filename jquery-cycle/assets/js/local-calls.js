$(document).ready(function() {

    $('.gallery').cycle({ 
            fx: 'shuffle', 
            speed: 450, 
            timeout: 3000, 
            next: '.gallery', 
            pause: 1 
        });
    });