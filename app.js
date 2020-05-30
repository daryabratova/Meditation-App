const app = () => {
    const appElement = document.querySelector('#app')

    const pickRainModeElement = document.querySelector('.pick-rain-mode')
    const pickBeachModeElement = document.querySelector('.pick-beach-mode')

    const song = document.querySelector('.song');
    const play = document.querySelector('.play');
    const outline = document.querySelector('.moving-outline circle');
    const video = document.querySelector('.vid-container video');

    const sounds = document.querySelectorAll('.sound-picker button');

    const timeDisplay = document.querySelector('.time-display');
    const timeSelect = document.querySelectorAll('.time-select button');

    const outlineLength = outline.getTotalLength();
    
    let duration = 600;

    outline.style.strokeDasharray = outlineLength;
    outline.style.strokeDashoffset = outlineLength;

    // sounds.forEach(sound => {
    //     sound.addEventListener('click', function() {
    //         song.src = this.getAttribute('data-sound');
    //         video.src = this.getAttribute('data-video');

    //         checkPlaying(song);
    //     })
    // })

    pickRainModeElement.addEventListener('click', () => {
        appElement.classList.add('rain')
        appElement.classList.remove('beach')
        song.src = "./sounds/rain.mp3";
        video.src = "./video/rain.mp4";
        checkPlaying(song);
    })

    pickBeachModeElement.addEventListener('click', () => {
        appElement.classList.add('beach')
        appElement.classList.remove('rain')
        song.src = "./sounds/beach.mp3";
        video.src = "./video/beach.mp4";
        checkPlaying(song);
    })

    play.addEventListener('click', () => {
        checkPlaying(song);
    });

    timeSelect.forEach(option => {
        option.addEventListener('click', function() {
            duration = this.getAttribute('data-time');
            timeDisplay.textContent = `${Math.floor(duration / 60)}:${String(duration%60).padStart(2, '0')}`;
        })
    })

    const checkPlaying = song => {
        if(song.paused) {
            song.play();
            video.play();
            play.src = './svg/pause.svg';
        } else {
            song.pause();
            video.pause();
            play.src = './svg/play.svg';
        }
    };

    song.ontimeupdate = () => {
        let currentTime = song.currentTime;
        let elapsed = duration - currentTime;
        let seconds = Math.floor(elapsed % 60);
        let minutes = Math.floor(elapsed / 60);

        let progress = outlineLength - (currentTime / duration) * outlineLength;
        outline.style.strokeDashoffset = progress;


        timeDisplay.textContent = `${minutes}:${String(seconds).padStart(2, '0')}`;

        if(currentTime >= duration) {
            song.pause();
            song.currentTime = 0;
            play.src = './svg/play.svg';
            video.pause();
        }

    }
    
};

app();