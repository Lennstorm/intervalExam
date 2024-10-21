document.addEventListener('DOMContentLoaded', () => {
    placeMarks();

    function navigateTo(pageId) {
        const allPages = dockument.querySelector('.page');

        allPages.forEach(page => {
            if (page.id === pageId) {
                page.classList.remove('page--inactive');
                page.classList.add('page--active');
            } else {
                page.classList.remove('page--active');
                page.classList.add('page--inactive');
            }
        });
    }

    document.querySelectorAll('.menu__item').forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = e.target.getAttribute('onclick').split("'")[1]; //hämta pageId av onclick
            navigateTo(targetPage);
        });
    });
    document.querySelector('.landing-wrapper').addEventListener('click', () => navigateTo('setTimer'));
    document.querySelector('.setTimer-btn').addEventListener('click', () => navigateTo('analog-timer'));
});

function placeMarks() {

    const clockFace = document.querySelector('.analog-timer');
    

    for (let i = 0; i < 60; i++) {
        const mark = document.createElement('div');
        mark.classList.add('analog-timer__mark');
        mark.style.transform = `rotate(${i * 6}deg) translateY(-1350%)`;
        clockFace.appendChild(mark);
    }
    console.log('marks placed')
}