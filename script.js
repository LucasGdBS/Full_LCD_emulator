const pix = document.querySelectorAll(".dot-px");

pix.forEach((pix) => {
  pix.addEventListener("click", function () {
    this.classList.toggle('high');
  });
});
