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
    
    let duration = 600;

    timeDisplay.textContent = formatTime(duration);

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    pickRainModeElement.addEventListener('click', () => {
        appElement.classList.remove('active')
        
        appElement.classList.add('rain')
        appElement.classList.remove('beach')

        song.src = "./sounds/rain.mp3";
        video.src = "./video/rain.mp4";
    })

    pickBeachModeElement.addEventListener('click', () => {
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
            duration = this.getAttribute('data-time');
            timeDisplay.textContent = formatTime(duration);
        })
    })

    const togglePlayer = () => {
        if(song.paused) {
            song.play();
            video.play();
        } else {
            song.pause();
            video.pause();
        }
    };

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = duration - currentTime;

        let progress = outlineLength - (currentTime / duration) * outlineLength;
        outline.style.strokeDashoffset = progress;

        timeDisplay.textContent = formatTime(elapsed);

        if(currentTime >= duration) {
            appElement.classList.remove('active');
            song.pause();
            song.currentTime = 0;
            video.pause();
        }

    }
    
};

app();