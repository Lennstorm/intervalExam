document.addEventListener('DOMContentLoaded', () => {

    //Global event-delegation för att alla click ska registreras oavsett när/var man är
    document.body.addEventListener('click', function (event) {
        const target = event.target;

        console.log('Clicked element:', target);

        switch (true) {
            case target.closest('.landing-wrapper') !== null:
                console.log('Navigating to setTimer page');
                navigateTo('setTimer');
                break;

            case target.closest('.navMenu-openBtn') !== null:
                openMenu();
                break;

            case target.closest('.navMenu-closeBtn') !== null:
                closeMenu();
                break;

            case target.closest('.setTimer-btn') !== null:
                navigateTo('analog-timer');
                //            startTimer();
                break;

            //            case target.closest('.setTimer-column--left') !== null:
            //            decreaseTime();
            //            break;

            //            case target.closest('.setTimer-column--right') !== null:
            //            increaseTime();
            //           break;            

            case target.closest('.abortTimer-btn') !== null:
                navigateTo('setTimer');
                //            resetTimer();
                break;

            case target.closest('.menu__item') !== null:
                const targetPage = target.getAttribute('data-target');
                navigateTo(targetPage);
                closeMenu();
                break;

            /*             case target.closest('.') !== null:
                        ();
                        break;
                        
                        case target.closest('.') !== null:
                        ();
                        break;
                        
                        case target.closest('.') !== null:
                        ();
                        break;
                        
                        case target.closest('.') !== null:
                        ();
                        break;  */
        }

    });

    placeMarks();
});

function navigateTo(pageId) {
    const allPages = document.querySelectorAll('.page');

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


function openMenu() {
    const menu = document.getElementById('menu');
    menu.classList.remove('page--inactive');
    menu.classList.add('page--active');
}

function closeMenu() {
    const menu = document.getElementById('menu');
    menu.classList.remove('page--active');
    menu.classList.add('page--inactive');
}


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

// function decreaseTime() {

//}

//function increaseTime() {

//}

//function resetTimer() {

//}