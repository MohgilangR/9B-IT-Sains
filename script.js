(function () {
  const cards = document.querySelectorAll(".card");
  const overlay = document.getElementById("overlay");
  const overlayContent = overlay.querySelector(".overlay-content");
  const overlayImg = document.getElementById("overlay-img");
  const overlayTitle = document.getElementById("overlay-title");
  const overlayDesc = document.getElementById("overlay-desc");
  function openOverlay(imgSrc, title, desc, imgAlt) {
    overlayImg.src = imgSrc;
    overlayImg.alt = imgAlt || title || "Photo";
    overlayTitle.textContent = title || "";
    overlayDesc.textContent = desc || "";
    requestAnimationFrame(() => {
      overlay.classList.add("active");
      overlay.setAttribute("aria-hidden", "false");
      document.documentElement.classList.add("modal-open");
      document.body.classList.add("modal-open");
    });
  }
  function closeOverlay() {
    overlay.classList.remove("active");
    overlay.setAttribute("aria-hidden", "true");
    document.documentElement.classList.remove("modal-open");
    document.body.classList.remove("modal-open");
  }
  overlay.addEventListener("transitionend", (e) => {
    if (e.propertyName === "opacity" && !overlay.classList.contains("active")) {
      overlayImg.src = "";
    }
  });
  cards.forEach((card) => {
    card.addEventListener("click", (e) => {
      if (e.target.closest("a")) return;
      const img = card.querySelector("img");
      const title = card.querySelector("h3")
        ? card.querySelector("h3").innerText
        : "";
      const desc = card.querySelector("p")
        ? card.querySelector("p").innerText
        : "";
      if (img && img.src) {
        openOverlay(img.src, title, desc, img.alt);
      }
    });
  });
  overlay.addEventListener("click", (e) => {
    if (e.target === overlay) closeOverlay();
  });
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && overlay.classList.contains("active"))
      closeOverlay();
  });
})();
