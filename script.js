let startTime = 0;
let elapsedTime = 0;
let timerInterval;
let running = false;

const display = document.getElementById("display");
const startStopBtn = document.getElementById("startStop");
const lapBtn = document.getElementById("lap");
const resetBtn = document.getElementById("reset");
const laps = document.getElementById("laps");

function timeToString(time) {
    let diffInHrs = time / 3600000;
    let hh = Math.floor(diffInHrs);

    let diffInMin = (diffInHrs - hh) * 60;
    let mm = Math.floor(diffInMin);

    let diffInSec = (diffInMin - mm) * 60;
    let ss = Math.floor(diffInSec);

    let diffInMs = (diffInSec - ss) * 100;
    let ms = Math.floor(diffInMs);

    return (
        (hh < 10 ? "0" : "") + hh + ":" +
        (mm < 10 ? "0" : "") + mm + ":" +
        (ss < 10 ? "0" : "") + ss + "." +
        (ms < 10 ? "0" : "") + ms
    );
}

function print(txt) {
    display.innerHTML = txt;
}

function startStop() {
    if (!running) {
        startTime = Date.now() - elapsedTime;
        timerInterval = setInterval(function printTime() {
            elapsedTime = Date.now() - startTime;
            print(timeToString(elapsedTime));
        }, 10);
        startStopBtn.innerHTML = "Pause";
        running = true;
    } else {
        clearInterval(timerInterval);
        startStopBtn.innerHTML = "Start";
        running = false;
    }
}

function reset() {
    clearInterval(timerInterval);
    print("00:00:00.00");
    elapsedTime = 0;
    startStopBtn.innerHTML = "Start";
    laps.innerHTML = "";
    running = false;
}

function lapTime() {
    if (running) {
        let li = document.createElement("li");
        li.innerText = timeToString(elapsedTime);
        laps.appendChild(li);
    }
}

startStopBtn.addEventListener("click", startStop);
resetBtn.addEventListener("click", reset);
lapBtn.addEventListener("click", lapTime);
