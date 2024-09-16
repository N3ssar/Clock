const clock = document.querySelector('.clock');
const brand = document.querySelector('.brand');
const hourHand = document.querySelector('.hour');
const minuteHand = document.querySelector('.minute');
const secondHand = document.querySelector('.second');
const toggleModeBtn = document.getElementById('toggleMode');
const digitalTime = document.getElementById('digitalTime');

function createClockNumbers() {
    const numberOfNumbers = 12;
    const angleStep = 360 / numberOfNumbers;
    const radius = 130; // Adjust this value to move numbers closer to or further from the edge

    for (let i = 0; i < numberOfNumbers; i++) {
        const number = document.createElement('div');
        number.className = 'number';
        number.textContent = i + 1;

        const angle = angleStep * i - 90; // Subtract 90 to adjust starting point
        const x = 150 + radius * Math.cos(angle * (Math.PI / 180));
        const y = 150 + radius * Math.sin(angle * (Math.PI / 180));

        number.style.left = `${x}px`;
        number.style.top = `${y}px`;
        clock.appendChild(number);
    }
}

function updateClock() {
    const now = new Date();
    const hours = now.getHours() % 12 || 12;
    const minutes = now.getMinutes();
    const seconds = now.getSeconds();
    const ampm = now.getHours() >= 12 ? 'PM' : 'AM';

    const hourDeg = (hours + minutes / 60) * 30;
    const minuteDeg = (minutes + seconds / 60) * 6;
    const secondDeg = seconds * 6;

    hourHand.style.transform = `rotate(${hourDeg}deg)`;
    minuteHand.style.transform = `rotate(${minuteDeg}deg)`;
    secondHand.style.transform = `rotate(${secondDeg}deg)`;

    digitalTime.textContent = `${hours}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')} ${ampm}`;
}

function toggleDarkMode() {
    document.body.classList.toggle('dark-mode');
    const isDarkMode = document.body.classList.contains('dark-mode');
    toggleModeBtn.textContent = isDarkMode ? '🌙' : '☀️';
    toggleModeBtn.setAttribute('aria-label', isDarkMode ? 'Switch to Light Mode' : 'Switch to Dark Mode');
}

function initialBrandAnimation() {
    brand.style.animation = 'initialFadeIn 5s forwards';
}

createClockNumbers();
toggleModeBtn.addEventListener('click', toggleDarkMode);
initialBrandAnimation();

// Improve performance by using requestAnimationFrame
let lastUpdateTime = 0;
function animateClock(currentTime) {
    if (currentTime - lastUpdateTime >= 1000) {
        updateClock();
        lastUpdateTime = currentTime;
    }
    requestAnimationFrame(animateClock);
}

requestAnimationFrame(animateClock);
