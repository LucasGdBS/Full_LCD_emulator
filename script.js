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
const button = document.querySelectorAll("#apply");

button.forEach((botao) => {
  botao.addEventListener("click", function (event) {
    const pressedButton = event.target;

    function apply_high() {
      let buttonFather = pressedButton.parentNode;
      let input = buttonFather.querySelector("input");

      chars[input.value].forEach((position) => {
        let pixs = buttonFather.querySelectorAll(
          `.dot-px[data-x='${position[0]}'][data-y='${position[1]}']`
        );
        pixs.forEach((pix) => {
          pix.classList.toggle("high");
        });
      });
    }
    apply_high();
  });
});

const chars = {
  0: [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 4],
    [2, 0],
    [2, 3],
    [2, 4],
    [3, 0],
    [3, 2],
    [3, 4],
    [4, 0],
    [4, 1],
    [4, 4],
    [5, 0],
    [5, 4],
    [6, 1],
    [6, 2],
    [6, 3],
  ],
  1: [
    [0, 2],
    [1, 1],
    [1, 2],
    [2, 2], // part of the top of the "A"
    [3, 2],
    [4, 2],
    [5, 2],
    [6, 1], // part of the bottom of the "A"
    [6, 2],
    [6, 3],
  ],

  2: [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 4],
    [2, 4],
    [3, 3],
    [4, 2],
    [5, 1],
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
  ],

  3: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [1, 4],
    [2, 2],
    [3, 3],
    [4, 4],
    [5, 0],
    [5, 4],
    [6, 1],
    [6, 2],
    [6, 3],
  ],

  4: [
    [0, 3],
    [1, 2],
    [1, 3],
    [2, 1],
    [2, 3],
    [3, 0],
    [3, 3],
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
    [5, 3],
    [6, 3],
  ],

  5: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [0, 5],
    [1, 0],
    [2, 0],
    [2, 1],
    [2, 2],
    [2, 3],
    [3, 4],
    [4, 4],
    [5, 0],
    [5, 4],
    [6, 1],
    [6, 2],
    [6, 3],
  ],

  6: [
    [0, 2],
    [0, 3],
    [1, 1],
    [2, 0],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [4, 0],
    [4, 4],
    [5, 0],
    [5, 4],
    [6, 1],
    [6, 2],
    [6, 3],
  ],

  7: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 4],
    [2, 3],
    [3, 2],
    [4, 1],
    [5, 1],
    [6, 1],
  ],

  8: [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 4],
    [2, 0],
    [2, 4],
    [3, 1],
    [3, 2],
    [3, 3],
    [4, 0],
    [4, 4],
    [5, 0],
    [5, 4],
    [6, 1],
    [6, 2],
    [6, 3],
  ],

  9: [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 4],
    [2, 0],
    [2, 4],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
    [4, 4],
    [5, 3],
    [6, 1],
    [6, 2],
  ],
};
