(function () {
  const FLOWER_ID = "bloomFlower";
  const OVERLAY_ID = "bloomOverlay";

  if (window.top !== window || document.getElementById(FLOWER_ID)) {
    return;
  }

  const flower = document.createElement("img");
  flower.id = FLOWER_ID;
  flower.src = chrome.runtime.getURL("flower.gif");
  flower.alt = "Open bloom video";

  const closeOverlay = (overlay, video) => {
    if (!overlay || overlay.classList.contains("is-leaving")) {
      return;
    }

    overlay.classList.add("is-leaving");
    if (video) {
      video.pause();
    }

    if (overlay._escapeHandler) {
      document.removeEventListener("keydown", overlay._escapeHandler);
    }

    window.setTimeout(() => {
      overlay.remove();
    }, 900);
  };

  const openOverlay = () => {
    const existing = document.getElementById(OVERLAY_ID);
    if (existing) {
      return;
    }

    const overlay = document.createElement("div");
    overlay.id = OVERLAY_ID;
    overlay.innerHTML = `
      <div class="bloomOverlay__backdrop"></div>
      <div class="bloomOverlay__glow"></div>
      <button class="bloomOverlay__close" type="button" aria-label="Close bloom moment">&times;</button>
      <video class="bloomOverlay__video" playsinline preload="auto">
        <source src="${chrome.runtime.getURL("bloom.mp4")}" type="video/mp4">
      </video>
    `;

    document.body.appendChild(overlay);

    const video = overlay.querySelector(".bloomOverlay__video");
    const closeButton = overlay.querySelector(".bloomOverlay__close");

    closeButton.addEventListener("click", () => closeOverlay(overlay, video));

    overlay.addEventListener("click", (event) => {
      if (event.target === overlay || event.target.classList.contains("bloomOverlay__backdrop")) {
        closeOverlay(overlay, video);
      }
    });

    const escapeHandler = (event) => {
      if (event.key === "Escape") {
        closeOverlay(overlay, video);
      }
    };

    overlay._escapeHandler = escapeHandler;
    document.addEventListener("keydown", escapeHandler);

    video.addEventListener("ended", () => {
      overlay.classList.add("is-finished");
      window.setTimeout(() => closeOverlay(overlay, video), 450);
    });

    video.addEventListener("error", () => {
      closeOverlay(overlay, video);
    });

    video.muted = false;
    video.volume = 1;
    const playPromise = video.play();

    if (playPromise && typeof playPromise.catch === "function") {
      playPromise.catch(() => {
        // If a page still blocks audio, keep controls available so the user can start playback.
        video.controls = true;
      });
    }
  };

  flower.addEventListener("click", openOverlay);
  document.body.appendChild(flower);
})();
