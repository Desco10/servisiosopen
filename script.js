// script.js
function abrirModal(element) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalVideo = document.getElementById("modal-video");

  modal.style.display = "block";

  if (element.tagName.toLowerCase() === "img") {
    // Mostrar imagen
    modalImg.src = element.src;
    modalImg.style.display = "block";
    modalVideo.style.display = "none";
    modalVideo.pause();
    modalVideo.src = "";
  } else if (element.tagName.toLowerCase() === "video") {
    // Detener video en la card
    element.pause();
    element.currentTime = 0;

    // Mostrar en modal
    modalVideo.src = element.src;
    modalVideo.style.display = "block";
    modalImg.style.display = "none";

    // En móviles: permitir reproducción tras toque directo
    modalVideo.muted = false;
    modalVideo.play().catch(() => {
      // Si no lo deja reproducir automáticamente, mostrar controles
      modalVideo.controls = true;
    });
  }
}

function cerrarModal() {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalVideo = document.getElementById("modal-video");

  modal.style.display = "none";

  modalImg.src = "";
  modalVideo.pause();
  modalVideo.src = "";
}

// Cerrar modal clicando fuera del contenido
window.addEventListener("click", function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    cerrarModal();
  }
});

// 🔹 Para que funcione también con "touch" en móviles
window.addEventListener("touchstart", function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    cerrarModal();
  }
});


  const btn = document.getElementById('toggleServicios');
  const contenido = document.getElementById('contenidoServicios');
  let visible = false;

  btn.addEventListener('click', () => {
    visible = !visible;
    contenido.style.display = visible ? 'block' : 'none';
    btn.textContent = visible ? 'Ocultar Servicios' : 'Ver Servicios';
  });

document.getElementById("toggleServicios").addEventListener("click", function() {
  const texto = document.getElementById("serviciosTexto");
  texto.style.display = (texto.style.display === "none" || texto.style.display === "") 
    ? "block" 
    : "none";
});
