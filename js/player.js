var songs = [
    "Big Shaq Man Not Hot.mp3",
    "Camila Cabello Ft Young Thug - Havana.mp3",
    "Charlie Puth How Long.mp3",
    "Craig David - Heartline.mp3",
    "Dave - No Words.mp3",
    "Jenifer Lopez - Amor Amor Amor Ft Wisin.mp3",
    "Liam Payne - Bedroom Floor.mp3",
    "Nightcore - I Miss You (Clean Bandit ft. Julia Michaels).mp3",
    "Rita_Ora_Anywhere.mp3",
    "STORMZY - Blinded by your grace Pt. 2 feat MNEK.mp3"
];

var songTitle = document.getElementById('songTitle');
var songSlider = document.getElementById('songSlider');
var currentTime = document.getElementById('currentTime');
var duration = document.getElementById('duration');
var volumeSlider = document.getElementById('volume');
var nextSong = document.getElementById('nextTitle');

var song = new Audio();
var currentSong = 0;

window.onload = loadSong();

function loadSong() {
    song.src = "songs/" + songs[currentSong];
    songTitle.textContent = (currentSong + 1) + ". " + songs[currentSong];
    nextSong.innerHTML = "<b>Next song</b> : " + songs[currentSong + 1 % songs.length];
    song.volume = volumeSlider.value;
    song.playbackRate = 1;
    song.play();
    setTimeout(songDuration, 1000);
}

setInterval(updateSongSlider, 1000);

function updateSongSlider() {
    var c = Math.round(song.currentTime);
    songSlider.value = c;
    currentTime.textContent = convertTime(c);
    if (song.ended) {
        next();
    }
}

function convertTime(secs) {
    var min = Math.floor(secs / 60);
    var sec = secs % 60;
    min = (min < 10) ? "0" + min : min;
    sec = (sec < 10) ? "0" + sec : sec;
    return (min + ':' + sec);
}

function songDuration() {
    var d = Math.floor(song.duration);
    songSlider.setAttribute('max', d);
    duration.textContent = convertTime(d);
}

function playOrPauseSong() {
    song.playbackRate = 1;
    var button = document.getElementById('play');
    if (song.paused) {
        song.play();
        button.className = "fa fa-pause-circle-o fa-5x";
    } else {
        song.pause();
        button.className = "fa fa-play-circle-o fa-5x";
    }
}

function next() {
    currentSong = currentSong + 1;
    loadSong();
}

function previous() {
    currentSong = currentSong - 1;
    current = (currentSong < 0) ? songs.length - 1 : currentSong;
    loadSong();
}

function seekSong() {
    song.currentTime = songSlider.value;
    currentTime.textContent = convertTime(song.currentTime);
}

function adjustVolume() {
    song.volume = volumeSlider.value;
}

function forward() {
    song.playbackRate = song.playbackRate + 0.5

}

function backward() {
    song.playbackRate = song.playbackRate - 0.5;
}

var wage = document.getElementByTagName('body');
wage.addEventListener("keydown", function(e) {
    if (e.keyCode === 32) {
        playOrPauseSong();
    }
});