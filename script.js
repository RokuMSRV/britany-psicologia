// ============ LOADER AL CARGAR LA PÁGINA ============
window.addEventListener("load", () => {
  const loaderOverlay = document.getElementById("loader-overlay");
  if (loaderOverlay) {
    // El loader desaparece automáticamente después de 2 segundos gracias a la animación CSS
    setTimeout(() => {
      loaderOverlay.style.pointerEvents = "none"; // Para no bloquear interacciones
    }, 2000);
  }
});

// ============ EFECTO ZOOM EN BOTONES ============
document.addEventListener("DOMContentLoaded", () => {
  const buttons = document.querySelectorAll(
    ".btn-primary, .btn-secondary, .btn-outline, .btn-emergencia, .btn-emergencia-header"
  );

  buttons.forEach((button) => {
    button.addEventListener("click", function (e) {
      // Crear efecto de ripple/zoom
      const ripple = document.createElement("span");
      ripple.style.position = "absolute";
      ripple.style.width = "20px";
      ripple.style.height = "20px";
      ripple.style.background = "rgba(255, 255, 255, 0.5)";
      ripple.style.borderRadius = "50%";
      ripple.style.pointerEvents = "none";
      ripple.style.animation =
        "ripple-animation 0.6s ease-out forwards";

      const rect = this.getBoundingClientRect();
      const size = Math.max(rect.width, rect.height);

      ripple.style.width = size + "px";
      ripple.style.height = size + "px";
      ripple.style.left = e.clientX - rect.left - size / 2 + "px";
      ripple.style.top = e.clientY - rect.top - size / 2 + "px";

      // Agregar animación al documento si no existe
      if (!document.getElementById("ripple-animation-style")) {
        const style = document.createElement("style");
        style.id = "ripple-animation-style";
        style.innerHTML = `
          @keyframes ripple-animation {
            from {
              transform: scale(0);
              opacity: 1;
            }
            to {
              transform: scale(4);
              opacity: 0;
            }
          }
        `;
        document.head.appendChild(style);
      }

      // Solo agregar ripple si el botón tiene position relativa
      if (window.getComputedStyle(this).position === "static") {
        this.style.position = "relative";
      }

      this.appendChild(ripple);

      // Remover el ripple después de la animación
      setTimeout(() => ripple.remove(), 600);
    });
  });
});

// ============ MODALES DE CRISIS ============
function openCrisisModal() {
  const modal = document.getElementById("crisis-modal");
  if (!modal) return;
  modal.classList.add("active");

  // pequeña vibración en móviles compatibles
  if (navigator.vibrate) {
    navigator.vibrate([80, 40, 80]);
  }
}

function closeCrisisModal() {
  const modal = document.getElementById("crisis-modal");
  if (!modal) return;
  modal.classList.remove("active");
}

// ============ FORMULARIO DE CONTACTO ============
function handleContactSubmit(event) {
  event.preventDefault();
  const form = event.target;
  const nombre = form.nombre.value.trim();
  const email = form.email.value.trim();
  const asunto = form.asunto.value.trim();
  const mensaje = form.mensaje.value.trim();

  const cuerpo = encodeURIComponent(
    `Nombre: ${nombre}\nCorreo: ${email}\nAsunto: ${asunto}\n\nMensaje:\n${mensaje}`
  );

  window.location.href = `mailto:ps.britanyeb@gmail.com?subject=${encodeURIComponent(
    "Contacto desde sitio web"
  )}&body=${cuerpo}`;

  alert("Se abrirá tu app de correo para enviar el mensaje. Gracias por escribir ♥");
  form.reset();
}

// ============ CERRAR MODAL CON CLICK AFUERA ============
document.addEventListener("click", (e) => {
  const modal = document.getElementById("crisis-modal");
  if (!modal || !modal.classList.contains("active")) return;

  if (e.target === modal) {
    closeCrisisModal();
  }
});

// ============ CERRAR MODAL CON ESC ============
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") {
    closeCrisisModal();
  }
});
