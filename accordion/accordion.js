function accordion() {
  const items = document.querySelectorAll(".js-accordion-item");
  const state = "active";

  items.forEach(function (item, index) {
    const eCta = item.querySelector(".js-accordion-cta");
    eCta.onclick = function () {
      this.classList.toggle(state);
      this.nextElementSibling.classList.toggle(state);
    };
  });
}
accordion();
