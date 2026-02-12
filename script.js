document.addEventListener("DOMContentLoaded", () => {

  const carousel = document.querySelector(".carousel");
  const cards = document.querySelectorAll(".card");

  /* =========================
     DRAG SOLO PARA MOUSE
  ========================== */

  let isDown = false;
  let startX;
  let scrollLeft;

  carousel.addEventListener("mousedown", (e) => {
    isDown = true;
    startX = e.pageX - carousel.offsetLeft;
    scrollLeft = carousel.scrollLeft;
    carousel.style.cursor = "grabbing";
  });

  carousel.addEventListener("mouseleave", () => {
    isDown = false;
    carousel.style.cursor = "grab";
  });

  carousel.addEventListener("mouseup", () => {
    isDown = false;
    carousel.style.cursor = "grab";
  });

  carousel.addEventListener("mousemove", (e) => {
    if (!isDown) return;
    e.preventDefault();
    const x = e.pageX - carousel.offsetLeft;
    const walk = (x - startX) * 1.5;
    carousel.scrollLeft = scrollLeft - walk;
  });

  /* =========================
     EFECTO 3D AL SCROLL
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
