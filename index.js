const playBtn = document.querySelector('.play-btn');
const audio = document.querySelector('audio');
const totalTime = document.getElementById('total-time');
const currentTime = document.getElementById('current-time');
const coverContainer = document.querySelector('.cover-container');
const background = document.querySelector('.background');
const artistName = document.querySelector('.artist-name');
const songName = document.querySelector('.song-name');
const nextBtn = document.querySelector('.next-btn');
const prevBtn = document.querySelector('.prev-btn');
const seekBar = document.querySelector('#seek-bar');
const mute = document.querySelector('.mute-btn');
const volumeBar = document.querySelector('#volume-bar');
const volume = document.querySelector('.volume-btn');

let isMuted = true;
let playNum = 0;
let isPlaying = true;

const tracks = [
    {
        artistName: 'Kylie Minogue',
        songName: 'In Your Eyes',
        src: 'audio/Kylie_Minogue_In_Your_Eyes.mp3',
        cover: 'img/in your eyes.jpeg',
        duration: '3:21'
    },
    {
        artistName: 'Kylie Minogue',
        songName: 'Go hard or go home',
        src: 'audio/Kylie_Minogue_Go_hard_or_go_home.mp3',
        cover: 'img/go hard or go home.jpeg',
        duration: '3:43'
    },
    {
        artistName: 'Kylie Minogue',
        songName: 'Chiggy Wiggy',
        src: 'audio/Kylie_Minogue_Chiggy_Wiggy.mp3',
        cover: 'img/chiggy wiggy.jpeg',
        duration: '5:13'
    },
    {
        artistName: 'Kylie Minogue',
        songName: 'Love Love Love',
        src: 'audio/Kylie_Minogue_Love_Love_Love.mp3',
        cover: 'img/love.jpeg',
        duration: '4:03'
    },
    {
        artistName: 'Kylie Minogue',
        songName: 'Ilusion',
        src: 'audio/Kylie_Minogue_llusion.mp3',
        cover: 'img/ilusion.jpeg',
        duration: '3:22'
    },
    {
        artistName: 'Kylie Minogue',
        songName: 'Ilusion',
        src: 'audio/Kylie_Minogue_Closer.mp3',
        cover: 'img/closer.jpeg',
        duration: '3:09'
    }
]

let currentAudioTime = 0;

function playAudio() {
    audio.src = tracks[playNum].src;
    audio.currentTime = currentAudioTime;
    audio.play();
}

playBtn.addEventListener('click', () => {
    if (audio.paused) {
        playBtn.classList.remove("play-btn");
        playBtn.classList.add("pause-btn");
        playAudio();
        isPlaying = true;
    } else {
        playBtn.classList.remove("pause-btn");
        playBtn.classList.add("play-btn");
        currentAudioTime = audio.currentTime;
        audio.pause();
        isPlaying = false;
    }
});

nextBtn.addEventListener('click', () => {
    playNum++;
    if (playNum >= tracks.length) {
        playNum = 0;
    };
    totalTime.textContent = tracks[playNum].duration;
    currentAudioTime = 0;
    currentAudioTime.textContent = '0:00';

    coverContainer.style.backgroundImage = `url('${tracks[playNum].cover}')`;

    background.style.backgroundImage = `url('${tracks[playNum].cover}')`;

    songName.textContent = tracks[playNum].songName;
    artistName.textContent = tracks[playNum].artistName;

    if (isPlaying) {
        playAudio();
    };
});
prevBtn.addEventListener('click', () => {
    playNum--;
    if (playNum < 0) {
        playNum = tracks.length - 1;
    }
    totalTime.textContent = tracks[playNum].duration;
    currentAudioTime = 0;
    currentAudioTime.textContent = '0:00';

    coverContainer.style.backgroundImage = `url('${tracks[playNum].cover}')`;

    background.style.backgroundImage = `url('${tracks[playNum].cover}')`;

    songName.textContent = tracks[playNum].songName;
    artistName.textContent = tracks[playNum].artistName;
    if (isPlaying) {
        playAudio();
    };
});

audio.addEventListener('timeupdate', () => {
    const progress = (audio.currentTime / audio.duration) * 100;

    seekBar.value = progress;

    currentTime.textContent = formatTime(audio.currentTime);
});

function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? '0' : ''}${remainingSeconds}`;
}

seekBar.addEventListener('input', () => {
    const newTime = (seekBar.value / 100) * audio.duration;

    audio.currentTime = newTime;
});

volumeBar.addEventListener('input', () => {
    const volumeLevel = volumeBar.value / 100;
    audio.volume = volumeLevel;
});

mute.addEventListener('click', () => {
    audio.volume = 0;
    volumeBar.value = 0;
});

volume.addEventListener('click', () => {
    const newVolume = parseInt(volumeBar.value) + 20;
    volumeBar.value = Math.min(newVolume, 100);
    audio.volume = volumeBar.value / 100;
});
