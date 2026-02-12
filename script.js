document.addEventListener("DOMContentLoaded", () => {
  const carousel = document.querySelector(".carousel");
  const cards = document.querySelectorAll(".card");

  /* =========================
     DRAG HORIZONTAL INTELIGENTE
  ========================== */

  let isDown = false;
  let startX;
  let startY;
  let scrollLeft;
  let isHorizontal = false;

  // Mouse
  carousel.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("mouseleave", () => {
    isDown = false;
  });

  carousel.addEventListener("mouseup", () => {
    isDown = false;
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollLeft - walk;
  });

  // Touch
  carousel.addEventListener("touchstart", (e) => {
    startX = e.touches[0].pageX;
    startY = e.touches[0].pageY;
    scrollLeft = carousel.scrollLeft;
    isHorizontal = false;
  }, { passive: true });

  carousel.addEventListener("touchmove", (e) => {
    const x = e.touches[0].pageX;
    const y = e.touches[0].pageY;

    const diffX = Math.abs(x - startX);
    const diffY = Math.abs(y - startY);

    // Detectamos dirección dominante
    if (!isHorizontal) {
      if (diffX > diffY) {
        isHorizontal = true;
      } else {
        return; // dejamos scroll vertical normal
      }
    }

    if (isHorizontal) {
      e.preventDefault();
      const walk = (x - startX) * 1.5;
      carousel.scrollLeft = scrollLeft - walk;
    }

  }, { passive: false });


  /* =========================
     EFECTO 3D AL SCROLLEAR
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

  carousel.addEventListener("scroll", updateCards);
  window.addEventListener("resize", updateCards);
  updateCards();


  /* =========================
     MODAL
  ========================== */

  const modal = document.getElementById("modal");
  const closeBtn = document.querySelector(".close");

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
