const controlImage = document.getElementById('controlImage');
const levelText = document.getElementById('level');
const currentSmall = document.getElementById('current-small-blind');
const currentBig = document.getElementById('current-big-blind');
const nextSmall = document.getElementById('next-small-blind');
const nextBig = document.getElementById('next-big-blind');

let isPaused = false;
let timerInterval;
let counter = 0;

// Set the initial target time.
const roundMinutes = 10;
let remainingTime;
resetTimer();

// Update the countdown every second
const timer = document.getElementById('timer');

function updateTimer() {
    if (!isPaused) {
        if (remainingTime > 0) {
            remainingTime -= 1000; // Subtract 1 second
            const minutes = Math.floor(remainingTime / 60000);
            const seconds = Math.floor((remainingTime % 60000) / 1000);

            const formattedMinutes = minutes < 10 ? `0${minutes}` : minutes;
            const formattedSeconds = seconds < 10 ? `0${seconds}` : seconds;

            timer.textContent = `${formattedMinutes}:${formattedSeconds}`;
        } else {
            resetTimer();
            loadBlinds();
        }
    }
}

function resetTimer() {
    remainingTime = roundMinutes * 60 * 1000;
}

updateTimer(); // Initial call
timerInterval = setInterval(updateTimer, 1000);

// Add a click event listener to the control button
controlButton.addEventListener('click', function () {
    isPaused = !isPaused;
    if (isPaused) {
        controlImage.src = 'play.png'; // Change the image for play
    } else {
        controlImage.src = 'pause.png'; // Change the image for pause
    }
});

// Add a click event listener to the fastForward button
fastForwardButton.addEventListener('click', function () {
    loadBlinds();
    resetTimer();
    // Set control in play mode.
    isPaused = false;
    controlImage.src = 'pause.png'; // Change the image for pause
});

// Add a click event listener to the back button
backButton.addEventListener('click', function () {
    if (counter > 2) {
        counter -= 4;
    }
    else {
        counter -= 2;
    }
    loadBlinds();
    resetTimer();
    // Set control in play mode.
    isPaused = false;
    controlImage.src = 'pause.png'; // Change the image for pause
});

// BLINDS
let numbersArray = [];

window.addEventListener('load', function () {
    fetch('blinds.csv')
        .then(response => response.text())
        .then(data => {
            const lines = data.split(/[\n,]+/);

            if (lines.length >= 0) {
                numbersArray = lines.map(line => parseFloat(line)).filter(num => !isNaN(num));
                loadBlinds();
            }
        })
        .catch(error => {
            console.error('An error occurred while loading the CSV file:', error);
        });
});



function loadBlinds() {
    currentSmall.textContent = numbersArray[counter];
    currentBig.textContent = numbersArray[counter+1];
    nextSmall.textContent = numbersArray[counter+2];
    nextBig.textContent = numbersArray[counter+3];
    counter += 2;
    levelText.textContent = "Level: " + counter/2;
}