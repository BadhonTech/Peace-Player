const player = document.getElementById("player");
const faplay = document.getElementById("faplay");
const fapaused = document.getElementById("fapaused");
const progress = document.getElementById("progress");
const title = document.querySelector(".title");
const artist = document.querySelector(".artist");
const albumArt = document.querySelector(".ar");

const video = document.getElementById('background-video');
const sources = ['video1.mp4', 'video2.mp4', 'video3.mp4', 'video4.mp4'];
let current = 0;

video.addEventListener('ended', () => {
  current = (current + 1) % sources.length;
  video.src = sources[current];
  video.load();
  video.play();
});


// Define your playlist
const playlist = [
  {
    title: "Line Without a Hook",
    artist: "Ricky Montgomery",
    src: "songs/Line Without a Hook - Ricky Montgomery.mp3",
    cover: "songs/Line Without a Hook - Ricky Montgomery.jpg"
  },
  {
    title: "blue",
    artist: "yung kai",
    src: "songs/blue - yung kai.mp3",
    cover: "songs/blue - yung kai.jpg"
  },
  {
    title: "Your Eyes",
    artist: "Barney,Taqiya",
    src: "songs/Your Eyes - Barney Sku_ Taqiya Zaman.mp3",
    cover: "songs/Your Eyes - Barney Sku_ Taqiya Zaman.jpg"
  },
  {
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    src: "songs/I Wanna Be Yours - Arctic Monkeys.mp3",
    cover: "songs/I Wanna Be Yours - Arctic Monkeys.jpg"
  }
];

let currentSong = 0;

// Load a song
function loadSong(index) {
  const song = playlist[index];
  player.src = song.src;
  title.textContent = song.title;
  artist.textContent = song.artist;
  albumArt.src = song.cover;
  progress.value = 0;
  faplay.style.display = "flex";
  fapaused.style.display = "none";
}

// Play/Pause toggle
function playpause() {
  if (player.paused) {
    player.play().then(() => {
      faplay.style.display = "none";
      fapaused.style.display = "flex";
    });
  } else {
    player.pause();
    faplay.style.display = "flex";
    fapaused.style.display = "none";
  }
}

// Next song
function nextSong() {
  currentSong = (currentSong + 1) % playlist.length;
  loadSong(currentSong);
  player.play();
  faplay.style.display = "none";
  fapaused.style.display = "flex";
}

// Previous song
function prevSong() {
  currentSong = (currentSong - 1 + playlist.length) % playlist.length;
  loadSong(currentSong);
  player.play();
  faplay.style.display = "none";
  fapaused.style.display = "flex";
}

// Update progress
player.addEventListener('loadedmetadata', () => {
  progress.max = player.duration;
});

player.addEventListener('timeupdate', () => {
  progress.value = player.currentTime;
});

progress.addEventListener('input', () => {
  player.currentTime = progress.value;
});

// Autoplay next song
player.addEventListener('ended', nextSong);

// Initial load
loadSong(currentSong);

// Assign click events to buttons
document.querySelector('.fa-forward').onclick = nextSong;
document.querySelector('.fa-backward').onclick = prevSong;