let isRunning = false;
let startTime;
let interval;
let lapCounter = 1;

function startStop() {
    if (!isRunning) {
        start();
        document.getElementById('startStop').innerHTML = 'Pause';
    } else {
        pause();
        document.getElementById('startStop').innerHTML = 'Resume';
    }
}

function start() {
    if (!isRunning) {
        isRunning = true;
        startTime = new Date() - (startTime || 0);
        interval = setInterval(updateTime, 10);
    }
}

function pause() {
    isRunning = false;
    clearInterval(interval);
}

function reset() {
    isRunning = false;
    clearInterval(interval);
    startTime = 0;
    lapCounter = 1;
    document.getElementById('display').innerHTML = '00:00:00';
    document.getElementById('startStop').innerHTML = 'Start';
    document.getElementById('lapList').innerHTML = '';
}

function updateTime() {
    const currentTime = new Date() - startTime;
    const minutes = Math.floor(currentTime / 60000);
    const seconds = Math.floor((currentTime % 60000) / 1000);
    const milliseconds = (currentTime % 1000).toString().slice(0, 2);

    document.getElementById('display').innerHTML = `${formatTime(minutes)}:${formatTime(seconds)}:${milliseconds}`;
}

function formatTime(time) {
    return time < 10 ? `0${time}` : time;
}

function lap() {
    if (isRunning) {
        const lapTime = document.getElementById('display').innerHTML;
        const lapItem = document.createElement('li');
        lapItem.innerHTML = `Lap ${lapCounter}: ${lapTime}`;
        document.getElementById('lapList').appendChild(lapItem);
        lapCounter++;
    }
}

reset();
