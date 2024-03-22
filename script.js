// Adicionando botões de copy to clipboard
const pixboxgreen = document.querySelectorAll(".pix-box");

pixboxgreen.forEach((div) => {
  let copybutton = document.createElement("button");
  copybutton.innerHTML = "📑";
  copybutton.id = "code-generate";
  copybutton.classList.add("send-button");
  if (div.parentNode.id == "first-line") {
    div.insertBefore(copybutton, div.firstChild);
  } else {
    div.appendChild(copybutton);
  }
});

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

// Gerar código
const generate = document.querySelectorAll("#code-generate");

generate.forEach((generate) => {
  generate.addEventListener("click", function (event) {
    const pressedButton = event.target;

    function generate_code() {
      let buttonFather = pressedButton.parentNode;
      let dots = buttonFather.querySelectorAll(".dot-px");
      let code = "B";
      let i = 0;

      dots.forEach((pix) => {
        code += pix.classList.contains("high") ? "1" : "0";
        i++;
        if (i == 5) {
          code += ",\n  B";
          i = 0;
        }
      });

      code = code.slice(0, -3);

      navigator.clipboard
        .writeText(`byte customChar[] = {\n  ${code}};`)
        .then(function () {
          pressedButton.innerHTML = "✅";
        })
        .catch(function () {
          pressedButton.innerHTML = "❌";
        });

      setTimeout(function () {
        pressedButton.innerHTML = "📑";
      }, 1500);
    }
    generate_code();
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

      let pixs = buttonFather.querySelectorAll(".dot-px").forEach((pix) => {
        pix.classList.remove("high");
      });

      chars[input.value.toUpperCase()].forEach((position) => {
        pixs = buttonFather.querySelectorAll(
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
  " ": function () {
    document.querySelectorAll(".dot-px").forEach((pix) => {
      pix.classList.remove("high");
    });
  },

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
    [2, 2],
    [3, 2],
    [4, 2],
    [5, 2],
    [6, 1],
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

  A: [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 4],
    [2, 0],
    [2, 4],
    [3, 0],
    [3, 4],
    [4, 0],
    [4, 1],
    [4, 2],
    [4, 3],
    [4, 4],
    [5, 0],
    [5, 4],
    [6, 0],
    [6, 4],
  ],

  B: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 4],
    [2, 0],
    [2, 4],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [4, 0],
    [4, 4],
    [5, 0],
    [5, 4],
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
  ],

  C: [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 4],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [5, 4],
    [6, 1],
    [6, 2],
    [6, 3],
  ],

  D: [
    [0, 0],
    [0, 1],
    [0, 2],
    [1, 0],
    [1, 3],
    [2, 0],
    [2, 4],
    [3, 0],
    [3, 4],
    [4, 0],
    [4, 4],
    [5, 0],
    [5, 3],
    [6, 0],
    [6, 1],
    [6, 2],
  ],

  E: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 0],
    [2, 0],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [4, 0],
    [5, 0],
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
  ],

  F: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 0],
    [2, 0],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [4, 0],
    [5, 0],
    [6, 0],
  ],

  G: [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 4],
    [2, 0],
    [3, 0],
    [3, 2],
    [3, 3],
    [3, 4],
    [4, 0],
    [4, 4],
    [5, 0],
    [5, 4],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
  ],

  H: [
    [0, 0],
    [0, 4],
    [1, 0],
    [1, 4],
    [2, 0],
    [2, 4],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [3, 4],
    [4, 0],
    [4, 4],
    [5, 0],
    [5, 4],
    [6, 0],
    [6, 4],
  ],
  I: [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [5, 2],
    [6, 1],
    [6, 2],
    [6, 3],
  ],
  J: [
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 3],
    [2, 3],
    [3, 3],
    [4, 3],
    [5, 0],
    [5, 3],
    [6, 1],
    [6, 2],
  ],
  K: [
    [0, 0],
    [0, 4],
    [1, 0],
    [1, 3],
    [2, 0],
    [2, 2],
    [3, 0],
    [3, 1],
    [4, 0],
    [4, 2],
    [5, 0],
    [5, 3],
    [6, 0],
    [6, 4],
  ],
  L: [
    [0, 0],
    [1, 0],
    [2, 0],
    [3, 0],
    [4, 0],
    [5, 0],
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
  ],
  M: [
    [0, 0],
    [0, 4],
    [1, 0],
    [1, 1],
    [1, 3],
    [1, 4],
    [2, 0],
    [2, 2],
    [2, 4],
    [3, 0],
    [3, 2],
    [3, 4],
    [4, 0],
    [4, 4],
    [5, 0],
    [5, 4],
    [6, 0],
    [6, 4],
  ],
  N: [
    [0, 0],
    [0, 4],
    [1, 0],
    [1, 4],
    [2, 0],
    [2, 1],
    [2, 4],
    [3, 0],
    [3, 2],
    [3, 4],
    [4, 0],
    [4, 3],
    [4, 4],
    [5, 0],
    [5, 4],
    [6, 0],
    [6, 4],
  ],
  O: [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 4],
    [2, 0],
    [2, 4],
    [3, 0],
    [3, 4],
    [4, 0],
    [4, 4],
    [5, 0],
    [5, 4],
    [6, 1],
    [6, 2],
    [6, 3],
  ],
  P: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 4],
    [2, 0],
    [2, 4],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [4, 0],
    [5, 0],
    [6, 0],
  ],
  Q: [
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 4],
    [2, 0],
    [2, 4],
    [3, 0],
    [3, 4],
    [4, 0],
    [4, 2],
    [4, 4],
    [5, 0],
    [5, 3],
    [6, 1],
    [6, 2],
    [6, 4],
  ],
  R: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [1, 0],
    [1, 4],
    [2, 0],
    [2, 4],
    [3, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [4, 0],
    [4, 2],
    [5, 0],
    [5, 3],
    [6, 0],
    [6, 4],
  ],
  S: [
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 0],
    [2, 0],
    [3, 1],
    [3, 2],
    [3, 3],
    [4, 4],
    [5, 4],
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
  ],
  T: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 2],
    [2, 2],
    [3, 2],
    [4, 2],
    [5, 2],
    [6, 2],
  ],
  U: [
    [0, 0],
    [0, 4],
    [1, 0],
    [1, 4],
    [2, 0],
    [2, 4],
    [3, 0],
    [3, 4],
    [4, 0],
    [4, 4],
    [5, 0],
    [5, 4],
    [6, 1],
    [6, 2],
    [6, 3],
  ],
  V: [
    [0, 0],
    [0, 4],
    [1, 0],
    [1, 4],
    [2, 0],
    [2, 4],
    [3, 0],
    [3, 4],
    [4, 0],
    [4, 4],
    [5, 1],
    [5, 3],
    [6, 2],
  ],
  W: [
    [0, 0],
    [0, 4],
    [1, 0],
    [1, 4],
    [2, 0],
    [2, 4],
    [3, 0],
    [3, 2],
    [3, 4],
    [4, 0],
    [4, 2],
    [4, 4],
    [5, 0],
    [5, 2],
    [5, 4],
    [6, 1],
    [6, 3],
  ],
  X: [
    [0, 0],
    [0, 4],
    [1, 0],
    [1, 4],
    [2, 1],
    [2, 3],
    [3, 2],
    [4, 1],
    [4, 3],
    [5, 0],
    [5, 4],
    [6, 0],
    [6, 4],
  ],
  Y: [
    [0, 0],
    [0, 4],
    [1, 0],
    [1, 4],
    [2, 0],
    [2, 4],
    [3, 1],
    [3, 3],
    [4, 2],
    [5, 2],
    [6, 2],
  ],
  Z: [
    [0, 0],
    [0, 1],
    [0, 2],
    [0, 3],
    [0, 4],
    [1, 4],
    [2, 3],
    [3, 2],
    [4, 1],
    [5, 0],
    [6, 0],
    [6, 1],
    [6, 2],
    [6, 3],
    [6, 4],
  ],
};

const customChar = function (code) {
  `byte customChar[] = {
    ${code}
};`;
};
