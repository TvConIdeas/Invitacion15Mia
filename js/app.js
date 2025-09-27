// =================== ANIMACIONES DE SECCIONES =================== //
document.addEventListener("DOMContentLoaded", () => {
  const divs = document.querySelectorAll(".content-container > div");
  let current = 0;
  let isAnimating = false; // 🔹 Bloqueo de animaciones

  // * -------- Función helper: soporta Safari --------
  function addAnimationEndListener(element, callback) {
    element.addEventListener("animationend", callback);
    element.addEventListener("webkitAnimationEnd", callback); // Safari iOS
  }

  function removeAnimationEndListener(element, callback) {
    element.removeEventListener("animationend", callback);
    element.removeEventListener("webkitAnimationEnd", callback);
  }

  // * -------- Mostrar un div específico --------
  function showDiv(index) {
    divs.forEach((div, i) => {
      div.style.display = i === index ? "block" : "none";
    });
  }

  // * Inicializo mostrando el primero
  showDiv(current);

  // * -------- Ir al siguiente div --------
  function nextDiv() {
    if (isAnimating || current >= divs.length - 1) return; // 🔹 Bloqueo
    isAnimating = true;

    divs[current].classList.add("slide-up");

    addAnimationEndListener(divs[current], function handler() {
      removeAnimationEndListener(divs[current], handler);

      divs[current].style.display = "none";
      divs[current].classList.remove("slide-up");

      current++;
      divs[current].style.display = "block";
      divs[current].classList.add("slide-in");

      addAnimationEndListener(divs[current], function handler2() {
        removeAnimationEndListener(divs[current], handler2);
        divs[current].classList.remove("slide-in");
        isAnimating = false; // 🔹 Libero
      });
    });
  }

  // * -------- Ir al div anterior --------
  function prevDiv() {
    if (isAnimating || current <= 0) return; // 🔹 Bloqueo
    isAnimating = true;

    divs[current].classList.add("slide-up");

    addAnimationEndListener(divs[current], function handler() {
      removeAnimationEndListener(divs[current], handler);

      divs[current].style.display = "none";
      divs[current].classList.remove("slide-up");

      current--;
      divs[current].style.display = "block";
      divs[current].classList.add("slide-in");

      addAnimationEndListener(divs[current], function handler2() {
        removeAnimationEndListener(divs[current], handler2);
        divs[current].classList.remove("slide-in");
        isAnimating = false; // 🔹 Libero
      });
    });
  }

  // * -------- Conecto los botones fijos --------
  document.getElementById("prevBtn").onclick = prevDiv;
  document.getElementById("nextBtn").onclick = nextDiv;
});

// =================== AUDIO DE FONDO =================== //
document.addEventListener("click", () => {
  const audio = document.getElementById("bg-music");

  if (audio.muted) {
    audio.muted = false;
    audio.play().catch(err => console.log("Error reproduciendo audio:", err));
  }
});
