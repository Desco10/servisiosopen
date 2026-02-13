document.addEventListener("DOMContentLoaded", () => {

  /* =====================================================
     CARRUSEL 3D PREMIUM (UNIFICADO Y OPTIMIZADO)
  ===================================================== */

  const carousels = document.querySelectorAll(".carousel");

  carousels.forEach(carousel => {

    const cards = carousel.querySelectorAll(".card");
    if (!cards.length) return;

    function updateCarousel() {

      const rect = carousel.getBoundingClientRect();
      const center = rect.left + rect.width / 2;

      cards.forEach(card => {

        const cardRect = card.getBoundingClientRect();
        const cardCenter = cardRect.left + cardRect.width / 2;
        const distance = cardCenter - center;

        card.classList.remove("is-active", "is-left", "is-right");

        if (Math.abs(distance) < cardRect.width / 2) {
          card.classList.add("is-active");
        } else if (distance < 0) {
          card.classList.add("is-left");
        } else {
          card.classList.add("is-right");
        }

      });
    }

    let ticking = false;

    function requestUpdate() {
      if (!ticking) {
        requestAnimationFrame(() => {
          updateCarousel();
          ticking = false;
        });
        ticking = true;
      }
    }

    updateCarousel();
    carousel.addEventListener("scroll", requestUpdate);
    window.addEventListener("resize", requestUpdate);

  });


  /* =====================================================
     MODAL PREMIUM
  ===================================================== */

  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalVideo = document.getElementById("modal-video");
  const closeBtn = document.querySelector(".cerrar");

  function openModal(element) {

    if (!modal) return;

    // Pausar todos los videos del carrusel
    document.querySelectorAll(".card video").forEach(v => v.pause());

    modal.classList.add("activo");
    modal.style.display = "flex";
    document.body.style.overflow = "hidden";

    modalImg.style.display = "none";
    modalVideo.style.display = "none";

    if (element.tagName === "IMG") {
      modalImg.src = element.src;
      modalImg.style.display = "block";
    }

    if (element.tagName === "VIDEO") {
      modalVideo.src = element.currentSrc || element.src;
      modalVideo.currentTime = 0;
      modalVideo.style.display = "block";
      modalVideo.play();
    }

  }

  function closeModal() {

    if (!modal) return;

    modalVideo.pause();
    modalVideo.currentTime = 0;
    modalVideo.removeAttribute("src");
    modalVideo.load();

    modalImg.removeAttribute("src");

    modal.classList.remove("activo");
    modal.style.display = "none";
    document.body.style.overflow = "auto";

  }

  // Delegación de eventos para abrir modal
  document.addEventListener("click", (e) => {

    const media = e.target.closest(".card-media img, .card-media video");
    if (media) {
      openModal(media);
    }

  });

  // Cerrar con botón
  if (closeBtn) {
    closeBtn.addEventListener("click", closeModal);
  }

  // Cerrar clic fuera
  if (modal) {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal();
      }
    });
  }

  // Cerrar con ESC
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && modal.classList.contains("activo")) {
      closeModal();
    }
  });


  /* =====================================================
     SERVICIOS PREMIUM
  ===================================================== */

  const btn = document.getElementById("toggleServicios");
  const contenido = document.getElementById("contenidoServicios");

  if (btn && contenido) {

    let abierto = false;
    let inactivityTimer;
    const tiempoInactividad = 10000;

    function abrir() {
      contenido.classList.add("activo");
      btn.classList.add("activo");
      btn.textContent = "Ocultar Servicios";
      btn.setAttribute("aria-expanded", "true");
      abierto = true;
      reiniciarInactividad();
    }

    function cerrar() {
      contenido.classList.remove("activo");
      btn.classList.remove("activo");
      btn.textContent = "Ver Servicios";
      btn.setAttribute("aria-expanded", "false");
      abierto = false;
    }

    function toggle() {
      abierto ? cerrar() : abrir();
    }

    function reiniciarInactividad() {
      clearTimeout(inactivityTimer);
      inactivityTimer = setTimeout(() => {
        if (abierto) cerrar();
      }, tiempoInactividad);
    }

    btn.addEventListener("click", toggle);

    window.addEventListener("scroll", () => {
      if (!abierto) return;

      const scrollActual = window.scrollY;
      const alturaTotal = document.body.scrollHeight - window.innerHeight;

      if (scrollActual > alturaTotal * 0.65) {
        cerrar();
      }

      reiniciarInactividad();
    });

    ["mousemove", "keydown", "touchstart"].forEach(evt => {
      window.addEventListener(evt, reiniciarInactividad);
    });

  }


  /* =====================================================
     NAVEGACIÓN SUAVE
  ===================================================== */

  document.querySelectorAll("nav a").forEach(link => {

    link.addEventListener("click", function (e) {

      const target = document.querySelector(this.getAttribute("href"));
      if (!target) return;

      e.preventDefault();

      target.scrollIntoView({
        behavior: "smooth"
      });

    });

  });

});
