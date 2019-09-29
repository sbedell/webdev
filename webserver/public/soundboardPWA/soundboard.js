function playAudio(audioId) {
  if (!audioId) {
    console.error("Error: need to specify an audio Id to play audio");
    return;
  }

  if (document.getElementById("loop-box").checked) {
    document.getElementById(audioId).setAttribute("loop", "");
  }

  document.getElementById(audioId).play();
}

function playAllAudio() {
  let audioTracks = document.getElementsByTagName("audio");
  for (track of audioTracks) {
    document.getElementById(track.id).play();
  }
}

// Maybe make a function that plays like 5 random clips?
// function playRandomClips() {}

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