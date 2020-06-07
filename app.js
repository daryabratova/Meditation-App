const app = () => {
    const formatTime = seconds => {
        const parts = [
            seconds % 60,
            seconds / 60
        ];

        return parts.reverse().map(part => String(Math.floor(part)).padStart(2, '0')).join(':');
    };

    const appElement = document.querySelector('#app');

    const switcherElement = document.querySelector('.switcher');
    const pickRainModeElement = document.querySelector('.pick-rain-mode')
    const pickBeachModeElement = document.querySelector('.pick-beach-mode')

    const song = document.querySelector('.song');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    const outlineLength = outline.getTotalLength();
    
    const createTimer = () => {

        let timerInterval, isPaused, timePassed, timeStamp, tickIntervalId;

        isPaused = true;
        timePassed = 0;

        const tick = (props) => {
            const { timePassed, isFirst = false, isLast = false } = props;

            console.log(timePassed);

            const timeElapsed = timerInterval - timePassed;

            const progress = outlineLength - (timePassed / timerInterval) * outlineLength;
            outline.style.strokeDashoffset = progress;

            timeDisplay.textContent = formatTime(timeElapsed);
            
            if (isLast) {                
                appElement.classList.remove('active');

                timeDisplay.textContent = formatTime(timerInterval);

                song.pause();
                song.currentTime = 0;

                video.pause();
            }
        }

        const getTimePassedFromLastStamp = () => {
            return Math.floor((Date.now() - timeStamp) / 1000);
        }

        const setTimerInterval = (seconds) => {
            timerInterval = seconds;
        };
        
        const startTimer = () => {
            if (isPaused) {
                isPaused = false;

                tick({
                    timePassed,
                    isFirst: timePassed === 0,
                });

                timeStamp = Date.now();

                tickIntervalId = setInterval(() => {
                    const timePassedFromLastStamp = getTimePassedFromLastStamp();
                    
                    tick({
                        timePassed: timePassed + timePassedFromLastStamp,
                    });

                    if (timePassed + timePassedFromLastStamp >= timerInterval) {
                        resetTimer();
                    }
                }, 1000/5);
            } 
        };

        const pauseTimer = () => {
            if (!isPaused) {
                isPaused = true;

                clearInterval(tickIntervalId);
            
                const timePassedFromLastStamp = getTimePassedFromLastStamp();

                timePassed = timePassed + timePassedFromLastStamp;

                tick({
                    timePassed,
                });
            }
        };

        const resetTimer = () => {
            isPaused = true;

            clearInterval(tickIntervalId);

            timePassed = 0;

            tick({
                timePassed,
                isLast: true,
            });
        };

        return {
            setTimerInterval,
            startTimer,
            pauseTimer,
            resetTimer,
        }
    }

    const defaultTimerInterval = 600;

    const timer = createTimer();
    timer.setTimerInterval(defaultTimerInterval);

    timeDisplay.textContent = formatTime(defaultTimerInterval);

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    pickRainModeElement.addEventListener('click', () => {
        timer.resetTimer();

        appElement.classList.remove('active')
        
        appElement.classList.add('rain')
        appElement.classList.remove('beach')

        song.src = "./sounds/rain.mp3";
        video.src = "./video/rain.mp4";
    })

    pickBeachModeElement.addEventListener('click', () => {
        timer.resetTimer();

        appElement.classList.remove('active')
        
        appElement.classList.add('beach')
        appElement.classList.remove('rain')
        
        song.src = "./sounds/beach.mp3";
        video.src = "./video/beach.mp4";
    })

    switcherElement.addEventListener('click', () => {
        appElement.classList.toggle('active');

        togglePlayer();
    });

    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            const time = this.getAttribute('data-time');

            timer.resetTimer();
            timer.setTimerInterval(time);

            timeDisplay.textContent = formatTime(time);
        })
    })

    const togglePlayer = () => {
        if(song.paused) {
            timer.startTimer();

            song.play();
            video.play();
        } else {
            timer.pauseTimer();

            song.pause();
            video.pause();
        }
    };    
};

app();