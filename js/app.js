// =================== ANIMACIONES DE SECCIONES =================== //
document.addEventListener("DOMContentLoaded", () => {
  const divs = document.querySelectorAll(".content-container > div");
  let current = 0;

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
    if (current < divs.length - 1) {
      divs[current].classList.add("slide-up");

      addAnimationEndListener(divs[current], function handler() {
        removeAnimationEndListener(divs[current], handler);

        // Oculto el actual y saco la clase
        divs[current].style.display = "none";
        divs[current].classList.remove("slide-up");

        // Paso al siguiente
        current++;
        divs[current].style.display = "block";
        divs[current].classList.add("slide-in");

        addAnimationEndListener(divs[current], function handler2() {
          removeAnimationEndListener(divs[current], handler2);
          divs[current].classList.remove("slide-in");
        });
      });
    }
  }

  // * -------- Ir al div anterior --------
  function prevDiv() {
    if (current > 0) {
      divs[current].classList.add("slide-up");

      addAnimationEndListener(divs[current], function handler() {
        removeAnimationEndListener(divs[current], handler);

        // Oculto el actual y saco la clase
        divs[current].style.display = "none";
        divs[current].classList.remove("slide-up");

        // Retrocedo al anterior
        current--;
        divs[current].style.display = "block";
        divs[current].classList.add("slide-in");

        addAnimationEndListener(divs[current], function handler2() {
          removeAnimationEndListener(divs[current], handler2);
          divs[current].classList.remove("slide-in");
        });
      });
    }
  }

  // * -------- Agrego botones de navegación --------
  divs.forEach((div, i) => {
    const nav = document.createElement("div");
    nav.style.marginTop = "2vh";

    // Botón "arriba" si no es el primero
    if (i > 0) {
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "↑";
      prevBtn.style.marginRight = "8px";
      prevBtn.style.padding = "4px 8px";
      prevBtn.style.fontSize = "16px";
      prevBtn.onclick = prevDiv;
      nav.appendChild(prevBtn);
    }

    // Botón "abajo" si no es el último
    if (i < divs.length - 1) {
      const nextBtn = document.createElement("button");
      nextBtn.textContent = "↓";
      nextBtn.style.marginLeft = "8px";
      nextBtn.style.padding = "4px 8px";
      nextBtn.style.fontSize = "16px";
      nextBtn.onclick = nextDiv;
      nav.appendChild(nextBtn);
    }

    div.appendChild(nav);
  });
});

// =================== AUDIO DE FONDO =================== //
document.addEventListener("click", () => {
  const audio = document.getElementById("bg-music");

  if (audio.muted) {
    audio.muted = false;
    audio.play().catch(err => console.log("Error reproduciendo audio:", err));
  }
});
