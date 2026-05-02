// const clickSound = new Audio("../sources/tugu.ogg");
// clickSound.volume = 1;
// document.querySelectorAll("a").forEach(a => {
//     a.addEventListener("click", () => {
//         clickSound.play();
//     });
// });

// play = document.querySelectorAll("#play")
// play.addEventListener('click', (event)=>{
// 	event.preventDefault()
// 	song.play()
// })

// const song = new Audio("../sources/output.mp3")
// song.volume = 0.8

// const playButton = document.getElementById("play");
// playButton.addEventListener('click', (event) => {
// 	console.log("aye")
//     event.preventDefault(); // optional for button
//     song.play();
// });

// const pauseButton = document.getElementById("pause");
// pauseButton.addEventListener('click', () => {
//     song.pause();
// });

// List of songs in your ../sources/ folder
const songs = [
    "../sources/little_soilder_boy_avatar_iroh.mp3",
    "../sources/canon_rock_jerryC.mp3",
];

let song = null;
const nowPlaying = document.getElementById("now_playing");

function getRandomSong() {
    const index = Math.floor(Math.random() * songs.length);
	console.log("hellooo")
	console.log(index)
    return songs[index];
}

function getSongName(path) {
    return path.split("/").pop().replace(".mp3", "");
}

function loadRandomSong() {
    const selected = getRandomSong();

    song = new Audio(selected);
    song.volume = 0.8;

    nowPlaying.textContent =
        "Now Playing: " + getSongName(selected);
}


document.getElementById("play").addEventListener("click", (event) => {
    event.preventDefault();

    if (!song || song.ended) {
        loadRandomSong();
    }

    song.play();
});

// PAUSE
document.getElementById("pause").addEventListener("click", () => {
    song.pause();
});
