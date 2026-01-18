document.querySelectorAll(".video-wrapper").forEach((wrap) => {
  const video = wrap.querySelector("video");
  const playBtn = wrap.querySelector(".play-btn");
  const fsBtn = wrap.querySelector(".fs-btn");

  if (!video || !playBtn || !fsBtn) return;

  function setUI() {
    if (!video.paused && !video.ended) {
      wrap.classList.add("is-playing");
      playBtn.textContent = "❚❚";
    } else {
      wrap.classList.remove("is-playing");
      playBtn.textContent = "▶";
    }
  }

  async function togglePlay() {
    if (video.paused || video.ended) {
      try {
        await video.play();
      } catch (e) {
        console.warn("Play blocked:", e);
      }
    } else {
      video.pause();
    }
    setUI();
  }

  // Playbutton toggelt
  playBtn.addEventListener("click", (e) => {
    e.stopPropagation();
    togglePlay();
  });

  // Klick aufs Video toggelt
  video.addEventListener("click", () => {
    togglePlay();
  });

  // Fullscreen pro Wrapper
  fsBtn.addEventListener("click", async (e) => {
    e.stopPropagation();
    try {
      if (document.fullscreenElement) {
        await document.exitFullscreen();
      } else {
        await wrap.requestFullscreen();
      }
    } catch (err) {
      console.warn("Fullscreen failed:", err);
    }
  });

  // Sync
  video.addEventListener("play", setUI);
  video.addEventListener("pause", setUI);
  video.addEventListener("ended", setUI);

  setUI();
});
