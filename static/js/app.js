document.addEventListener("DOMContentLoaded", () => {
  const divs = document.querySelectorAll(".content-container > div");
  let current = 0;

  function showDiv(index) {
    divs.forEach((div, i) => {
      div.style.display = i === index ? "block" : "none";
    });
  }

  showDiv(current);

  function nextDiv() {
    if (current < divs.length - 1) {
      divs[current].classList.add("slide-up");
      divs[current].addEventListener("animationend", function handler() {
        divs[current].removeEventListener("animationend", handler);
        divs[current].style.display = "none";
        divs[current].classList.remove("slide-up");
        current++;
        divs[current].style.display = "block";
        divs[current].classList.add("slide-in");
        divs[current].addEventListener("animationend", function handler2() {
          divs[current].removeEventListener("animationend", handler2);
          divs[current].classList.remove("slide-in");
        });
      });
    }
  }

  function prevDiv() {
    if (current > 0) {
      divs[current].classList.add("slide-up");
      divs[current].addEventListener("animationend", function handler() {
        divs[current].removeEventListener("animationend", handler);
        divs[current].style.display = "none";
        divs[current].classList.remove("slide-up");
        current--;
        divs[current].style.display = "block";
        divs[current].classList.add("slide-in");
        divs[current].addEventListener("animationend", function handler2() {
          divs[current].removeEventListener("animationend", handler2);
          divs[current].classList.remove("slide-in");
        });
      });
    }
  }

  // Agrega los botones a cada div
  divs.forEach((div, i) => {
    const nav = document.createElement("div");
    nav.style.marginTop = "16px";

    if (i > 0) {
      const prevBtn = document.createElement("button");
      prevBtn.textContent = "↑";
      prevBtn.style.marginRight = "8px";
      prevBtn.style.padding = "4px 8px";
      prevBtn.style.fontSize = "16px";
      prevBtn.onclick = prevDiv;
      nav.appendChild(prevBtn);
    }
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
