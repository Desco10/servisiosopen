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


function abrirModal(el){
  const modal=document.getElementById("modal");
  const img=document.getElementById("modal-img");
  const vid=document.getElementById("modal-video");

  modal.style.display="flex";
  document.body.style.overflow="hidden";

  if(el.tagName==="IMG"){
    img.src=el.src;img.style.display="block";
    vid.style.display="none";vid.pause();
  }else{
    img.style.display="none";
    vid.src=el.src;vid.style.display="block";vid.play();
  }
}
function cerrarModal(){
  modal.style.display="none";
  document.body.style.overflow="auto";
  modalVideo.pause();
}


function cerrarModal(){
  const modal = document.getElementById("modal");
  const modalVideo = document.getElementById("modal-video");
  modal.style.display="none";
  modalVideo.pause();
  modalVideo.currentTime = 0;
  modalVideo.src = "";
  document.body.style.overflow="auto";
}



/* ===============================
   CARRUSEL TOUCH-ONLY PREMIUM
   sin conflicto ni titileo
================================ */

document.querySelectorAll('.carousel').forEach(carousel => {
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


  // TOUCH
  carousel.addEventListener("touchstart", e => {
    isDown = true;
    startX = e.touches[0].pageX;
    scrollLeft = carousel.scrollLeft;
  }, { passive: true });

  carousel.addEventListener("touchend", () => isDown = false);
  carousel.addEventListener("touchcancel", () => isDown = false);

  carousel.addEventListener("touchmove", e => {
    if (!isDown) return;
    const x = e.touches[0].pageX;
    const walk = (x - startX) * 1.2;
    carousel.scrollLeft = scrollLeft - walk;
  }, { passive: true });

  // DESKTOP
  carousel.addEventListener("mousedown", e => {
    isDown = true;
    startX = e.pageX;
    scrollLeft = carousel.scrollLeft;
  });

  carousel.addEventListener("mouseup", () => isDown = false);
  carousel.addEventListener("mouseleave", () => isDown = false);

  carousel.addEventListener("mousemove", e => {
    if (!isDown) return;
    const x = e.pageX;
    const walk = (x - startX) * 1.1;
    carousel.scrollLeft = scrollLeft - walk;
  });
});
