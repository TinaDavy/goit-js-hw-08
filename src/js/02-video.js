import { throttle } from "lodash";

const iframe = document.querySelector('iframe');
    const player = new Vimeo.Player(iframe);


const onPlay = throttle(function(data) {
    player.getCurrentTime().then(function(seconds) {
        localStorage.setItem("videoplayer-current-time", JSON.stringify(seconds));
    }).catch(function(error) {
        console.log(error.message);
    });
},1000);

player.on('timeupdate', onPlay);

const seconds = Number(localStorage.getItem("videoplayer-current-time"));

player.setCurrentTime(seconds).then(function(seconds) {
    // seconds = the actual time that the player seeked to
}).catch(function(error) {
    switch (error.name) {
        case 'RangeError':
            // the time was less than 0 or greater than the video’s duration
            break;

        default:
            // some other error occurred
            break;
    }
}); 

