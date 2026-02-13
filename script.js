document.addEventListener("DOMContentLoaded", () => {

  const carousels = document.querySelectorAll(".carousel");

  function updateCards() {
    carousels.forEach(carousel => {

      const center = window.innerWidth / 2;

      carousel.querySelectorAll(".card").forEach(card => {
        const rect = card.getBoundingClientRect();
        const cardCenter = rect.left + rect.width / 2;
        const distance = cardCenter - center;

        card.classList.remove("is-center","is-near","is-far");

        if (Math.abs(distance) < 120) {
          card.classList.add("is-center");
        } else if (Math.abs(distance) < 350) {
          card.classList.add("is-near");
        } else {
          card.classList.add("is-far");
        }
      });

    });
  }

  carousels.forEach(carousel => {
    carousel.addEventListener("scroll", updateCards);
  });

  window.addEventListener("resize", updateCards);
  updateCards();

});


//carrucel premiun 

document.querySelectorAll('.carousel').forEach(carousel => {

  const cards = carousel.querySelectorAll('.card');

  function update(){
    const rect = carousel.getBoundingClientRect();
    const center = rect.left + rect.width / 2;

    cards.forEach(card => {

      const cardRect = card.getBoundingClientRect();
      const cardCenter = cardRect.left + cardRect.width / 2;
      const distance = cardCenter - center;

      card.classList.remove('is-active','is-left','is-right');

      if(Math.abs(distance) < cardRect.width / 2){
        card.classList.add('is-active');
      } else if(distance < 0){
        card.classList.add('is-left');
      } else {
        card.classList.add('is-right');
      }

    });
  }

  update();

  carousel.addEventListener('scroll', () => {
    requestAnimationFrame(update);
  });

  window.addEventListener('resize', update);

});



 
//servicios premiun

document.addEventListener("DOMContentLoaded", function(){

  const btn = document.getElementById("toggleServicios");
  const contenido = document.getElementById("contenidoServicios");

  let abierto = false;
  let inactivityTimer;
  const tiempoInactividad = 10000;

  function abrir(){
    contenido.classList.add("activo");
    btn.classList.add("activo");
    btn.textContent = "Ocultar Servicios";
    abierto = true;
    reiniciarInactividad();
  }

  function cerrar(){
    contenido.classList.remove("activo");
    btn.classList.remove("activo");
    btn.textContent = "Ver Servicios";
    abierto = false;
  }

  function toggle(){
    abierto ? cerrar() : abrir();
  }

  function reiniciarInactividad(){
    clearTimeout(inactivityTimer);
    inactivityTimer = setTimeout(() => {
      if(abierto) cerrar();
    }, tiempoInactividad);
  }

  btn.addEventListener("click", toggle);

  window.addEventListener("scroll", function(){
    if(!abierto) return;

    const scrollActual = window.scrollY;
    const alturaTotal = document.body.scrollHeight - window.innerHeight;

    if(scrollActual > alturaTotal * 0.65){
      cerrar();
    }

    reiniciarInactividad();
  });

  window.addEventListener("mousemove", reiniciarInactividad);
  window.addEventListener("keydown", reiniciarInactividad);
  window.addEventListener("touchstart", reiniciarInactividad);

});


//modal
function abrirModal(elemento) {
  const modal = document.getElementById("modal");
  const modalImg = document.getElementById("modal-img");
  const modalVideo = document.getElementById("modal-video");

  // 🔥 Pausar TODOS los videos del carrusel
  document.querySelectorAll(".card video").forEach(v => {
    v.pause();
  });

  // Reset visual
  modalImg.style.display = "none";
  modalVideo.style.display = "none";

  modal.style.display = "flex";
  modal.classList.add("activo");

  if (elemento.tagName === "IMG") {
    modalImg.src = elemento.src;
    modalImg.style.display = "block";
  }

  if (elemento.tagName === "VIDEO") {
    modalVideo.src = elemento.currentSrc || elemento.src;
    modalVideo.style.display = "block";
    modalVideo.currentTime = 0;
    modalVideo.play();
  }

  document.body.style.overflow = "hidden";
}

function cerrarModal() {
  const modal = document.getElementById("modal");
  const modalVideo = document.getElementById("modal-video");
  const modalImg = document.getElementById("modal-img");

  // 🔥 STOP REAL
  modalVideo.pause();
  modalVideo.currentTime = 0;
  modalVideo.removeAttribute("src");
  modalVideo.load();

  modalImg.removeAttribute("src");

  modal.classList.remove("activo");
  modal.style.display = "none";

  document.body.style.overflow = "auto";
}


//modal cerrar afeura 
document.getElementById("modal").addEventListener("click", function(e) {
  if (e.target.id === "modal") {
    cerrarModal();
  }
});


