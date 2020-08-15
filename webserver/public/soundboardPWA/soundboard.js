function playAudio(audioId) {
  if (audioId) {
    if (document.getElementById("loop-box").checked) {
      document.getElementById(audioId).setAttribute("loop", "");
    }

    document.getElementById(audioId).play();
  } else {
    console.error("Error: need to specify an audio Id to play audio");
  }
}

function playAllAudio() {
  let audioTracks = document.getElementsByTagName("audio");
  for (let track of audioTracks) {
    track.play();
  }
}

function playRandomClips() {
  let allAudioClips = document.getElementsByTagName("audio");
  let alreadyPlayed = new Set();

  while (alreadyPlayed.size < 5) {
    // Pick a random number from 0 to allAudioClips.length (11 right now)
    let rand = Math.floor(Math.random() * allAudioClips.length);
   
    if (!alreadyPlayed.has(rand)) {
      window.setTimeout(() => {
        //console.log("Playing clip: ", allAudioClips[rand]);
        allAudioClips[rand].play();
      }, 350 * alreadyPlayed.size);
      alreadyPlayed.add(rand);
    }
  }
}

/**
 * Runs when the checkbox is clicked from on to off:
 */
function endLoop() {
  if (!document.getElementById("loop-box").checked) {
    let audioTracks = document.getElementsByTagName("audio"); 
    for (track of audioTracks) {
      if (track.hasAttribute("loop")) {
        console.log("ending audio for: ", track.id);
        track.removeAttribute("loop");
      }
    }
  }
}

document.getElementById("loop-box").addEventListener("click", endLoop);
