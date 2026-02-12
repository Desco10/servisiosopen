/* ===============================
   MODAL UNIFICADO
================================ */
function abrirModal(element) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalVideo = document.getElementById("modal-video");

  modal.style.display = "flex";
  document.body.style.overflow = "hidden";

  if (element.tagName.toLowerCase() === "img") {
    modalImg.src = element.src;
    modalImg.style.display = "block";
    modalVideo.style.display = "none";
    modalVideo.pause();
    modalVideo.src = "";
  } else if (element.tagName.toLowerCase() === "video") {
    element.pause();
    element.currentTime = 0;

    modalVideo.src = element.src;
    modalVideo.style.display = "block";
    modalImg.style.display = "none";
    modalVideo.muted = false;
    modalVideo.play().catch(() => modalVideo.controls = true);
  }
}

function cerrarModal() {
  const modal = document.getElementById("modal");
  const modalVideo = document.getElementById("modal-video");
  const modalImg = document.getElementById("modal-img");

  modal.style.display = "none";
  modalVideo.pause();
  modalVideo.currentTime = 0;
  modalVideo.src = "";
  modalImg.src = "";
  document.body.style.overflow = "auto";
}

window.addEventListener("click", e => {
  const modal = document.getElementById("modal");
  if (e.target === modal) cerrarModal();
});

window.addEventListener("touchstart", e => {
  const modal = document.getElementById("modal");
  if (e.target === modal) cerrarModal();
}, { passive: true });

/* ===============================
   BOTÓN SERVICIOS
================================ */
const btn = document.getElementById('toggleServicios');
const contenido = document.getElementById('contenidoServicios');
const texto = document.getElementById("serviciosTexto");
let visible = false;

btn.addEventListener('click', () => {
  visible = !visible;
  contenido.style.display = visible ? 'block' : 'none';
  texto.style.display = visible ? 'block' : 'none';
  btn.textContent = visible ? 'Ocultar Servicios' : 'Ver Servicios';
});

/* ===============================
   CARRUSEL SUAVE TOUCH-ONLY
   sin bloquear scroll global
================================ */
document.querySelectorAll('.carousel').forEach(carousel => {

  let isDown = false;
  let startX = 0;
  let scrollStart = 0;

  const cards = carousel.querySelectorAll('.card');

  function updateCenter(){
    const center = carousel.scrollLeft + carousel.offsetWidth / 2;
    cards.forEach(card=>{
      const cardCenter = card.offsetLeft + card.offsetWidth / 2;
      const dist = Math.abs(center - cardCenter);

      card.classList.remove('is-center','is-near','is-far');

      if(dist < 150) card.classList.add('is-center');
      else if(dist < 300) card.classList.add('is-near');
      else card.classList.add('is-far');
    });
  }

  carousel.addEventListener('scroll', updateCenter, { passive:true });
  window.addEventListener('resize', updateCenter);
  setTimeout(updateCenter, 300);

  /* TOUCH */
  carousel.addEventListener("touchstart", e => {
    isDown = true;
    startX = e.touches[0].pageX;
    scrollStart = carousel.scrollLeft;
  }, { passive: true });

  carousel.addEventListener("touchend", () => isDown = false);
  carousel.addEventListener("touchcancel", () => isDown = false);

  carousel.addEventListener("touchmove", e => {
    if (!isDown) return;
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.1;
    carousel.scrollLeft = scrollStart - walk;
  }, { passive: true });

  /* DESKTOP */
  carousel.addEventListener("mousedown", e => {
    isDown = true;
    startX = e.pageX;
    scrollStart = carousel.scrollLeft;
  });

  carousel.addEventListener("mouseup", () => isDown = false);
  carousel.addEventListener("mouseleave", () => isDown = false);

  carousel.addEventListener("mousemove", e => {
    if (!isDown) return;
    const x = e.pageX;
    const walk = (x - startX) * 1.1;
    carousel.scrollLeft = scrollStart - walk;
  });
});
