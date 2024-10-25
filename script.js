document.addEventListener('DOMContentLoaded', () => {

    let timer = new easytimer.Timer();
    let setMinutes = 0;
    animateLandingLogo();

    //Global event-delegation för att alla click ska registreras oavsett när/var man är
    document.body.addEventListener('click', function (event) {
        const target = event.target;

        //console.log('Clicked element:', target);

        switch (true) {
            case target.closest('.landing-wrapper') !== null:
                console.log('Navigating to setTimer page');
                navigateTo('setTimer');
                break;

            case target.closest('.navMenu-openBtn') !== null:
                console.log('Opening menu');
                openMenu();
                break;

            case target.closest('.navMenu-closeBtn') !== null:
                console.log('Closing menu');
                closeMenu();
                break;

            case target.closest('.setTimer-column--left') !== null:
                console.log('Decreasing time one minute');
                if (setMinutes > 0) {
                    setMinutes--;                    
                    updateTimerDisplay(setMinutes);
                }
                break;

            case target.closest('.setTimer-column--right') !== null:
                console.log('Increasing time one minute');
                setMinutes++;                
                updateTimerDisplay(setMinutes);
                break;

            case target.closest('.setTimer-btn') !== null:
                console.log('Starting Timer');
                if (setMinutes === 0) {
                    console.log('Timer is set to zero. Staying on page')
                } else {
                    console.log('Navigating to startTimer page');
                    startTimer(setMinutes);
                    setTimeout(() =>{ 
                        navigateTo('analog-timer');
                    }, 500);
                }
                break;


            case target.closest('.abortTimer-btn') !== null:
                console.log('Resetting timer');
                timer.stop();
                setMinutes = 0;
                updateTimerDisplay(setMinutes);
                resetAnalogTimer();
                document.getElementById('digital-timer-display').textContent = "00:00";
                console.log('Navigating to setTimer page');
                navigateTo('setTimer');                
                break;

            case target.closest('.menu__item') !== null:
                const targetPage = target.getAttribute('data-target');
                console.log('Navigating to:', target);
                navigateTo(targetPage);
                console.log('Closing menu');
                closeMenu();
                break;

                case target.closest('.page--alarm__btn') !== null:
                navigateTo('setTimer');
                break;
        }

    });

    placeMarks();

    function updateTimerDisplay(minutes) {
        document.querySelector('.setTimer-number').textContent = String(minutes).padStart(2, '0')
    }

    function startTimer(minutes) {
        const startButton = document.querySelector('.setTimer-btn');
        startButton.classList.add('clicked');

        setTimeout(() => {
            startButton.classList.remove('clicked');
        }, 200);

        timer.start({ countdown: true, startValues: { minutes: minutes } });        

        /* document.querySelector('.analog-timer__hand--seconds').classList.add('start'); */ /* AVAKTIVERAD FÖR ATT STYRA MED JS ISTÄLLET */

        const initialMinutesAngle = (minutes * 6) % 360;
        document.querySelector('.analog-timer__hand--minutes').style.transform = `translateX(-50%) rotate(${initialMinutesAngle}deg)`;
        
        //uppdatera digital och analog
        timer.addEventListener('secondsUpdated', function () {
            const timeValues = timer.getTimeValues();            
            const totalSeconds = minutes * 60;            
            const secondsPassed = totalSeconds - timer.getTotalTimeValues().seconds;

            // uppdatera digital timer
            document.getElementById('digital-timer-display').textContent = timer.getTimeValues().toString(['minutes', 'seconds']);
        
            //uppdatera analog timer
            updateAnalogTimer(timeValues.minutes, timeValues.seconds);
        });

        // timer klar
        timer.addEventListener('targetAchieved', function (e) {
            navigateTo('alarm');
            setMinutes = 0;
            updateTimerDisplay(setMinutes);
        });
    }

    //uppdatera analog
    function updateAnalogTimer(currentMinutes, currentSeconds) {
        const minuteHand = document.querySelector('.analog-timer__hand--minutes');
        const secondHand = document.querySelector('.analog-timer__hand--seconds'); /* ÅTERSTÄLLD FÖR ATT STYRA MED JS IGEN */

        //rotationer moturs
        const minutesRotation = (currentMinutes * 6) % 360;    
        const secondsRotation = (currentSeconds * 6) % 360; /* ÅTERSTÄLLD FÖR ATT STYRA MED JS IGEN */

        // uppdatera visarnas positioner
        if (minuteHand) {
            minuteHand.style.transform = `translateX(-50%) rotate(${minutesRotation}deg)`;
        }
        if (secondHand) {
            secondHand.style.transform = `translateX(-50%) rotate(${secondsRotation}deg)`; /* ÅTERSTÄLLD FÖR ATT STYRA MED JS IGEN */
        }


    } 

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

function resetAnalogTimer() {
    const minuteHand = document.querySelector('.analog-timer__hand--minutes');
    const secondHand = document.querySelector('.analog-timer__hand--seconds');

    if (minuteHand) {
        minuteHand.style.transform = `translateX(-50%) rotate(0deg)`;
    }

    if (secondHand) {
        secondHand.classList.remove('start');
    }
}


//  ANIMATIONS

function animateLandingLogo() {
    const lines = document.querySelectorAll('.line');
    const title = document.querySelector('.landing-title');
    const tagline = document.querySelector('.landing-tagline');
    

    anime({
        targets: Array.from(lines).reverse(),
        translateX: ['-100vw', '0'],
        easing: 'easeOutExpo',
        duration: 1200,
        delay: anime.stagger(300, {start: 500}), // Stagger mellan varje linje, startar efter 500ms
        complete: function(){
            anime({
                targets: title,
                translateY: ['20px', '0'],
                opacity: [0, 1],
                easing: 'easeOutExpo',
                duration: 4000,
            });
            
            anime({
                targets: tagline,
                translateY: ['20px', '0'],
                opacity: [0, 1],
                easing: 'easeOutExpo',
                duration: 3000,
                delay: 1200,
        });
        }
    });
}