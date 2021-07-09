isPlaying = false;
songs = [
  {
    name: "Music 01",
    title: "Main hu sath tere",
    artist: "Shivangi Bhayana",
    image: "Image 01",
  },
  {
    name: "Music 02",
    title: "O mere sajan",
    artist: "Stebin Ben",
    image: "Image 02",
  },
  {
    name: "Music 03",
    title: "Rabb Wangu",
    artist: "Jass Manek",
    image: "Image 03",
  },
];
const play = document.getElementById("play");
const next = document.getElementById("next");
const prev = document.getElementById("prev");
const artist = document.getElementById("artist");
const title = document.getElementById("title");
const img = document.querySelector("img");
const music = document.querySelector("audio");
let progress = document.getElementById("progress");
let total_currentTime = document.getElementById("currentTime");
let total_duration = document.getElementById("duration");
const progressbar = document.getElementById("progressbar");

const playMusic = () => {
  this.isPlaying = true;
  music.play();
  play.classList.replace("fa-play","fa-pause");
  img.classList.add("anime");
};
const pauseMusic = () => {
  this.isPlaying = false;
  music.pause();
  play.classList.replace("fa-pause","fa-play")
  img.classList.remove("anime");
};
play.addEventListener("click", () => {
  this.isPlaying ? pauseMusic() : playMusic();
});
const loadSong = (song) => {
  title.textContent = song.title;
  artist.textContent = song.artist;
  music.src = "assets/Music/" + song.name + ".mp3";
  img.src = "assets/Images/" + song.image + ".jpg";
};
let songIndex = 0;

const nextSong = () => {
  songIndex = (songIndex + 1) % this.songs.length;
  loadSong(this.songs[songIndex]);
  playMusic();
};
const prevSong = () => {
  songIndex = (songIndex - 1 + this.songs.length) % this.songs.length;
  loadSong(this.songs[songIndex]);
  playMusic();
};

music.addEventListener("timeupdate",(event)=>{

    const { currentTime, duration } = event.srcElement;

    let progress_time = (currentTime / duration) * 100;

    progress.style.width = `${progress_time}%`;

    let min_duration = Math.floor(duration / 60);
    let sec_duration = Math.floor(duration % 60);

    let final_duration = `${min_duration}:${sec_duration}`;

    if(duration){
       total_duration.textContent = `${final_duration}`;
    }

    let min_currentTime = Math.floor(currentTime / 60);
    let sec_currentTime = Math.floor(currentTime % 60);

    if(sec_currentTime<10){
      sec_currentTime = `0${sec_currentTime}`
    }

    let final_currentTime = `${min_currentTime}:${sec_currentTime}`;
    total_currentTime.textContent = `${final_currentTime}`;
    
   
});


progressbar.addEventListener("click",(event)=>{
   let width = progressbar.clientWidth
   let duration = music.duration;
   let move_progress = (event.offsetX / width)*duration;
   music.currentTime = move_progress;
})

music.addEventListener("ended",nextSong);
next.addEventListener("click", nextSong);
prev.addEventListener("click", prevSong);

document.addEventListener("keyup", (event) => {
  if (event.code === "Space") {
    this.isPlaying ? pauseMusic() : playMusic();
  } else if (event.code === "ArrowRight") {
    nextSong();
  } else if (event.code === "ArrowLeft") {
    prevSong();
  }
});
