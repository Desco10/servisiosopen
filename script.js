// script.js

function abrirModal(element) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalVideo = document.getElementById("modal-video");

  // Mostrar modal
  modal.style.display = "block";

  // Si es imagen
  if (element.tagName.toLowerCase() === "img") {
    modalImg.src = element.src;
    modalImg.style.display = "block";
    modalVideo.style.display = "none";
    modalVideo.pause();
    modalVideo.src = "";
  } 
  // Si es video
  else if (element.tagName.toLowerCase() === "video") {
    // Detener cualquier video que esté en la card
    element.pause();
    element.currentTime = 0;

    modalVideo.src = element.src;
    modalVideo.style.display = "block";
    modalImg.style.display = "none";
    modalVideo.play();
  }
}

function cerrarModal() {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalVideo = document.getElementById("modal-video");

  modal.style.display = "none";

  // Limpiar contenido y detener video
  modalImg.src = "";
  modalVideo.pause();
  modalVideo.src = "";
}

// Cerrar modal haciendo click fuera del contenido
window.onclick = function (event) {
  const modal = document.getElementById("modal");
  if (event.target === modal) {
    cerrarModal();
  }
};
