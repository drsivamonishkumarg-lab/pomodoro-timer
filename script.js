// PWA Service Worker Registration
if ('serviceWorker' in navigator) {
  window.addEventListener('load', () => {
    navigator.serviceWorker.register('/sw.js')
      .then(reg => console.log('Service Worker registered!'))
      .catch(err => console.log('Service Worker registration failed: ', err));
  });
}
// --- Setup Variables ---
const pomodoroDuration = 25 * 60; // 25 minutes in seconds
let timeRemaining = pomodoroDuration;
let timerInterval;
let isRunning = false;

// --- Get HTML Elements ---
const timeDisplay = document.getElementById('time-display');
const startBtn = document.getElementById('start-btn');
const pauseBtn = document.getElementById('pause-btn');
const resetBtn = document.getElementById('reset-btn');

// --- Functions ---

// 1. Update the display with current time
function updateDisplay() {
    const minutes = Math.floor(timeRemaining / 60);
    const seconds = timeRemaining % 60;
    
    // Format the time as MM:SS (e.g., 05:03)
    const formattedTime = `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
    timeDisplay.textContent = formattedTime;
}

// 2. The core countdown logic
function countdown() {
    if (isRunning && timeRemaining > 0) {
        timeRemaining--;
        updateDisplay();
        
        if (timeRemaining === 0) {
            // Timer finished!
            clearInterval(timerInterval);
            isRunning = false;
            alert("Time's up! Take a break."); // Simple notification
        }
    }
}

// 3. Start the timer
function startTimer() {
    if (!isRunning) {
        isRunning = true;
        // Run the countdown function every 1000 milliseconds (1 second)
        timerInterval = setInterval(countdown, 1000); 
    }
}

// 4. Pause the timer
function pauseTimer() {
    isRunning = false;
    clearInterval(timerInterval);
}

// 5. Reset the timer
function resetTimer() {
    pauseTimer(); // Stop the interval first
    timeRemaining = pomodoroDuration;
    updateDisplay();
}

// --- Event Listeners ---
startBtn.addEventListener('click', startTimer);
pauseBtn.addEventListener('click', pauseTimer);
resetBtn.addEventListener('click', resetTimer);

// --- Initial Setup ---
updateDisplay(); // Show "25:00" when the page loads
