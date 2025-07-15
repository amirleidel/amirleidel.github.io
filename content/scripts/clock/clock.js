const DIGIT_WIDTH = 16;
const DIGIT_HEIGHT = 28;
const SCALE = 2.6;
const SPRITE_SRC = '../scripts/clock/digits.png'; // digit sprite sheet
const CANVAS_ID = 'timeCanvas';
const UPDATE_INTERVAL_MS = 500; // update every second

const tcanvas = document.getElementById(CANVAS_ID);
const ctx = tcanvas.getContext('2d');
const sprite = new Image(DIGIT_WIDTH*10,DIGIT_HEIGHT);
sprite.src = SPRITE_SRC;
ctx.imageSmoothingEnabled = false;

sprite.onload = () => {
    updateTime();
    setInterval(updateTime, UPDATE_INTERVAL_MS);
};

async function fetchUTCTime() {
    /*
    try {
        // fetch UTC time
        const res = await fetch('https://timeapi.io/api/Time/current/zone?timeZone=UTC');
        const data = await res.json();

        return {
            hours: data.hour.toString().padStart(2, '0'),
            minutes: data.minute.toString().padStart(2, '0')
        };
    } catch (error) {
        // get locally from browser 
        const data = new Date();
        return Promise.resolve({
            hours: data.getUTCHours().toString().padStart(2, '0'),
            minutes: data.getUTCMinutes().toString().padStart(2, '0')
        });
    }
    */
    /* get locally from browser */
    const data = new Date();
    return Promise.resolve({
        hours: data.getUTCHours().toString().padStart(2, '0'),
        minutes: data.getUTCMinutes().toString().padStart(2, '0'),
        seconds: data.getUTCSeconds().toString().padStart(2, '0')
    });
}

async function updateTime() {
    const { hours, minutes, seconds } = await fetchUTCTime();
    const timeString = hours + minutes + seconds;
    tcanvas.setAttribute("title",timeString);
    
    ctx.clearRect(0, 0, tcanvas.width, tcanvas.height);
    
    for (let i = 0; i < timeString.length; i++) {
        let digit = parseInt(timeString[i], 10);
        if (digit == 0 && i % 2 == 0) {
            digit = 10; // use lowercase 0 for first 0 digit
        };
        ctx.drawImage(
            sprite,
            digit * DIGIT_WIDTH, 0, // Source x, y
            DIGIT_WIDTH, DIGIT_HEIGHT, // Source width, height
            SCALE*16 + ~~(i/2)*2 + i * SCALE * DIGIT_WIDTH, SCALE * 10, // Destination x, y
            SCALE * DIGIT_WIDTH, 1.3 * SCALE * DIGIT_HEIGHT // Destination width, height
        );
    }
}
