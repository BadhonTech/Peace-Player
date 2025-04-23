const player = document.getElementById("player");
const faplay = document.getElementById("faplay");
const fapaused = document.getElementById("fapaused");
const progress = document.getElementById("progress");
const title = document.querySelector(".title");
const artist = document.querySelector(".artist");
const albumArt = document.querySelector(".ar");
const video = document.getElementById("background-video");
const loader = document.getElementById("loader");
const container = document.querySelector(".container");

const videoSources = ["video1.mp4", "video2.mp4", "video3.mp4", "video4.mp4"];
let videoIndex = 0;

video.addEventListener("ended", () => {
  videoIndex = (videoIndex + 1) % videoSources.length;
  video.src = videoSources[videoIndex];
  video.load();
  video.play();
});

const playlist = [
  {
    title: "Line Without a Hook",
    artist: "Ricky Montgomery",
    src: "songs/Line Without a Hook - Ricky Montgomery.mp3",
    cover: "songs/Line Without a Hook - Ricky Montgomery.jpg",
  },
  {
    title: "blue",
    artist: "yung kai",
    src: "songs/blue - yung kai.mp3",
    cover: "songs/blue - yung kai.jpg",
  },
  {
    title: "Your Eyes",
    artist: "Barney,Taqiya",
    src: "songs/Your Eyes - Barney Sku_ Taqiya Zaman.mp3",
    cover: "songs/Your Eyes - Barney Sku_ Taqiya Zaman.jpg",
  },
  {
    title: "I Wanna Be Yours",
    artist: "Arctic Monkeys",
    src: "songs/I Wanna Be Yours - Arctic Monkeys.mp3",
    cover: "songs/I Wanna Be Yours - Arctic Monkeys.jpg",
  },
];

let currentSong = 0;

window.addEventListener("load", () => {
  loadSong(currentSong);
  loader.style.display = "none";
  container.classList.remove("hidden");
});

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

function nextSong() {
  currentSong = (currentSong + 1) % playlist.length;
  loadSong(currentSong);
  player.play();
  faplay.style.display = "none";
  fapaused.style.display = "flex";
}

function prevSong() {
  currentSong = (currentSong - 1 + playlist.length) % playlist.length;
  loadSong(currentSong);
  player.play();
  faplay.style.display = "none";
  fapaused.style.display = "flex";
}

player.addEventListener("loadedmetadata", () => {
  progress.max = player.duration;
});

player.addEventListener("timeupdate", () => {
  progress.value = player.currentTime;
});

progress.addEventListener("input", () => {
  player.currentTime = progress.value;
});

player.addEventListener("ended", nextSong);

document.querySelector(".fa-forward").onclick = nextSong;
document.querySelector(".fa-backward").onclick = prevSong;