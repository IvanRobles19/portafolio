(() => {
  // Canvas partículas + cometas
  const canvas = document.getElementById('bg-canvas');
  const ctx = canvas.getContext('2d');
  let w = canvas.width = innerWidth;
  let h = canvas.height = innerHeight;
  const DPR = window.devicePixelRatio || 1;
  canvas.width = innerWidth * DPR;
  canvas.height = innerHeight * DPR;
  canvas.style.width = innerWidth+'px';
  canvas.style.height = innerHeight+'px';
  ctx.scale(DPR,DPR);

  // PARTICULAS
  const particles = [];
  const COUNT = Math.max(40, Math.round((w*h)/120000));

  function rand(min,max){ return Math.random()*(max-min)+min }

  function createParticles(){
    particles.length = 0;
    for(let i=0;i<COUNT;i++){
      particles.push({
        x: rand(0,w),
        y: rand(0,h),
        r: rand(0.6,3.2),
        vx: rand(-0.15,0.15),
        vy: rand(-0.05,0.25),
        alpha: rand(0.06,0.28),
        hue: rand(190,320)
      });
    }
  }

  // COMETAS
  const comets = [];
  const COMET_COUNT = 6;

  function createComets(){
    comets.length=0;
    for(let i=0;i<COMET_COUNT;i++){
      comets.push({
        x: rand(-w,w),
        y: rand(0,h/2),
        length: rand(30,90),
        speed: rand(2,6),
        angle: rand(0.1,0.4),
        alpha: rand(0.6,1),
        width: rand(20,60) 
      });
    }
  }

  function resize(){
    w = canvas.width = innerWidth * DPR;
    h = canvas.height = innerHeight * DPR;
    canvas.style.width = innerWidth+'px';
    canvas.style.height = innerHeight+'px';
    ctx.setTransform(1,0,0,1,0,0);
    ctx.scale(DPR,DPR);
    createParticles();
    createComets();
  }
  window.addEventListener('resize', resize);

  function draw(){
    ctx.clearRect(0,0,innerWidth,innerHeight);
    const grad = ctx.createLinearGradient(0,0,0,h);
    grad.addColorStop(0,'rgba(10,8,15,0.05)');
    grad.addColorStop(1,'rgba(6,6,10,0.15)');
    ctx.fillStyle = grad;
    ctx.fillRect(0,0,innerWidth,h);

    // Dibujar partículas
    for(let p of particles){
      p.x += p.vx;
      p.y -= p.vy*0.4;
      if(p.x < -10) p.x = innerWidth + 10;
      if(p.x > innerWidth + 10) p.x = -10;
      if(p.y < -20) p.y = innerHeight + 20;

      ctx.beginPath();
      ctx.fillStyle = `hsla(${p.hue},80%,60%,${p.alpha})`;
      ctx.arc(p.x,p.y,p.r,0,Math.PI*2);
      ctx.fill();
    }

    // Dibujar cometas
    for(let c of comets){
      c.x += c.speed;
      c.y += c.speed*c.angle;
      if(c.x > w + 20 || c.y > h+20){
        c.x = rand(-w,0);
        c.y = rand(0,h/2);
        c.length = rand(20,60);
        c.speed = rand(2,6);
        c.angle = rand(0.1,0.4);
        c.alpha = rand(0.6,1);
      }
      const gradient = ctx.createLinearGradient(c.x,c.y,c.x-c.length,c.y-c.length*c.angle);
      gradient.addColorStop(0, `rgba(255,255,255,${c.alpha})`);
      gradient.addColorStop(1, 'rgba(255,255,255,0)');
      ctx.strokeStyle = gradient;
      ctx.lineWidth = 2;
      ctx.beginPath();
      ctx.moveTo(c.x,c.y);
      ctx.lineTo(c.x - c.length, c.y - c.length*c.angle);
      ctx.stroke();
    }
  }

  function loop(){
    draw();
    requestAnimationFrame(loop);
  }

  createParticles();
  createComets();
  loop();

  // Astronauta micro parallax
  const astro = document.getElementById('astro');
  let mouseX=0, mouseY=0;
  window.addEventListener('mousemove',(e)=>{
    mouseX=(e.clientX - innerWidth/2)/innerWidth;
    mouseY=(e.clientY - innerHeight/2)/innerHeight;
    astro.style.transform=`translateX(${mouseX*14}px) translateY(${mouseY*-8}px)`;
  });

  // Contact form demo
  const contactForm = document.getElementById('contactForm');
  if(contactForm){
    contactForm.addEventListener('submit', ev=>{
      ev.preventDefault();
      const data = new FormData(contactForm);
      const btn = contactForm.querySelector('button[type="submit"]');
      const orig = btn.innerText;
      btn.disabled=true;
      btn.innerText="Enviando...";
      setTimeout(()=>{
        btn.innerText="¡Enviado!";
        contactForm.reset();
        setTimeout(()=>{
          btn.innerText=orig;
          btn.disabled=false;
        },1600);
      },900);
    });
  }


  // Typing effect + rotating roles
const typingEl = document.getElementById('typing');
const roles = ["Full Stack Developer", "DevOps Engineer", "Frontend Developer", "Backend Developer", "Cloud Engineer"];
let roleIndex = 0;
let charIndex = 0;
let typingDelay = 120;
let erasingDelay = 60;
let newWordDelay = 1500;

function type() {
  if (charIndex < roles[roleIndex].length) {
    typingEl.textContent += roles[roleIndex].charAt(charIndex);
    charIndex++;
    setTimeout(type, typingDelay);
  } else {
    setTimeout(erase, newWordDelay);
  }
}

function erase() {
  if (charIndex > 0) {
    typingEl.textContent = roles[roleIndex].substring(0, charIndex - 1);
    charIndex--;
    setTimeout(erase, erasingDelay);
  } else {
    roleIndex = (roleIndex + 1) % roles.length;
    setTimeout(type, typingDelay + 500);
  }
}

// iniciar efecto
document.addEventListener("DOMContentLoaded", function() {
  if(roles.length) setTimeout(type, 500);
});





const spaceship = document.querySelector(".spaceship");
const panels = document.querySelectorAll(".panel");
const skillsSection = document.querySelector("#skills");

// Crear estrellas de fondo
function createStars(count) {
  for (let i = 0; i < count; i++) {
    const star = document.createElement("div");
    star.classList.add("star");
    const size = Math.random() * 3 + 1;
    star.style.width = `${size}px`;
    star.style.height = `${size}px`;
    star.style.top = `${Math.random() * skillsSection.offsetHeight}px`;
    star.style.left = `${Math.random() * skillsSection.offsetWidth}px`;
    star.style.animationDuration = `${Math.random() * 3 + 2}s`;
    skillsSection.appendChild(star);
  }
}
createStars(150);

// Coordenadas objetivo para la nave
let targetX = Math.random() * (skillsSection.offsetWidth - 50);
let targetY = Math.random() * (skillsSection.offsetHeight - 50);

// Posición actual
let currentX = targetX;
let currentY = targetY;

// Función de animación continua
function animateSpaceship() {
  const dx = targetX - currentX;
  const dy = targetY - currentY;
  currentX += dx * 0.02; // suavidad
  currentY += dy * 0.02;
  spaceship.style.left = `${currentX}px`;
  spaceship.style.top = `${currentY}px`;
  requestAnimationFrame(animateSpaceship);
}
animateSpaceship();

// Cambiar objetivo aleatorio cada 3 segundos
setInterval(() => {
  targetX = Math.random() * (skillsSection.offsetWidth - 50);
  targetY = Math.random() * (skillsSection.offsetHeight - 50);
}, 3000);

// Al pasar el mouse sobre un panel, la nave se acerca
panels.forEach(panel => {
  panel.addEventListener("mouseenter", () => {
    const rect = panel.getBoundingClientRect();
    const sectionRect = skillsSection.getBoundingClientRect();
    targetX = rect.left + rect.width / 2 - sectionRect.left - 25;
    targetY = rect.top - sectionRect.top - 50;
  });

  panel.addEventListener("mouseleave", () => {
    // Volver a objetivo aleatorio
    targetX = Math.random() * (skillsSection.offsetWidth - 50);
    targetY = Math.random() * (skillsSection.offsetHeight - 50);
  });
});





const projects = [
  {
    title: "Stock Master",
    puesto: "Puesto: Ingeniero/Arquitecto Full Stack Líder",
    info: [
      {
        description: "Aplicación Web integral que optimiza la gestión de inventario y el seguimiento de recursos/tiempos para proyectos de ingeniería. Base tecnológica: Angular (Frontend) y Firebase (Backend).",
        image: "assets/imagenes/ProyectosImperio/ingPrev.png"
      },
      {
        description: "Implementación de una Interfaz Responsiva (Responsive Design), garantizando la usabilidad y la funcionalidad cross-device (móvil, tablet y escritorio).",
        image: "assets/imagenes/ProyectosImperio/responsiva.png"
      },
      {
        description: "Desarrollo de módulos de Gestión Documental (DMS) con capacidad para digitalizar, catalogar y asegurar la documentación crítica, como expedientes de empleados y los registros contables/facturas de activos.",
        image: "assets/imagenes/ProyectosImperio/archivos.jpg"
      }
      ,
      {
        description: "Implementación de un sistema de adquisición y asignación de materiales basado en tecnología de escaneo QR/código de barras, logrando la automatización de la entrada y salida de inventario y minimizando errores manuales.",
        image: "assets/imagenes/ProyectosImperio/escanerinven.jpg"
      }
    ]
  },
  {
    title: "SANOR",
     puesto: "Puesto: Ingeniero/Arquitecto Full Stack Líder",
    info: [
      {
        description: "Desarrollo del Sistema de Avisos Notariales de Operaciones Relevantes (SANOR), una plataforma clave para la Secretaría de Administración y Finanzas del Estado de Nayarit. Su función principal es centralizar y procesar la recopilación de datos de operaciones notariales relevantes en el estado, permitiendo la emisión automatizada de acuses oficiales en formato PDF con validez legal.",
        image: "assets/imagenes/sanor/presanor.png"
      },
      {
        description: "Diseño de un flujo completo de datos desde la recabación mediante formularios dinámicos hasta la presentación estructurada en la interfaz. Para el cumplimiento de seguridad, se implementó una capa de ofuscación de datos (filtro blur).",
        image: "assets/imagenes/sanor/llenadoblur.png"
      }
      ,
      {
        description: "Módulo de Emisión Documental en Tiempo Real, diseñado para la generación automatizada de acuses con validez oficial (PDF). La funcionalidad incluye visualización directa en el navegador y descarga sin latencia.",
        image: "assets/imagenes/sanor/acuse.png"
      }
    ]
  },
  {
    title: "Administrador SANOR",
     puesto: "Puesto: Ingeniero/Arquitecto de Aplicaciones Desktop Líder",
    info: [
      {
        description: "Implementación de un Panel de Control de Alto Nivel para la gestión operativa del sistema SANOR. Las funcionalidades incluyen la administración de usuarios y permisos, la atención y resolución de solicitudes internas, y la recuperación y presentación estructurada de información.",
        image: "assets/imagenes/sanor/desktop.png"
      },
      
    ]
  },
  {
    title: "Sistema de Correspondencia Institucional",
    puesto: "Puesto: Ingeniero/Arquitecto Full Stack Líder",
    tecnologias: "Thymeleaf, Java con Spring Boot y MySQL",
    info: [
      {
        description: "Desarrollo del Sistema de Gestión de Correspondencia para la Secretaría de Administración y Finanzas del Estado de Nayarit. La plataforma centraliza y agiliza el flujo de oficios y documentos oficiales, optimizando la comunicación interna y externa de la dependencia.",
        image: "assets/imagenes/Correspondencia/correspondencia.png"
      },
      {
        description: "Diseño e implementación de una arquitectura robusta utilizando Spring Boot y Thymeleaf para el renderizado dinámico. El sistema incluye un motor de búsqueda avanzada y organización por categorías para una trazabilidad total de los documentos.",
        image: "assets/imagenes/Correspondencia/micorrespondencia.png"
      },
      {
        description: "Módulo de Seguimiento y Control en Tiempo Real, permitiendo la asignación de turnos, gestión de estados de respuesta y almacenamiento seguro en base de datos MySQL, garantizando la integridad de la información institucional.",
        image: "assets/imagenes/Correspondencia/seguimiento.png"
      }
    ]
  }

];

const modal = document.getElementById("projectModal");
const modalTitle = document.getElementById("modalTitle");
const modalPuesto = document.getElementById("modalPuesto");
const modalDescription = document.getElementById("modalDescription");
const modalImage = document.getElementById("modalImage");
const closeModal = document.getElementById("closeModal");
const prevInfo = document.getElementById("prevInfo");
const nextInfo = document.getElementById("nextInfo");

let currentProject = null;
let currentIndex = 0;

document.querySelectorAll(".project").forEach((card, i) => {
  card.addEventListener("click", () => {
    currentProject = projects[i];
    currentIndex = 0;
    showProjectInfo();
    modal.style.display = "flex";
  });
});

function showProjectInfo() {
  const info = currentProject.info[currentIndex];
  modalTitle.textContent = currentProject.title;
  modalPuesto.textContent = currentProject.puesto || "";
  modalDescription.textContent = info.description;
  modalImage.style.opacity = 0;
  setTimeout(() => {
    modalImage.src = info.image;
    modalImage.style.opacity = 1;
  }, 200);
}

nextInfo.addEventListener("click", () => {
  if (currentProject && currentIndex < currentProject.info.length - 1) {
    currentIndex++;
    showProjectInfo();
  }
});

prevInfo.addEventListener("click", () => {
  if (currentProject && currentIndex > 0) {
    currentIndex--;
    showProjectInfo();
  }
});

closeModal.addEventListener("click", () => (modal.style.display = "none"));
window.addEventListener("click", e => {
  if (e.target === modal) modal.style.display = "none";
});




/* Experiencia */
// Detecta cuando los items entran en pantalla
const items = document.querySelectorAll(".timeline-item");
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) entry.target.classList.add("visible");
      });
    },
    { threshold: 0.6 }
  );

  items.forEach((item) => observer.observe(item));



 // Partículas flotantes únicas para sección contacto
const contactSection = document.getElementById('contact');
for (let i = 0; i < 40; i++) {
  const p = document.createElement('div');
  p.classList.add('contact-particle');
  const size = Math.random() * 4 + 2;
  p.style.width = `${size}px`;
  p.style.height = `${size}px`;
  p.style.left = `${Math.random() * 100}%`;
  p.style.top = `${Math.random() * 100}%`;
  p.style.animationDuration = `${3 + Math.random() * 4}s`;
  contactSection.appendChild(p);
}

// Efecto de entrada al hacer scroll
const contactCard = document.querySelector('.contact-card');
const contactObserver = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      contactCard.classList.add('visible');
      contactObserver.disconnect();
    }
  });
}, { threshold: 0.3 });

contactObserver.observe(contactCard);




})();
