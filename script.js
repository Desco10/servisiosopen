document.addEventListener("DOMContentLoaded", () => {

  const carousels = document.querySelectorAll(".carousel");
  const cards = document.querySelectorAll(".card");

  /* =========================
     CONTROL INTELIGENTE TOUCH
  ========================== */

  carousels.forEach(carousel => {

    let startX = 0;
    let startY = 0;
    let isDragging = false;
    let isHorizontal = false;

    carousel.addEventListener("touchstart", (e) => {
      startX = e.touches[0].clientX;
      startY = e.touches[0].clientY;
      isDragging = true;
      isHorizontal = false;
    }, { passive: true });

    carousel.addEventListener("touchmove", (e) => {

      if (!isDragging) return;

      const currentX = e.touches[0].clientX;
      const currentY = e.touches[0].clientY;

      const diffX = currentX - startX;
      const diffY = currentY - startY;

      // Detectar intención
      if (!isHorizontal) {
        if (Math.abs(diffX) > Math.abs(diffY) + 5) {
          isHorizontal = true;
        } else if (Math.abs(diffY) > Math.abs(diffX)) {
          isDragging = false;
          return; // dejamos que el body haga scroll vertical
        }
      }

      if (isHorizontal) {
        e.preventDefault();
        carousel.scrollLeft -= diffX;
        startX = currentX;
      }

    }, { passive: false });

    carousel.addEventListener("touchend", () => {
      isDragging = false;
    });

  });


  /* =========================
     EFECTO 3D
  ========================== */

  function updateCards() {
    const center = window.innerWidth / 2;

    cards.forEach(card => {
      const rect = card.getBoundingClientRect();
      const cardCenter = rect.left + rect.width / 2;
      const distance = cardCenter - center;

      const rotate = distance * 0.04;
      const scale = 1 - Math.min(Math.abs(distance) / 1200, 0.25);
      const opacity = 1 - Math.min(Math.abs(distance) / 800, 0.5);

      card.style.transform = `rotateY(${rotate}deg) scale(${scale})`;
      card.style.opacity = opacity;
    });
  }

  carousels.forEach(c => c.addEventListener("scroll", updateCards));
  window.addEventListener("resize", updateCards);
  updateCards();


  /* =========================
     MODAL
  ========================== */

  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".cerrar");

  cards.forEach(card => {
    card.addEventListener("click", () => {
      modal.style.display = "flex";
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });

});
