/* ====== TUS TRABAJOS: edita aquí y la página se actualiza sola ====== */
const WORKS = {
  web: [
    {img:"img/tendero y carrito.jfif", t:"Tarjeta digital y página web", d:"Tarjeta digital con página para ver el catálogo e información de la empresa.", url:"https://descocard.netlify.app/"},
    {img:"img/descomanos.png", t:"Catálogo web para empresa", d:"Catálogo en línea fácil de navegar desde el celular.", url:"https://catalogodesco.netlify.app/"},
    {img:"img/tarjdes.png", t:"Tarjeta digital con ventas", d:"Tarjeta digital con plataforma de ventas integrada.", url:"https://descoapp.netlify.app/"},
    {img:"img/desco7.png", t:"Catalogo digital con página web", d:"Sitio web , digital con página para ver el catálogo e información de la empresa.", url:"https://desco2026.netlify.app/"},
    {img:"img/revistalogo.png", t:"Sitio web para empresa", d:"Plataforma digital para comparar desde WhatsApp.", url:"https://revistalogo.netlify.app/"},
    /*{img:"img/tarjdes.png", t:"Tarjeta digital con ventas", d:"Tarjeta digital con plataforma de ventas integrada.", url:"https://descoapp.netlify.app/"}*/








  ],
  video: [
    "Todos los días empiezo igual, un tinto y mi (1).mp4","BETY DESCOAP SE DICE DE MI .mp4","El texto del párrafo.mp4",
    "E¡Soy el TENDERO del FUTURO! (1).mp4","click autentica new.mp4","PONYREEL.mp4","TORTAROJAREEL.mp4","SUPREMOREEL.mp4"
  ].map(f=>({vid:"videos/"+f, t:"Video publicitario", d:"Spot creado para cliente."})),
  design: [
    {img:"img/DISTRIANDINA.png", t:"Logo Distriandina", d:"Identidad visual para la empresa."},
    {img:"img/superd.png", t:"Logo DESCO", d:"Identidad visual para la empresa."},
    {img:"img/autentica.png", t:"Logo Autentica", d:"Identidad visual para la empresa."},
    {img:"img/1.jpg", t:"Flyer Desco", d:"Pieza publicitaria para redes."},
    {img:"img/2.jpg", t:"Flyer Desco", d:"Pieza publicitaria para redes."},
    {img:"img/3.jpg", t:"Flyer Desco", d:"Pieza publicitaria para redes."},
    {img:"img/Infografía Descuentos Supermercado Moderno Rojo y Amarillo (2).jpg", t:"Infografía de descuentos", d:"Infografía para Desco."},
    {img:"img/prom.jpg", t:"Flyer promocional", d:"Pieza publicitaria para Desco."},
    {img:"img/QUE RICAS PAPAS (5).png", t:"Flyer de muestra", d:"Invitacion digital para matrimonio."}
  ],
  /* Cada invitación es una URL real (tu página de Netlify). Pega aquí los enlaces.
     Con url:"" se muestra un marco de ejemplo. */
  invites: [
    {url:"https://joseynatalia.netlify.app/", t:"Invitación de boda", d:"Revisa como se ve nuestra invitacion de boda."},
    {url:"https://scarlettmariana.netlify.app/", t:"Invitación de quinceañera", d:"Elegante, con música y mapa."},
    {url:"https://seninvitacion.netlify.app/", t:"Quinceaños", d:"Con cuenta regresiva y galería."},
    {url:"https://dannavalentina.netlify.app/", t:"Invitación de quinceañera", d:"Colorida y animada."},
    {url:"https://quincerosado.netlify.app/", t:"Invitación de quinceañera", d:"Colorida y animada."},
    /*{url:"", t:"Bautizo", d:"Suave, con confirmación por WhatsApp."}*/
  ]
};

const esc = s => s.replace(/"/g,"&quot;");
function card(w){
  const media = w.vid
    ? `<video src="${esc(w.vid)}" muted playsinline preload="metadata"></video>`
    : `<img src="${esc(w.img)}" alt="${esc(w.t)}" loading="lazy">`;
  return `<article class="card ${w.vid?"is-video":""}">
    <div class="card-media" data-src="${esc(w.vid||w.img)}" data-type="${w.vid?"video":"img"}">${media}</div>
    <div class="card-body"><h4>${w.t}</h4><p>${w.d}</p>${w.url?`<a href="${w.url}" target="_blank" rel="noopener">Ver página</a>`:""}</div></article>`;
}
function invite(w){
  const inner = w.url
    ? `<iframe src="${esc(w.url)}" title="${esc(w.t)}" loading="lazy" tabindex="-1" scrolling="no" sandbox="allow-scripts allow-same-origin"></iframe><a class="open" href="${esc(w.url)}" target="_blank" rel="noopener" aria-label="Abrir invitación ${esc(w.t)}"><span>Abrir invitación</span></a>`
    : `<div class="ph">${w.t}<br>Tu invitación aquí</div>`;
  return `<article class="card"><div class="frame">${inner}</div>
    <div class="card-body"><h4>${w.t}</h4><p>${w.d}</p>${w.url?`<a class="btn-open" href="${esc(w.url)}" target="_blank" rel="noopener">Ver invitación</a>`:""}</div></article>`;
}
for (const [id,list] of Object.entries(WORKS)) {
  const el = document.getElementById(id);
  if (el) el.innerHTML = list.map(id==="invites"?invite:card).join("");
}
/* Ajusta cada vista previa al ancho del marco del celular */
function fitFrames(){
  document.querySelectorAll(".frame iframe").forEach(f=>{
    f.style.transform = `scale(${f.parentElement.clientWidth/390})`;
  });
}
fitFrames(); addEventListener("resize",fitFrames); addEventListener("load",fitFrames);
/* ====== CARRUSELES: flechas + arrastre con mouse ====== */
document.querySelectorAll(".showcase").forEach(sc=>{
  const track = sc.querySelector(".track");
  sc.querySelectorAll(".arrows button").forEach(b=>b.addEventListener("click",()=>{
    const step = track.querySelector(".card").offsetWidth + 20;
    track.scrollBy({left:step*b.dataset.dir*2, behavior:"smooth"});
  }));
  let down=false, sx=0, sl=0, moved=false;
  track.addEventListener("pointerdown",e=>{ if(e.pointerType!=="mouse")return; down=true; moved=false; sx=e.pageX; sl=track.scrollLeft; });
  window.addEventListener("pointerup",()=>{ down=false; track.classList.remove("drag"); });
  track.addEventListener("pointermove",e=>{
    if(!down) return;
    const dx = e.pageX - sx;
    if(Math.abs(dx)>6){ moved=true; track.classList.add("drag"); }
    track.scrollLeft = sl - dx;
  });
  track.addEventListener("click",e=>{ if(moved){ e.stopPropagation(); e.preventDefault(); moved=false; } }, true);
});

/* ====== MODAL ====== */
const modal = document.getElementById("modal"), mImg = document.getElementById("modal-img"), mVid = document.getElementById("modal-video");
document.addEventListener("click",e=>{
  const m = e.target.closest(".card-media");
  if(!m || !m.dataset.src) return;
  modal.classList.add("open"); document.body.style.overflow="hidden";
  if(m.dataset.type==="video"){ mImg.style.display="none"; mVid.style.display="block"; mVid.src=m.dataset.src; mVid.play().catch(()=>{}); }
  else { mVid.style.display="none"; mImg.style.display="block"; mImg.src=m.dataset.src; }
});
function cerrar(){ modal.classList.remove("open"); document.body.style.overflow=""; mVid.pause(); mVid.removeAttribute("src"); mImg.removeAttribute("src"); }
modal.addEventListener("click",e=>{ if(e.target===modal || e.target.classList.contains("cerrar")) cerrar(); });
document.addEventListener("keydown",e=>{ if(e.key==="Escape") cerrar(); });

/* ====== FONDO ANIMADO (red de partículas futurista) ====== */
(function(){
  const c = document.getElementById("fx"), ctx = c.getContext("2d");
  if(matchMedia("(prefers-reduced-motion: reduce)").matches) return;
  let w,h,pts=[];
  const mouse={x:-999,y:-999};
  function size(){
    w=c.width=c.offsetWidth; h=c.height=c.offsetHeight;
    const n=Math.min(90,Math.floor(w*h/16000));
    pts=Array.from({length:n},()=>({x:Math.random()*w,y:Math.random()*h,vx:(Math.random()-.5)*.35,vy:(Math.random()-.5)*.35}));
  }
  size(); addEventListener("resize",size);
  c.parentElement.addEventListener("pointermove",e=>{const r=c.getBoundingClientRect();mouse.x=e.clientX-r.left;mouse.y=e.clientY-r.top;});
  (function loop(){
    ctx.clearRect(0,0,w,h);
    for(const p of pts){
      p.x+=p.vx; p.y+=p.vy;
      if(p.x<0||p.x>w)p.vx*=-1; if(p.y<0||p.y>h)p.vy*=-1;
      ctx.fillStyle="rgba(94,240,255,.8)"; ctx.beginPath(); ctx.arc(p.x,p.y,1.5,0,6.28); ctx.fill();
    }
    for(let i=0;i<pts.length;i++){
      for(let j=i+1;j<pts.length;j++){
        const d=Math.hypot(pts[i].x-pts[j].x,pts[i].y-pts[j].y);
        if(d<130){ctx.strokeStyle=`rgba(139,123,255,${.35*(1-d/130)})`;ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(pts[j].x,pts[j].y);ctx.stroke();}
      }
      const dm=Math.hypot(pts[i].x-mouse.x,pts[i].y-mouse.y);
      if(dm<170){ctx.strokeStyle=`rgba(94,240,255,${.6*(1-dm/170)})`;ctx.beginPath();ctx.moveTo(pts[i].x,pts[i].y);ctx.lineTo(mouse.x,mouse.y);ctx.stroke();}
    }
    requestAnimationFrame(loop);
  })();
})();