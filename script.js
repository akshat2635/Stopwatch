const minutesLabel = document.getElementById('minutes');
const secondsLabel = document.getElementById('seconds');
const millisecondsLabel = document.getElementById('milliseconds');

const startButton = document.getElementById('start');
const stopButton = document.getElementById('stop');
const pauseButton = document.getElementById('pause');
const resetButton = document.getElementById('reset');

const lapList = document.getElementById('lap-list');

/// stopwatch variables

let minutes = 0;
let seconds = 0;
let milliseconds = 0;
let interval;


startButton.addEventListener('click',startTimer);
stopButton.addEventListener('click',stopTimer);
pauseButton.addEventListener('click',pauseTimer);
resetButton.addEventListener('click',resetTimer);



function startTimer(){
    if (!interval) { 
        interval = setInterval(updateTimer, 10);
    }
    // interval =  setInterval(updateTimer,10);
    startButton.disabled = true;
    pauseButton.disabled=false;
    stopButton.disabled=false;
}

function stopTimer(){
    clearInterval(interval);
    interval=null
    addToLapList();
    resetTimerData();
    startButton.disabled = false;
    stopButton.disabled=true;
    pauseButton.disabled=true;

}

function pauseTimer(){
    clearInterval(interval);
    interval = null; // Clear the interval variable
    startButton.disabled = false;
    pauseButton.disabled = true;
}

function resetTimer(){
    clearInterval(interval);
    interval = null; // Clear the interval variable
    resetTimerData();
    startButton.disabled = false;
    pauseButton.disabled = true;

}

function updateTimer(){
    milliseconds++;
    if(milliseconds === 100){  //// 1000  -> 1 seconds = 1000 millseconds
        milliseconds = 0;
        seconds++;
        if(seconds === 60){
            seconds = 0;
            minutes++;
        }
    }

    displayTimer();
}

function displayTimer(){
    millisecondsLabel.textContent = padTime(milliseconds);
    secondsLabel.textContent = padTime(seconds);
    minutesLabel.textContent = padTime(minutes);    
}

function padTime(time){
    return time.toString().padStart(2,'0');
}

function resetTimerData(){
    minutes = 0;
    seconds = 0;
    milliseconds = 0;
    displayTimer();
}

function addToLapList(){
    const lapTime = `${padTime(minutes)}:${padTime(seconds)}:${padTime(milliseconds)}`;

    const listItem = document.createElement('li');
    listItem.innerHTML = `<span>Lap ${lapList.childElementCount + 1}: </span>${lapTime}`;
    lapList.appendChild(listItem);
}
pauseButton.disabled = true;
stopButton.disabled=true;