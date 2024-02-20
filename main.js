document.addEventListener("DOMContentLoaded", function() {
  const audio = document.getElementById("audio");
  const playPauseButton = document.getElementById("play-pause");
  const prevButton = document.getElementById("prev-button");
  const nextButton = document.getElementById("next-button");
  const volumeControl = document.getElementById("volume");
  const trackSlider = document.getElementById("track-slider");
  const time = document.getElementById("time-display");
  const trackNameDisplay = document.getElementById("track-name");
  const albumPhoto = document.getElementById("album-photo");


  let isPlaying = false;
  let currentTrack = 0;
  let audioPosition = 0;


  // Array of Track URLs
  const trackList = [
    "", "", "", ""
  ];
  // Array of Track Names
  const trackNames = [
    "Metamorphosis", "One Chance", "Memory Reboot", "Fainted"
    ]
  // Array of Album Photos
  const albumPhotos = [
    "https://c.saavncdn.com/221/METAMORPHOSIS-English-2021-20220215012012-500x500.jpg",
    
    "https://imgs.search.brave.com/GMGlnYgpAnwErkafiXJfn6jg2A5lCfanJFLTpFrAr-I/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pMS5z/bmRjZG4uY29tL2Fy/dHdvcmtzLXlZRE5S/WmxsZ0lZVU00enot/dHMyYmN3LXQ1MDB4/NTAwLmpwZw",
    
    "https://imgs.search.brave.com/4Lh27E52lZ0KId5v3im9iqX9bFkx21rG_f4JcNcrjwY/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pbmRp/YW1wMy5uZXQvc2l0/ZXVwbG9hZHMvdGh1/bWIvc2Z0MTAvNDgw/MV80LmpwZw",
    
    "https://imgs.search.brave.com/HmDT-D8LU2o1YZZHMUe6u77IaBoXHh8H2B40Soe2p2E/rs:fit:500:0:0/g:ce/aHR0cHM6Ly9pMS5z/bmRjZG4uY29tL2Fy/dHdvcmtzLUFjV1ZX/eWJROUhOVUNycnAt/aldqcWhBLXQ1MDB4/NTAwLmpwZw"
  ];
  // Function to toggle between Play and Pause
  function togglePlayPause() {
    if (!isPlaying) {
      if (audioPosition === 0) {
        // Start from the beginning of the track
        audio.src = trackList[currentTrack];
      }
      audio.load();
      audio.currentTime = audioPosition; // Set the audio position
      audio
        .play()
        .then(() => {
          playPauseButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48v160a16 16 0 0 1-16 16h-40a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h40a16 16 0 0 1 16 16M96 32H56a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h40a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16"/></svg>`;
          albumPhoto.style.animationPlayState = "running";
          isPlaying = true;
          updateTrackName(currentTrack);
        })
        .catch((error) => {
          console.error("Audio Playback Error: " + error.message);
        });
    } else {
      audioPosition = audio.currentTime; // Store the current audio position
      audio.pause();
      playPauseButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24"><path fill="currentColor" d="M21.409 9.353a2.998 2.998 0 0 1 0 5.294L8.597 21.614C6.534 22.737 4 21.277 4 18.968V5.033c0-2.31 2.534-3.769 4.597-2.648z"/></svg>`;
      albumPhoto.style.animationPlayState = "paused";
      isPlaying = false;
    }
  }

  playPauseButton.addEventListener("click", togglePlayPause);


  // Function to play the next track
  nextButton.addEventListener("click", function() {
    if (currentTrack < trackList.length - 1) {
      currentTrack++;
    } else {
      currentTrack = 0;
    }
    playTrack(currentTrack);
  });


  // Function to play the previous track
  prevButton.addEventListener("click", function() {
    if (currentTrack > 0) {
      currentTrack--;
    } else {
      currentTrack = trackList.length - 1;
    }
    playTrack(currentTrack);
  });


  // Function to play a specific track
  function playTrack(trackIndex) {
    audio.src = trackList[trackIndex];
    audio.load();
    audio.play();
    playPauseButton.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 256 256"><path fill="currentColor" d="M216 48v160a16 16 0 0 1-16 16h-40a16 16 0 0 1-16-16V48a16 16 0 0 1 16-16h40a16 16 0 0 1 16 16M96 32H56a16 16 0 0 0-16 16v160a16 16 0 0 0 16 16h40a16 16 0 0 0 16-16V48a16 16 0 0 0-16-16"/></svg>`;
    albumPhoto.style.animationPlayState = "running";
    isPlaying = true;
    updateTrackName(trackIndex); // Updating the track name
  }


  // Function to update the track name
  function updateTrackName(trackIndex) {
    const trackName = trackNames[trackIndex];
    trackNameDisplay.textContent = trackName;
    albumPhoto.src = albumPhotos[trackIndex];
  }


  // Update the audio time displays
  audio.addEventListener("timeupdate", function() {
    const currentTime = formatTime(audio.currentTime);
    const totalDuration = formatTime(audio.duration);
    time.innerHTML = `<span>${currentTime}</span><span>${totalDuration}</span>`
    // Update the track slider as the audio plays
    const position = (audio.currentTime / audio.duration) * 100;
    trackSlider.value = position;
  });


  // Seek to a position when the user interacts with the track slider
  trackSlider.addEventListener("input", function() {
    const newPosition = (trackSlider.value / 100) * audio.duration;
    audio.currentTime = newPosition;
  });


  // Handle track ending and play the next track
  audio.addEventListener("ended", function() {
    if (currentTrack < trackList.length - 1) {
      currentTrack++;
    } else {
      currentTrack = 0;
    }
    playTrack(currentTrack);
  });

  function formatTime(seconds) {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = Math.floor(seconds % 60);
    return `${minutes}:${remainingSeconds < 10 ? "0" : ""}${remainingSeconds}`;
  }
});