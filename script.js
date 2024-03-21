// Marcar por click
const pix = document.querySelectorAll(".dot-px");

pix.forEach((pix) => {
  pix.addEventListener("click", function () {
    this.classList.toggle("high");
  });
});

// Marcar por botões
const turn_all_on = document.querySelector("#turn_all_on");
const turn_all_off = document.querySelector("#turn_all_off");
const toggle_all = document.querySelector("#toggle_all");

turn_all_on.addEventListener("click", function () {
  pix.forEach((pix) => {
    pix.classList.add("high");
  });
});

turn_all_off.addEventListener("click", function () {
  pix.forEach((pix) => {
    pix.classList.remove("high");
  });
});

toggle_all.addEventListener("click", function () {
  pix.forEach((pix) => {
    pix.classList.toggle("high");
  });
});

// Aplicar Letras
