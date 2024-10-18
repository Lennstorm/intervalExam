document.addEventListener('DOMContentLoaded', () => {

    placeMarks();
});

function placeMarks() {

    const clockFace = document.querySelector('.analog-timer');
    

    for (let i = 0; i < 60; i++) {
        const mark = document.createElement('div');
        mark.classList.add('analog-timer__mark');
        mark.style.transform = `rotate(${i * 6}deg) translateY(-1200%)`;
        clockFace.appendChild(mark);
    }
    console.log('marks placed')
}