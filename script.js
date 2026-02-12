/* MODAL */
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
  } else {
    element.pause();
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
  modalVideo.src = "";
  modalImg.src = "";
  document.body.style.overflow = "auto";
}

/* BOTÓN SERVICIOS */
const btn = document.getElementById('toggleServicios');
const contenido = document.getElementById('contenidoServicios');
let visible = false;

btn.addEventListener('click', () => {
  visible = !visible;
  contenido.style.display = visible ? 'block' : 'none';
  btn.textContent = visible ? 'Ocultar Servicios' : 'Ver Servicios';
});

/* CARRUSEL */
document.querySelectorAll('.carousel').forEach(carousel => {

  let isDown = false;
  let startX = 0;
  let scrollStart = 0;

  carousel.addEventListener("mousedown", e => {
    isDown = true;
    startX = e.pageX;
    scrollStart = carousel.scrollLeft;
  });

  carousel.addEventListener("mouseup", () => isDown = false);
  carousel.addEventListener("mouseleave", () => isDown = false);

  carousel.addEventListener("mousemove", e => {
    if (!isDown) return;
    const dx = e.pageX - startX;
    carousel.scrollLeft = scrollStart - dx;
  });

});
